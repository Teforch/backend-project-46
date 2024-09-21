import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { parseFileJSON, parseFileYML } from '../src/parseFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const obj = JSON.parse(`{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`);

test('parseFileJSON', () => {
  const fixturePath = path.join(__dirname, '../__fixtures__', 'file1.json');

  expect(parseFileJSON(fixturePath)).toEqual(obj);
});

test('parseFileYML', () => {
  const fixturePathYML = path.join(__dirname, '../__fixtures__', 'file1.yml');
  const fixturePathYAML = path.join(__dirname, '../__fixtures__', 'file1.yaml');

  expect(parseFileYML(fixturePathYML)).toEqual(obj);
  expect(parseFileYML(fixturePathYAML)).toEqual(obj);
});
