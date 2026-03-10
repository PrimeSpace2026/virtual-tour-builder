async function main() {
  const r = await fetch('https://matterport.com/industries/commercial-real-estate');
  const h = await r.text();
  require('fs').writeFileSync('matterport-cre.html', h);
  const d = h.match(/__NEXT_DATA__[^>]*>([\s\S]*?)<\/script/);
  if (d) {
    const j = JSON.parse(d[1]);
    const str = JSON.stringify(j);
    // Find feature grid section
    const fgMatch = str.match(/"FeatureGrid"[\s\S]*?"features":\[([\s\S]*?)\](?=,"__typename"|$)/);
    if (fgMatch) {
      // Extract all image URLs in feature grid section
      const section = fgMatch[0].substring(0, 3000);
      require('fs').writeFileSync('cre-featuregrid.txt', section);
      console.log('Feature grid section saved');
    }
    // Also extract all ctfassets URLs
    const imgs = [...str.matchAll(/"url":"(https:\/\/images\.ctfassets\.net\/[^"]+)"/g)];
    const unique = [...new Set(imgs.map(x => x[1]))];
    console.log(`Found ${unique.length} image URLs`);
    unique.forEach(u => console.log(u));
  } else {
    console.log('No NEXT_DATA found');
  }
}
main().catch(e => console.error(e));
