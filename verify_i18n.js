const fs = require('fs');

const content = fs.readFileSync('client/src/lib/i18n.ts', 'utf8');

function extractKeys(text, startMarker, endMarker) {
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) return [];

  // Find matching brace
  let openBraces = 0;
  let endIndex = -1;
  let inBlock = false;

  for (let i = startIndex; i < text.length; i++) {
    if (text[i] === '{') {
      openBraces++;
      inBlock = true;
    } else if (text[i] === '}') {
      openBraces--;
      if (inBlock && openBraces === 0) {
        endIndex = i;
        break;
      }
    }
  }

  if (endIndex === -1) return [];

  const block = text.substring(startIndex, endIndex + 1);
  const lines = block.split('\n');
  const keys = [];
  const duplicates = [];
  const keySet = new Set();

  lines.forEach((line, index) => {
    const match = line.match(/^\s*([a-zA-Z0-9_]+):/);
    if (match) {
      const key = match[1];
      if (keySet.has(key)) {
        duplicates.push({ key, line: index + 1 }); // Relative line number
      } else {
        keySet.add(key);
        keys.push(key);
      }
    }
  });

  return { keys: keySet, duplicates, list: keys };
}

const en = extractKeys(content, 'en: {', '},');
const ka = extractKeys(content, 'ka: {', '},'); // Assuming logical structure

console.log('--- EN Duplicates ---');
en.duplicates.forEach((d) => console.log(`${d.key}`));

console.log('\n--- KA Duplicates ---');
ka.duplicates.forEach((d) => console.log(`${d.key}`));

console.log('\n--- Missing in KA (present in EN) ---');
let missingInKa = [];
en.list.forEach((key) => {
  if (!ka.keys.has(key)) {
    console.log(key);
    missingInKa.push(key);
  }
});

console.log('\n--- Missing in EN (present in KA) ---');
let missingInEn = [];
ka.list.forEach((key) => {
  if (!en.keys.has(key)) {
    console.log(key);
    missingInEn.push(key);
  }
});
