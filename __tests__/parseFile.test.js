import parseFile from '../src/parseFile.js';

test('parseFile', () => {
  const filepath = '/home/user/lessons/backend-project-46/__fixtures__/file1.json';
  const obj = JSON.parse(`{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`);

  expect(parseFile(filepath)).toEqual(obj);
});
