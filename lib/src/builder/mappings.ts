import { existsSync } from 'fs';
import * as path from 'path';

export const getMapping = ({ filePath, inOut }) => {
  const resolvedPath = path.resolve(filePath).split('.')[0];
  const file = `${resolvedPath}.${inOut}.ts`;
  return existsSync(file) ? require(file) : '';
};

export const getMappings = ({ types, abiFunc, config, isInput }) => {
  const inputsOrOutputs = isInput ? abiFunc.inputs : abiFunc.outputs;
  const mappedFunctions = inputsOrOutputs.reduce((str, curr, index) => {
    types.mapType(curr.type);
    const userSuppliedMappingExists =
      config && config[abiFunc.name] && config[abiFunc.name][index];
    const name =
        curr.name || userSuppliedMappingExists || `${curr.type}_${index}`;
    return (str += `${name}: ${curr.type}${index === inputsOrOutputs.length - 1
      ? ''
      : ', '}`);
  }, '');
  return mappedFunctions;
};
