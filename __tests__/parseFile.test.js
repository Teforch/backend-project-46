import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import parseFile from '../src/parseFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('parseFile', () => {
  const fixturePath = path.join(__dirname, '../__fixtures__', 'file1.json');
  const obj = JSON.parse(`{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`);

  expect(parseFile(fixturePath)).toEqual(obj);
});
