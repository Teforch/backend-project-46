import compareObjects from '../src/compareObjects.js';

test('compareObjects', () => {
  const obj1 = JSON.parse(`{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}`);

  const obj2 = JSON.parse(`{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}`);
  const formatedObj = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(compareObjects(obj1, obj2)).toEqual(formatedObj);
});
