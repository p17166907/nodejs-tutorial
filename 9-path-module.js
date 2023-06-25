const path = require('path');
console.log(path);
console.log(path.sep); // prints: \

const filePath = path.join('/content', 'subfolder', 'text.txt');
console.log(filePath); // prints: /content/subfolder/text.txt

const base = path.basename(filePath);
console.log(base); // prints: text.txt

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'text.txt');
console.log(absolute); // prints: C:\Users\EvanDuru\NodeJS Tutorial\content\subfolder\text.txt