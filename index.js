import getAbsoluteFilePath from "./src/getAbsoluteFilePaths.js";
import parseFile from "./src/parseFile.js";

export default (filepath1, filepath2) => {
  const absoluteFilePath1 = getAbsoluteFilePath(filepath1);
  const absoluteFilePath2 = getAbsoluteFilePath(filepath2);

  const object1 = parseFile(absoluteFilePath1);
  const object2 = parseFile(absoluteFilePath2);

  console.log({ object1, object2 });
};
