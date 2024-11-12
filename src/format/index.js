import stylishFormat from './stylish.js';
import plainFormat from './plain.js';

const formatStyle = {
  stylish: stylishFormat,
  plain: plainFormat,
};

export default (data, formatName) => {
  if (formatStyle[formatName]) {
    return formatStyle[formatName](data);
  }
  throw new Error('Неизвестный формат');
};
