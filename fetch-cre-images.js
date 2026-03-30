async function main() {
  const r = await fetch('https://matterport.com/industries/commercial-real-estate');
  const h = await r.text();
  const d = h.match(/__NEXT_DATA__[^>]*>([\s\S]*?)<\/script/);
  if (d) {
    const j = JSON.parse(d[1]);
    const s = JSON.stringify(j);
    // Find FeatureGrid sections
    const featureMatch = s.match(/FeatureGrid/g);
    console.log('FeatureGrid count:', featureMatch ? featureMatch.length : 0);
    // Extract all image URLs
    const imgs = [...s.matchAll(/images\.ctfassets\.net\/[^"]+/g)];
    const unique = [...new Set(imgs.map(x => x[0]))];
    unique.forEach(u => console.log('https://' + u));
  } else {
    console.log('No NEXT_DATA. Page length:', h.length);
    // Try raw image extraction
    const imgs = [...h.matchAll(/https:\/\/images\.ctfassets\.net\/[^"'\s)]+/g)];
    const unique = [...new Set(imgs.map(x => x[0]))];
    unique.forEach(u => console.log(u));
  }
}
main().catch(e => console.error(e));
