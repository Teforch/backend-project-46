import _ from "lodash";

const compareObjects = (obj1, obj2) => {
  const keysObj1 = Object.keys(obj1);
  const keysObj2 = Object.keys(obj2);

  const connectedArr = _.uniq(keysObj1.concat(keysObj2).sort());

  const result = connectedArr.flatMap((key) => {
    if (keysObj2.includes(key) && keysObj1.includes(key)) {
      if (obj1[key] === obj2[key]) {
        return [`    ${key}: ${obj1[key]}`];
      }
      return [`  - ${key}: ${obj1[key]}`, `  + ${key}: ${obj2[key]}`];
    }
    if (keysObj1.includes(key)) {
      return [`  - ${key}: ${obj1[key]}`];
    }
    return [`  + ${key}: ${obj2[key]}`];
  });
  result.unshift(`{`);
  result.push(`}`);

  return result.join("\n");
};
export default compareObjects;
