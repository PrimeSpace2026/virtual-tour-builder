/**
 * Matterport SDK Bundle connection + Scene components for 3D video screens.
 * Uses the locally-hosted SDK Bundle for full Scene API access (PlaneRenderer, etc.)
 */

const SDK_VERSION = '3.2';

/**
 * Connect to the Matterport SDK via the Bundle's MP_SDK.connect()
 * The iframe must load from /bundle/showcase.html
 */
export function connectBundleSdk(iframe: HTMLIFrameElement, applicationKey: string): Promise<any> {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const maxAttempts = 100; // 10 seconds
    const intervalId = setInterval(async () => {
      attempts++;
      if (attempts > maxAttempts) {
        clearInterval(intervalId);
        reject(new Error('Bundle SDK connection timeout'));
        return;
      }
      try {
        const win = iframe.contentWindow as any;
        if (win?.MP_SDK) {
          clearInterval(intervalId);
          const sdk = await win.MP_SDK.connect(iframe, applicationKey, SDK_VERSION);
          resolve(sdk);
        }
      } catch (e) {
        // iframe not ready yet, keep polling
      }
    }, 100);
  });
}

/**
 * Register Scene components needed for 3D video screens.
 * Must be called after SDK connection, before creating scene objects.
 */
export async function registerVideoScreenComponents(sdk: any): Promise<void> {
  if (!sdk.Scene?.register) {
    throw new Error('SDK Scene API not available');
  }

  // Register PlaneRenderer - creates a textured plane in 3D space
  await sdk.Scene.register('mp.planeRenderer', () => {
    return new (class {
      inputs = {
        texture: null as any,
        aspect: 1,
        transparent: false,
        visible: true,
        opacity: 1,
        localScale: { x: 1, y: 1, z: 1 },
        localPosition: { x: 0, y: 0, z: 0 },
      };
      outputs = {} as any;
      events = {
        'INTERACTION.CLICK': true,
      };
      declare context: any;
      declare notify: (type: string, data?: any) => void;
      private mesh: any;
      private pivotNode: any;

      onInit() {
        const THREE = this.context.three;
        this.pivotNode = new THREE.Group();
        this.mesh = new THREE.Mesh(
          new THREE.PlaneGeometry(1.0, 1.0),
          new THREE.MeshBasicMaterial({
            transparent: this.inputs.transparent,
            map: this.inputs.texture,
            opacity: this.inputs.opacity,
          })
        );
        this.mesh.scale.set(
          this.inputs.localScale.x,
          this.inputs.localScale.y / this.inputs.aspect,
          this.inputs.localScale.z
        );
        this.mesh.position.set(
          this.inputs.localPosition.x,
          this.inputs.localPosition.y,
          this.inputs.localPosition.z
        );
        this.mesh.updateMatrixWorld();
        this.pivotNode.add(this.mesh);
        this.outputs.objectRoot = this.pivotNode;
        this.outputs.collider = this.pivotNode;
        this.mesh.visible = this.inputs.visible;
      }

      onEvent(eventType: string, eventData: unknown) {
        this.notify(eventType, eventData);
      }

      onInputsUpdated(oldInputs: any) {
        if (oldInputs.texture !== this.inputs.texture) {
          this.mesh.material.map = this.inputs.texture;
          this.mesh.material.needsUpdate = true;
        }
        if (oldInputs.visible !== this.inputs.visible) {
          this.mesh.visible = this.inputs.visible;
        }
        if (oldInputs.opacity !== this.inputs.opacity) {
          this.mesh.material.opacity = this.inputs.opacity;
        }
        this.mesh.scale.set(
          this.inputs.localScale.x,
          this.inputs.localScale.y / this.inputs.aspect,
          this.inputs.localScale.z
        );
        this.mesh.position.set(
          this.inputs.localPosition.x,
          this.inputs.localPosition.y,
          this.inputs.localPosition.z
        );
      }

      onDestroy() {
        this.outputs.collider = null;
        this.outputs.objectRoot = null;
        this.mesh?.material?.dispose();
        this.mesh?.geometry?.dispose();
      }
    })();
  });

  // Register ImageTexture - loads an image URL and outputs a THREE.Texture
  await sdk.Scene.register('custom.imageTexture', () => {
    return new (class {
      inputs = {
        src: '' as string,
      };
      outputs = {
        texture: null as any,
        aspect: 1,
      };
      declare context: any;
      private texture: any;

      onInit() {
        // Load texture on init if src is already set
        if (this.inputs.src) {
          this.loadTexture(this.inputs.src);
        }
      }

      onInputsUpdated(oldInputs: any) {
        if (this.inputs.src && this.inputs.src !== oldInputs?.src) {
          this.loadTexture(this.inputs.src);
        }
      }

      private loadTexture(src: string) {
        this.releaseTexture();
        const THREE = this.context.three;
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = 'anonymous';
        loader.load(src, (tex: any) => {
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          this.texture = tex;
          this.outputs.texture = tex;
          this.outputs.aspect = tex.image ? tex.image.width / tex.image.height : 16 / 9;
          console.log('🖼️ ImageTexture loaded:', src, 'aspect:', this.outputs.aspect);
        }, undefined, (err: any) => {
          console.error('❌ ImageTexture load failed:', src, err);
        });
      }

      onDestroy() {
        this.releaseTexture();
      }

      private releaseTexture() {
        if (this.texture) {
          this.outputs.texture = null;
          this.texture.dispose();
          this.texture = null;
        }
      }
    })();
  });
}

export interface VideoScreenData {
  id: number;
  name: string;
  youtubeId: string;
  posX: number;
  posY: number;
  posZ: number;
  rotX: number;
  rotY: number;
  rotZ: number;
  width: number;
  height: number;
  visibilityRange: number;
}

/**
 * Create 3D video screen objects in the Matterport scene.
 * Uses Scene.deserialize() with JSON scene definition (same approach as vs-app).
 * Returns the scene object (call .stop() to cleanup) and a click handler disposer.
 */
export async function createVideoScreenObjects(
  sdk: any,
  screens: VideoScreenData[],
  onScreenClick: (screenId: number) => void,
): Promise<{ sceneObject: any; dispose: () => void }> {
  if (!sdk.Scene?.deserialize) {
    throw new Error('SDK Scene.deserialize not available');
  }

  // Build JSON scene definition matching vs-app.json format
  const sceneDefinition = {
    version: '1.0',
    payload: {
      objects: screens.map(screen => ({
        name: `video-screen-${screen.id}`,
        position: { x: screen.posX, y: screen.posY, z: screen.posZ },
        rotation: { x: screen.rotX, y: screen.rotY, z: screen.rotZ },
        scale: { x: 1, y: 1, z: 1 },
        components: [
          {
            type: 'mp.planeRenderer',
            inputs: {
              transparent: false,
              visible: true,
              localScale: { x: screen.width, y: screen.height, z: 1 },
            },
            events: {
              'INTERACTION.CLICK': true,
            },
          },
          {
            type: 'custom.imageTexture',
            inputs: {
              src: `https://img.youtube.com/vi/${screen.youtubeId}/hqdefault.jpg`,
            },
          },
        ],
        bindings: [
          // PlaneRenderer.texture ← ImageTexture.texture
          [0, 'texture', 1, 'texture'],
          // PlaneRenderer.aspect ← ImageTexture.aspect
          [0, 'aspect', 1, 'aspect'],
        ],
      })),
    },
  };

  console.log('🖥️ Scene definition:', JSON.stringify(sceneDefinition, null, 2));

  const sceneObject = await sdk.Scene.deserialize(JSON.stringify(sceneDefinition));

  // Set up click handling after deserialization
  let spyCount = 0;
  let nodeCount = 0;
  try {
    for (const node of sceneObject.nodeIterator()) {
      nodeCount++;
      const name = node.name || '';
      console.log(`🔍 Node ${nodeCount}: name="${name}"`);
      const match = name.match(/video-screen-(\d+)/);
      if (!match) continue;
      const screenId = parseInt(match[1], 10);

      let compCount = 0;
      for (const comp of node.componentIterator()) {
        compCount++;
        console.log(`  📦 Component ${compCount}: type="${comp.componentType}"`);
        if (comp.componentType === 'mp.planeRenderer') {
          try {
            const clickPath = sceneObject.addEventPath(comp, 'INTERACTION.CLICK');
            console.log(`  ✅ Click path added for screen ${screenId}: ${clickPath}`);
            sceneObject.spyOnEvent({
              id: `screen-click-${spyCount++}`,
              path: clickPath,
              onEvent: () => {
                console.log(`🖱️ Video screen ${screenId} clicked!`);
                onScreenClick(screenId);
              },
            });
          } catch (e) {
            console.log(`⚠️ Click spy failed for screen ${screenId}:`, e);
          }
          break;
        }
      }
    }
    console.log(`🔍 Total nodes: ${nodeCount}, spies: ${spyCount}`);
  } catch (e) {
    console.log('⚠️ Event spy setup error:', e);
  }

  sceneObject.start();
  console.log(`🖥️ Started ${screens.length} 3D video screens`);

  return {
    sceneObject,
    dispose: () => {
      try { sceneObject.stop(); } catch {}
    },
  };
}
