/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
import _ from 'lodash';

const l = console.log;
const idn = ' ';
l();

const objLog = (key, val) => {
  const s = typeof val === 'object'
    ? objLog(key, val)
    : ` ${key}: ${val}\n`;
};

const stylish = (tree, deep) => {
  if (!tree || typeof tree !== 'object') return `${tree}\n`;

  if (Array.isArray(tree)) {
    return tree.flatMap((i) => stylish(i, deep)).join('');
  }

  if (typeof tree === 'object' && tree?.value) {
    l('tree?.key', tree?.key);
    const res = stylish(tree.value, deep + 1);
    return `{\n${idn.repeat(deep)}${res}${idn.repeat(deep)}}\n`;
  }

  if (!tree.type && typeof tree === 'object') {
    const res = Object.entries(tree).map(
      ([k, v]) => `${idn.repeat(deep)}  ${k}: ${stylish(v, deep + 1)}`,
    ).join('');
    return `{\n${idn.repeat(deep)}${res}${idn.repeat(deep)}}\n`;
  }

  if (tree.type === 'changed') {
    const res = stylish(tree.value, deep + 1);
    const res2 = stylish(tree.value2, deep + 1);
    const str = `${idn.repeat(deep)}- ${tree.key}: ${res}`
    + `${idn.repeat(deep)}+ ${tree.key}: ${res2}`;
    return str;
  }

  if (tree.type === 'deleted') {
    const res = stylish(tree.value, deep + 1);
    return `${idn.repeat(deep)}- ${tree.key}: ${res}`;
  }

  if (tree.type === 'added') {
    const res = stylish(tree.value, deep + 1);
    return `${idn.repeat(deep)}+ ${tree.key}: ${res}`;
  }

  if (tree.type === 'unchanged') {
    const res = stylish(tree.value, deep + 1);
    return `${idn.repeat(deep)}  ${tree.key}: ${res}`;
  }

  if (tree?.type === 'nested' || typeof tree === 'object') {
    const res = stylish(tree.value, deep + 1);
    const str = `${idn.repeat(deep)}  ${tree.key}: {\n`
    + `${res}${idn.repeat(deep)}}\n`;
    return str;
  }

  l('tree.key', tree.key);
  const res = stylish(tree.value, deep + 1);
  return `${idn.repeat(deep)}${tree.key}==: ${res}`;
};

const format = (tree, formatStyle = 'stylish') => {
  const deep = 0;
  const formatRes = stylish(tree, deep);
  l();
  l(formatRes);
  l();
  return formatRes;
};

export default format;
