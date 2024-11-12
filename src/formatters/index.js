import formatStylish from './stylish.js';
import formatPlain from './plain.js';

const makeFormat = (diffData, formatName = 'stylish') => {
  switch (formatName) {
    case 'stylish':
      return formatStylish(diffData);
    case 'plain':
      return formatPlain(diffData);
    case 'json':
      return JSON.stringify(diffData);
    default:
      throw new Error(`Format error: '${formatName}'`);
  }
};

export default makeFormat;
