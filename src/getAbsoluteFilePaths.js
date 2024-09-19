import process from "node:process";
import path from "path";

const getAbsoluteFilePath = (filePath) => {
  const currentDirectory = process.cwd();

  const absoluteFilePath = path.resolve(currentDirectory, filePath);

  return absoluteFilePath;
};
export default getAbsoluteFilePath;
