const fs = require('fs');
const d = JSON.parse(fs.readFileSync('matterport-data.json', 'utf8'));
const sections = d.props.pageProps.page.sections;
sections.forEach((s, i) => {
  console.log(i, s.sectionType, s.sectionHeading || '');
});
