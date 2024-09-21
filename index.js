import getAbsoluteFilePath from './src/getAbsoluteFilePath.js';
import parseFile from './src/parseFile.js';
import compareObjects from './src/compareObjects.js';

export default (filepath1, filepath2) => {
  const absoluteFilePath1 = getAbsoluteFilePath(filepath1);
  const absoluteFilePath2 = getAbsoluteFilePath(filepath2);

  const object1 = parseFile(absoluteFilePath1);
  const object2 = parseFile(absoluteFilePath2);

  const comparedObjects = compareObjects(object1, object2);

  console.log(comparedObjects);
};
