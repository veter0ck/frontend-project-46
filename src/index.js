import fs from 'fs';
import _ from 'lodash';

export default (filepath1, filepath2) => {
  const dataFilepath1 = fs.readFileSync(filepath1, 'utf8');
  const dataFilepath1Parse = JSON.parse(dataFilepath1);

  const dataFilepath2 = fs.readFileSync(filepath2, 'utf8');
  const dataFilepath2Parse = JSON.parse(dataFilepath2);

  const keysFile1Parse = _.keys(dataFilepath1Parse);
  const keysFile2Parse = _.keys(dataFilepath2Parse);
  const keys = _.sortBy(_.union(keysFile1Parse, keysFile2Parse));

  const result = keys.map((key) => {
    if (!_.has(dataFilepath1Parse, key)) {
      return `  + ${key}: ${dataFilepath2Parse[key]}`;
    }
    if (!_.has(dataFilepath2Parse, key)) {
      return `  - ${key}: ${dataFilepath1Parse[key]}`;
    }
    if (dataFilepath1Parse[key] !== dataFilepath2Parse[key]) {
      return `  - ${key}: ${dataFilepath1Parse[key]}\n  + ${key}: ${dataFilepath2Parse[key]}`;
    }
    return `    ${key}: ${dataFilepath1Parse[key]}`;
  })

  return `{\n${result.join('\n')}\n}`;
};