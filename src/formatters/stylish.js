import _ from 'lodash';

const indent = (depth) => ' '.repeat((depth * 4) - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const keys = Object.keys(value);
  const getKeys = keys.map((key) => `${indent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${getKeys.join('\n')}\n  ${indent(depth)}}`;
};

const formatStylish = (objTree) => {
  const step = (tree, depth) => tree.map((node) => {
    const getValue = (value, sign) => `${indent(depth)}${sign} ${node.key}: ${stringify(value, depth)}\n`;
    switch (node.status) {
      case 'nested':
        return `${indent(depth)}  ${node.key}: {\n${step(node.children, depth + 1).join('')}${indent(depth)}  }\n`;
      case 'added':
        return getValue(node.value, '+');
      case 'deleted':
        return getValue(node.value, '-');
      case 'unchanged':
        return getValue(node.value, ' ');
      case 'updated':
        return `${getValue(node.value1, '-')}${getValue(node.value2, '+')}`;
      default:
        throw new Error(`Not exist: ${node.status}`);
    }
  });
  return `{\n${step(objTree, 1).join('')}}`;
};
export default formatStylish;
