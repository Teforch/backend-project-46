import path from 'path';
import getAbsoluteFilePath from './src/getAbsoluteFilePath.js';
import { parseFileJSON, parseFileYML } from './src/parseFile.js';
import compareObjects from './src/compareObjects.js';

export default (filepath1, filepath2) => {
  const absoluteFilePath1 = getAbsoluteFilePath(filepath1);
  const absoluteFilePath2 = getAbsoluteFilePath(filepath2);
  const extname = path.extname(absoluteFilePath1);
  let object1;
  let object2;
  if (extname === '.json') {
    object1 = parseFileJSON(absoluteFilePath1);
    object2 = parseFileJSON(absoluteFilePath2);
  } else if (extname === '.yml' || extname === '.yaml') {
    object1 = parseFileYML(absoluteFilePath1);
    object2 = parseFileYML(absoluteFilePath2);
  }
  const comparedObjects = compareObjects(object1, object2);

  console.log(comparedObjects);
};
