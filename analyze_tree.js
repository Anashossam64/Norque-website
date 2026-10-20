const fs = require('fs');
const data = JSON.parse(fs.readFileSync('decoded_figma.json'));

const nodesByGuid = new Map();
data.nodeChanges.forEach(n => {
  nodesByGuid.set(n.guid.sessionID + ':' + n.guid.localID, n);
});

function getChildren(node) {
  return data.nodeChanges.filter(n => 
    n.parentIndex && n.parentIndex.guid && 
    n.parentIndex.guid.sessionID === node.guid.sessionID && 
    n.parentIndex.guid.localID === node.guid.localID
  ).sort((a, b) => {
    const ya = a.transform ? a.transform.m12 : 0;
    const yb = b.transform ? b.transform.m12 : 0;
    if (Math.abs(ya - yb) > 0.01) return ya - yb;
    const xa = a.transform ? a.transform.m02 : 0;
    const xb = b.transform ? b.transform.m02 : 0;
    return xa - xb;
  });
}

function dumpTree(node, depth = 0) {
  const indent = '  '.repeat(depth);
  const info = [];
  if (node.size) info.push(`${node.size.x.toFixed(1)}x${node.size.y.toFixed(1)}`);
  if (node.transform) info.push(`pos:(${node.transform.m02.toFixed(1)},${node.transform.m12.toFixed(1)})`);
  if (node.fontSize) info.push(`fs:${node.fontSize}`);
  if (node.fontName) info.push(`${node.fontName.family} ${node.fontName.style}`);
  if (node.lineHeight) info.push(`lh:${JSON.stringify(node.lineHeight)}`);
  if (node.letterSpacing) info.push(`ls:${JSON.stringify(node.letterSpacing)}`);
  if (node.fillPaints && node.fillPaints.length) {
    const fp = node.fillPaints[0];
    if (fp.type === 'IMAGE') {
      let hash = 'no-hash';
      if (fp.image && fp.image.hash) {
        hash = Buffer.from(Object.values(fp.image.hash)).toString('hex');
      }
      info.push(`IMAGE:${hash} (${fp.image?.name || ''})`);
    }
    if (fp.type === 'SOLID' && fp.color) {
      info.push(`COLOR:rgba(${(fp.color.r*255).toFixed(0)},${(fp.color.g*255).toFixed(0)},${(fp.color.b*255).toFixed(0)},${(fp.color.a ?? 1).toFixed(2)})`);
    }
  }
  if (node.layoutMode) info.push(`layout:${node.layoutMode}`);
  if (node.itemSpacing) info.push(`gap:${node.itemSpacing}`);
  if (node.paddingLeft) info.push(`pad:[${node.paddingTop},${node.paddingRight},${node.paddingBottom},${node.paddingLeft}]`);
  if (node.textData) info.push(`TEXT:${JSON.stringify(node.name.length > 60 ? node.name.slice(0, 60) + '...' : node.name)}`);

  console.log(`${indent}[${node.type}] ${node.name} (${info.join(' | ')})`);
  const children = getChildren(node);
  children.forEach(c => dumpTree(c, depth + 1));
}

const home = data.nodeChanges.find(n => n.name === 'HOME');
dumpTree(home);
