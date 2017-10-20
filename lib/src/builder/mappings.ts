import { open } from 'fs';
import * as path from 'path';
import { Types } from "./types";
export const openCustomOutputFile = (async (filePath: string): Promise<boolean> => {
  const resolvedPath = path.resolve(filePath).split('.')[0];
  const file = `${resolvedPath}.output.ts`;
  open(file, 'r+', (err, fd) => {
    if (err) {
      return false;
    }
  });
  return true;
});

export const getMappings = (
  types: Types,
  abiFunc: any,
  config: any,
  isInput: boolean
  ): string => {
  const inputsOrOutputs: any[] = isInput ? abiFunc.inputs : abiFunc.outputs;
  const mappedFunctions: string = inputsOrOutputs.reduce((str, curr, index) => {
    types.mapType(curr.type);
    const userSuppliedMappingExists: boolean =
      config && config[abiFunc.name] && config[abiFunc.name][index];
    const name: TemplateStringsArray =
      curr.name || userSuppliedMappingExists || `${index}`;
    return (str += `${name}: ${curr.type}${index === inputsOrOutputs.length - 1
      ? ''
      : ', '}`);
  }, '');
  return mappedFunctions;
};
