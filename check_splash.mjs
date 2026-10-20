import fs from 'fs';

const code = fs.readFileSync('norque_live_js.js', 'utf8');

// Find all occurrences of document.getElementById
let idx = 0;
while ((idx = code.indexOf('getElementById', idx)) !== -1) {
  console.log('=== getElementById at', idx, '===');
  console.log(code.slice(idx - 200, idx + 400));
  idx += 14;
}

// Also check the end of the file (last 10000 chars)
console.log('=== End of norque_live_js.js ===');
console.log(code.slice(-5000));
