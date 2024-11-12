import _ from 'lodash';

const whatIsValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (value === null) {
    return null;
  }
  return String(value);
};

const formatPlain = (objTree) => {
  const format = (nodes, property) => nodes
    .filter((node) => node.status !== 'unchanged')
    .map((node) => {
      const item = property ? `${property}.${node.key}` : node.key;
      switch (node.status) {
        case 'nested':
          return `${format(node.children, item)}`;
        case 'added':
          return `Property '${item}' was added with value: ${whatIsValue(node.value)}`;
        case 'deleted':
          return `Property '${item}' was removed`;
        case 'updated':
          return `Property '${item}' was updated. From ${whatIsValue(node.value1)} to ${whatIsValue(node.value2)}`;
        default:
          throw new Error(`Not exist: ${node.status}`);
      }
    }).join('\n');
  return format(objTree, 0);
};

export default formatPlain;
