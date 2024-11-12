import url from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';
import parse from '../src/parsers.js';
import makeFormat from '../src/formatters/index.js';
import plain from '../src/formatters/plain.js';
import stylish from '../src/formatters/stylish';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const testFile = readFile('result.txt');
const fileJson1 = './__fixtures__/file1.json';
const fileJson2 = './__fixtures__/file2.json';
const fileYml1 = './__fixtures__/file1.yml';
const fileYml2 = './__fixtures__/file2.yml';

const testNested = readFile('resultNested.txt');
const fileJson3 = './__fixtures__/file3.json';
const fileJson4 = './__fixtures__/file4.json';
const fileYml3 = './__fixtures__/file3.yaml';
const fileYml4 = './__fixtures__/file4.yaml';

const testPlain = readFile('resultPlain.txt');
const testJson = readFile('resultJson.txt');

test('genDiff stylish: JSON', () => {
  expect(genDiff(fileJson1, fileJson2)).toEqual(testFile);
});
test('genDiff stylish: YML', () => {
  expect(genDiff(fileYml1, fileYml2)).toEqual(testFile);
});
test('genDiff stylish: JSON & YML', () => {
  expect(genDiff(fileJson1, fileYml2)).toEqual(testFile);
});

test('genDiff stylish: JSON nested files', () => {
  expect(genDiff(fileJson3, fileJson4)).toEqual(testNested);
});
test('genDiff stylish: YML nested files', () => {
  expect(genDiff(fileYml3, fileYml4)).toEqual(testNested);
});
test('genDiff stylish: JSON & YML nested files', () => {
  expect(genDiff(fileJson3, fileYml4)).toEqual(testNested);
});

test('genDiff plain: JSON & YML nested files', () => {
  expect(genDiff(fileJson3, fileYml4, 'plain')).toEqual(testPlain);
});

test('genDiff json: JSON & YML nested files', () => {
  expect(genDiff(fileJson3, fileYml4, 'json')).toEqual(testJson);
});

test('check: invalid parsers', () => {
  expect(() => parse('oops')).toThrow("Unknown parsing format 'undefined'");
});

test('check: invalid format', () => {
  const obj = [{ key: 'someone' }];
  expect(() => makeFormat(obj, 'lalalend')).toThrow("Format error: 'lalalend'");
});

test('check: invalid stylish', () => {
  const obj = [{ key: 'someone' }];
  expect(() => stylish(obj)).toThrow('');
});

test('check: invalid plain', () => {
  const obj = [{ key: 'someone' }];
  expect(() => plain(obj)).toThrow('');
});
