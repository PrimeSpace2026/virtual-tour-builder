import { useEffect, useRef } from "react";

interface SlowGifProps {
  src: string;
  alt: string;
  className?: string;
  /** Multiplier for frame delay. 2 = half speed, 3 = third speed, etc. */
  slowdown?: number;
}

/**
 * Renders a GIF at a slower playback speed using an offscreen image
 * and a visible canvas that redraws frames with increased delay.
 */
export const SlowGif = ({ src, alt, className, slowdown = 2 }: SlowGifProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Load the GIF as a static image first to get dimensions
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    let animationId: number;
    let stopped = false;

    img.onload = () => {
      // Set canvas to image's natural size
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      // For a simple slowdown: we redraw the same img element repeatedly.
      // Since browsers animate GIFs automatically on Image elements,
      // we capture at intervals and hold each frame longer.
      
      const frameDelay = (1000 / 15) * slowdown; // ~15fps base, slowed down
      let lastDraw = 0;

      const draw = (timestamp: number) => {
        if (stopped) return;
        if (timestamp - lastDraw >= frameDelay) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          lastDraw = timestamp;
        }
        animationId = requestAnimationFrame(draw);
      };

      animationId = requestAnimationFrame(draw);
    };

    return () => {
      stopped = true;
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [src, slowdown]);

  return (
    <div ref={containerRef} className={className}>
      <canvas
        ref={canvasRef}
        aria-label={alt}
        role="img"
        className="w-full h-full object-cover"
      />
    </div>
  );
};
