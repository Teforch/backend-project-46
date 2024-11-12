import path from 'path';
import { readFileSync } from 'fs';
import parse from './parsers.js';
import makeAstTree from './makeAstTree.js';
import makeFormat from './formatters/index.js';

const getPath = (filepath) => path.resolve(process.cwd(), filepath);
const getAbsPath = (filepath) => readFileSync(getPath(filepath), 'utf8');
const getExtension = (pathToFile) => path.extname(pathToFile).slice(1);

const genDiff = (pathToFile1, pathToFile2, format) => {
  const extension1 = getExtension(pathToFile1);
  const extension2 = getExtension(pathToFile2);

  const obj1 = getAbsPath(pathToFile1);
  const obj2 = getAbsPath(pathToFile2);

  const parsedObj1 = parse(obj1, extension1);
  const parsedObj2 = parse(obj2, extension2);

  const obj = makeAstTree(parsedObj1, parsedObj2);

  return makeFormat(obj, format);
};

export default genDiff;
