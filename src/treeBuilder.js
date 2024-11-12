import _ from 'lodash';

const buildTree = (data1, data2) => {
  let obj = {};
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const res = keys.map((key) => {
    obj = {};
    obj.key = key;

    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      obj.type = 'nested';
      obj.value = buildTree(data1[key], data2[key]);
      return obj;
    }

    if (!Object.hasOwn(data2, key)) {
      obj.value = data1[key];
      obj.type = 'deleted';
      return obj;
    }

    if (!Object.hasOwn(data1, key)) {
      obj.value = data2[key];
      obj.type = 'added';
      return obj;
    }

    if (data1[key] !== data2[key]) {
      obj.value = data1[key];
      obj.value2 = data2[key];
      obj.type = 'changed';
      return obj;
    }

    obj.type = 'unchanged';
    obj.value = data1[key];

    return obj;
  });

  return _.sortBy(res, (i) => i.key);
};

export default buildTree;
