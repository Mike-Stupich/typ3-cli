import { readFile } from 'fs';
import * as path from 'path';

export const openCustomOutputFile = async (filePath: string): Promise<string> => {
  const resolvedPath = path.resolve(filePath).split('.')[0];
  const file = `${resolvedPath}.output.ts`;
  let contents;
  try {
    contents = require(file);
  } catch (err) {
    contents = '';
  }
  return contents;
};

export const getMappings = async (
  types: any,
  abiFunc: any,
  config: any,
  isInput: boolean
): Promise<string> => {
  const inputsOrOutputs: any[] = isInput ? abiFunc.inputs : abiFunc.outputs;
  const mappedFunctions: string = inputsOrOutputs.reduce((str, curr, index) => {
    mapType(curr.type, types);
    const userSuppliedMappingExists: boolean =
      config && config[abiFunc.name] && config[abiFunc.name][index];
    const name: TemplateStringsArray =
      curr.name || userSuppliedMappingExists || `${index}`;
    const endOfLine = (index === inputsOrOutputs.length - 1) ? '' : ', ';
    const mappingContents = `${name}: ${curr.type}${endOfLine}`;
    return (str += mappingContents);
  }, '');
  return mappedFunctions;
};

const mapType = async (type: string, allTypes: any) => {
  type = type.split('[]')[0];
  if (type === 'string') {
    return;
  }
  const isArray = type.split('[]');
  const isBool = type.startsWith('bool');

  const strFactory = isBool ? 'boolean' : 'any';
  if (!allTypes[type]) {
    allTypes[type] = strFactory;
  }
};
