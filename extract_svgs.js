const openfig = require('openfig-core');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('decoded_figma.json'));

function vectorNetworkToSVGPath(network, scaleX = 1, scaleY = 1) {
  const { vertices, segments, regions } = network;
  const pathParts = [];

  const loopsToRender = [];
  if (regions && regions.length > 0) {
    for (const region of regions) {
      for (const loop of region.loops) {
        loopsToRender.push(loop);
      }
    }
  } else {
    loopsToRender.push(segments.map((_, i) => i));
  }

  for (const loop of loopsToRender) {
    if (loop.length === 0) continue;
    let currentVertex = null;

    for (let i = 0; i < loop.length; i++) {
      const segIndex = loop[i];
      const seg = segments[segIndex];
      const startV = vertices[seg.start.vertex];
      const endV = vertices[seg.end.vertex];

      let forward = true;
      if (currentVertex === null) {
        pathParts.push(`M ${(startV.x * scaleX).toFixed(3)} ${(startV.y * scaleY).toFixed(3)}`);
        currentVertex = seg.end.vertex;
      } else if (seg.start.vertex === currentVertex) {
        forward = true;
        currentVertex = seg.end.vertex;
      } else if (seg.end.vertex === currentVertex) {
        forward = false;
        currentVertex = seg.start.vertex;
      } else {
        pathParts.push(`M ${(startV.x * scaleX).toFixed(3)} ${(startV.y * scaleY).toFixed(3)}`);
        forward = true;
        currentVertex = seg.end.vertex;
      }

      const p0 = forward ? startV : endV;
      const p1 = forward ? endV : startV;
      const t0 = forward ? seg.start : seg.end;
      const t1 = forward ? seg.end : seg.start;

      if (seg.isStraight || (t0.dx === 0 && t0.dy === 0 && t1.dx === 0 && t1.dy === 0)) {
        pathParts.push(`L ${(p1.x * scaleX).toFixed(3)} ${(p1.y * scaleY).toFixed(3)}`);
      } else {
        const cp1x = (p0.x + t0.dx) * scaleX;
        const cp1y = (p0.y + t0.dy) * scaleY;
        const cp2x = (p1.x + t1.dx) * scaleX;
        const cp2y = (p1.y + t1.dy) * scaleY;
        const x = p1.x * scaleX;
        const y = p1.y * scaleY;
        pathParts.push(`C ${cp1x.toFixed(3)} ${cp1y.toFixed(3)}, ${cp2x.toFixed(3)} ${cp2y.toFixed(3)}, ${x.toFixed(3)} ${y.toFixed(3)}`);
      }
    }
    pathParts.push('Z');
  }

  return pathParts.join(' ');
}

function getVectors(node, parentX = 0, parentY = 0) {
  const children = data.nodeChanges.filter(n => 
    n.parentIndex && n.parentIndex.guid && 
    n.parentIndex.guid.sessionID === node.guid.sessionID && 
    n.parentIndex.guid.localID === node.guid.localID
  );
  let result = [];
  for (const c of children) {
    const x = parentX + (c.transform ? c.transform.m02 : 0);
    const y = parentY + (c.transform ? c.transform.m12 : 0);
    if (c.type === 'VECTOR' && c.vectorData && typeof c.vectorData.vectorNetworkBlob === 'number') {
      result.push({ node: c, x, y });
    } else {
      result = result.concat(getVectors(c, x, y));
    }
  }
  return result;
}

// 1. Export Main Logo
const mainLogo = data.nodeChanges.find(n => n.name === 'Main Logo');
const mainVectors = getVectors(mainLogo);
let mainSvgPaths = [];
for (const v of mainVectors) {
  const blobBytes = openfig.getBlobBytes({ message: data }, v.node.vectorData.vectorNetworkBlob);
  const net = openfig.parseVectorNetworkBlob(blobBytes);
  const scaleX = v.node.size.x / v.node.vectorData.normalizedSize.x;
  const scaleY = v.node.size.y / v.node.vectorData.normalizedSize.y;
  const d = vectorNetworkToSVGPath(net, scaleX, scaleY);
  mainSvgPaths.push(`  <path d="${d}" transform="translate(${v.x.toFixed(3)}, ${v.y.toFixed(3)})" fill="currentColor" fill-rule="evenodd" />`);
}
const mainLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1416 106.1" width="100%" height="100%" fill="none">\n${mainSvgPaths.join('\n')}\n</svg>`;
fs.writeFileSync('main_logo.svg', mainLogoSvg);
console.log('Saved main_logo.svg');

// 2. Export Combact Logo (Nav Logo)
const compactLogo = data.nodeChanges.find(n => n.name === 'Combact Logo');
const compactVectors = getVectors(compactLogo);
let compactSvgPaths = [];
for (const v of compactVectors) {
  const blobBytes = openfig.getBlobBytes({ message: data }, v.node.vectorData.vectorNetworkBlob);
  const net = openfig.parseVectorNetworkBlob(blobBytes);
  const scaleX = v.node.size.x / v.node.vectorData.normalizedSize.x;
  const scaleY = v.node.size.y / v.node.vectorData.normalizedSize.y;
  const d = vectorNetworkToSVGPath(net, scaleX, scaleY);
  compactSvgPaths.push(`  <path d="${d}" transform="translate(${v.x.toFixed(3)}, ${v.y.toFixed(3)})" fill="currentColor" fill-rule="evenodd" />`);
}
const compactLogoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 73.1 7.8" width="73.1" height="7.8" fill="none">\n${compactSvgPaths.join('\n')}\n</svg>`;
fs.writeFileSync('compact_logo.svg', compactLogoSvg);
console.log('Saved compact_logo.svg');
