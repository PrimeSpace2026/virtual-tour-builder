export default async function handler(req, res) {
  const { searchParams } = new URL(req.url, `https://${req.headers.host}`);
  const modelId = searchParams.get("modelId");
  if (!modelId) return res.status(400).json({ error: "modelId required" });

  try {
    const r = await fetch("https://my.matterport.com/api/models/graph", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{ model(id: "${modelId}") { mattertags { sid label description anchorPosition { x y z } } } }`
      }),
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
