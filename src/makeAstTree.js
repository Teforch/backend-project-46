import _ from 'lodash';

const isNested = (value1, value2) => _.isObject(value1) && _.isObject(value2);

const makeAstTree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const objTree = keys.map((key) => {
    if (isNested(obj1[key], obj2[key])) {
      return { key, children: makeAstTree(obj1[key], obj2[key]), status: 'nested' };
    }
    if (!Object.hasOwn(obj1, key)) {
      return { key, status: 'added', value: obj2[key] };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, status: 'deleted', value: obj1[key] };
    }
    if (obj1[key] === obj2[key]) {
      return { key, status: 'unchanged', value: obj1[key] };
    }
    return {
      key, status: 'updated', value1: obj1[key], value2: obj2[key],
    };
  });
  return objTree;
};

export default makeAstTree;
