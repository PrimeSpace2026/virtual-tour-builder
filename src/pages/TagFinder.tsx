import { useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, Check, Loader2, Tag, Search } from "lucide-react";

const SDK_KEY = "b7uar4u57xdec0zw7dwygt7md";

interface TagInfo {
  sid: string;
  label: string;
  description: string;
}

const TagFinder = () => {
  const [searchParams] = useSearchParams();
  const tourUrlParam = searchParams.get("tourUrl") || "";
  const tourIdParam = searchParams.get("tourId") || "";

  const [tourUrl, setTourUrl] = useState(tourUrlParam);
  const [tags, setTags] = useState<TagInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedSid, setCopiedSid] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const extractModelId = (url: string): string | null => {
    try {
      const u = new URL(url);
      return u.searchParams.get("m");
    } catch {
      return null;
    }
  };

  const loadTags = async () => {
    const modelId = extractModelId(tourUrl);
    if (!modelId) {
      setError("URL invalide. Utilisez le format: https://my.matterport.com/show/?m=XXXX");
      return;
    }

    setLoading(true);
    setError("");
    setTags([]);

    try {
      // Use the Matterport SDK to connect to the iframe and extract tags
      const { setupSdk } = await import("@matterport/sdk");

      const embedUrl = `https://my.matterport.com/show/?m=${modelId}&play=1&qs=1&applicationKey=${SDK_KEY}&brand=0&title=0`;

      // Update iframe src
      if (iframeRef.current) {
        iframeRef.current.src = embedUrl;
      }

      // Wait for iframe to load
      await new Promise<void>((resolve) => {
        if (iframeRef.current) {
          iframeRef.current.onload = () => resolve();
        }
      });

      // Connect SDK with timeout
      const sdk = await Promise.race([
        setupSdk(SDK_KEY, {
          iframe: iframeRef.current!,
          space: modelId,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("SDK timeout — la clé SDK n'est pas autorisée pour ce domaine. Ajoutez votre domaine dans my.matterport.com/settings/account/devtools")), 15000)
        ),
      ]);

      const allTags: TagInfo[] = [];

      // Try Mattertag API
      if (sdk.Mattertag?.getData) {
        const mattertags = await sdk.Mattertag.getData();
        for (const t of mattertags) {
          allTags.push({
            sid: t.sid,
            label: t.label || "(sans nom)",
            description: (t.description || "").slice(0, 100),
          });
        }
      }

      // Try newer Tag API
      if ((sdk as any).Tag?.getData) {
        const tagData = await (sdk as any).Tag.getData();
        for (const t of tagData) {
          if (!allTags.find((a) => a.sid === t.sid)) {
            allTags.push({
              sid: t.sid,
              label: t.label || "(sans nom)",
              description: (t.description || "").slice(0, 100),
            });
          }
        }
      }

      setTags(allTags);
      if (allTags.length === 0) {
        setError("Aucun tag trouvé dans cette visite.");
      }
    } catch (err: any) {
      setError(err.message || "Erreur de connexion SDK");
    } finally {
      setLoading(false);
    }
  };

  const copySid = (sid: string) => {
    navigator.clipboard.writeText(sid).then(() => {
      setCopiedSid(sid);
      setTimeout(() => setCopiedSid(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            to="/admin"
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Admin
          </Link>
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-purple-400" />
            <h1 className="text-lg font-bold">Tag Finder</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Instructions */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-white/80 mb-2">Comment ça marche ?</h2>
          <ol className="text-sm text-white/50 space-y-1 list-decimal list-inside">
            <li>Collez l'URL Matterport de votre visite ci-dessous</li>
            <li>Cliquez "Charger les Tags" — cela connecte le SDK à la visite</li>
            <li>Copiez le SID du tag que vous voulez lier à un produit</li>
            <li>Collez-le dans le champ "Tag Matterport" du produit dans l'Admin</li>
          </ol>
          <p className="text-xs text-amber-400/70 mt-3">
            ⚠ Nécessite que votre domaine (localhost, primespace.studio) soit autorisé dans{" "}
            <a href="https://my.matterport.com/settings/account/devtools" target="_blank" rel="noopener noreferrer" className="underline hover:text-amber-300">
              Matterport Developer Portal
            </a>
          </p>
        </div>

        {/* URL Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              value={tourUrl}
              onChange={(e) => setTourUrl(e.target.value)}
              placeholder="https://my.matterport.com/show/?m=uFoMEoPzgBE"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <button
            onClick={loadTags}
            disabled={loading || !tourUrl}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/30 disabled:text-white/30 text-white text-sm font-semibold transition-all shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {loading ? "Chargement..." : "Charger les Tags"}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Tags List */}
        {tags.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-white/60 mb-3">
              {tags.length} tag{tags.length > 1 ? "s" : ""} trouvé{tags.length > 1 ? "s" : ""}
            </h2>
            {tags.map((tag) => (
              <div
                key={tag.sid}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:bg-white/[0.07] transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-purple-500/15 flex items-center justify-center shrink-0">
                  <Tag className="w-5 h-5 text-purple-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-white/80 text-sm font-medium truncate">{tag.label}</p>
                  {tag.description && (
                    <p className="text-white/30 text-xs truncate mt-0.5">{tag.description}</p>
                  )}
                  <p className="text-purple-300/60 text-xs font-mono mt-1">SID: {tag.sid}</p>
                </div>
                <button
                  onClick={() => copySid(tag.sid)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 text-xs font-medium transition-all shrink-0"
                >
                  {copiedSid === tag.sid ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Copié!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copier SID
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Hidden iframe for SDK connection */}
        <iframe
          ref={iframeRef}
          className="w-full h-[400px] rounded-xl border border-white/10 mt-6"
          style={{ display: loading || tags.length > 0 ? "block" : "none" }}
          allow="xr-spatial-tracking"
        />

        {/* Alternative: Manual method */}
        {!loading && tags.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 mt-6">
            <h3 className="text-sm font-semibold text-white/70 mb-3">Méthode alternative (sans SDK)</h3>
            <ol className="text-sm text-white/40 space-y-2 list-decimal list-inside">
              <li>
                Ouvrez votre visite dans le{" "}
                <a href="https://my.matterport.com/models" target="_blank" rel="noopener noreferrer" className="text-purple-400 underline">
                  Workshop Matterport
                </a>
              </li>
              <li>Cliquez sur un tag dans la liste à droite</li>
              <li>Regardez l'URL dans la barre d'adresse — le tag SID apparaît après <code className="text-purple-300/60">&tag=</code></li>
              <li>Copiez ce SID et collez-le dans l'Admin</li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default TagFinder;
