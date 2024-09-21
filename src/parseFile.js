import fs from 'node:fs';

const parseFile = (filePath) => {
  const file = fs.readFileSync(filePath);

  return JSON.parse(file);
};
export default parseFile;
