/* eslint-disable no-multiple-empty-lines */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
const l = console.log;
const idn = ' ';
const depth = 0;
l();

const objLog = (key, val) => {
  const s = typeof val === 'object' ? objLog(key, val) : ` ${key}: ${val}\n`;
};


const format = (tree) => {
  const iter = (node, depth) => {
    const resArr = [];
    node.forEach((i) => {
      if (typeof i.type === 'nested') {
        const str = `${i.key}: ${iter(i.value, depth + 1)}\n`;
        resArr.push(str);
      }
    });
  };

  return iter(tree, depth);
};

export default format;
