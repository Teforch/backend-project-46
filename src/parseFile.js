import fs from 'node:fs';
import yaml from 'js-yaml';

export const parseFileJSON = (filePath) => {
  const file = fs.readFileSync(filePath);

  return JSON.parse(file);
};

export const parseFileYML = (filePath) => {
  const file = fs.readFileSync(filePath);

  return yaml.load(file);
};
