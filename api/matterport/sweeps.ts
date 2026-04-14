const GRAPH_URL = "https://my.matterport.com/api/models/graph";

export default async function handler(req: any, res: any) {
  const url = new URL(req.url || "", `http://${req.headers.host}`);
  const modelId = url.searchParams.get("modelId");
  if (!modelId) return res.status(400).json({ error: "modelId required" });

  const query = `{ model(id: "${modelId}") { sweeps { id uuid position { x y z } floor neighbors } } }`;

  try {
    const r = await fetch(GRAPH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
}
