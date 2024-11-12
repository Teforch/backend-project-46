import yaml from 'js-yaml';

export default (data, format) => {
  const parser = {
    json: JSON.parse,
    yaml: yaml.load,
    yml: yaml.load,
  };

  return parser[format](data);
};
