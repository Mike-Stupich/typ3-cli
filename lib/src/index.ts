import { options, usage } from './cli';
import { Output } from './io';
import { join, sep, basename } from 'path';
import { getMapping, getMappings, Types, interfaces } from './builder';

export const buildTypedABIs = () => {
  const opts = options;
  const files = opts.files;
  const types = new Types();
  const outputDir = opts.outputDir ? opts.outputDir : './abiTypes.ts';

  if (!files || opts.help) {
    return console.log(usage);
  }

  const printer = new Output(outputDir);

  files.map(file => {
    typedABI(file, printer, types);
  });
  printer.print(interfaces);
  Object.keys(types.getTypes()).forEach((curr, index) => {
    printer.print(`type ${curr} = ${types.getTypes()[curr]}`);
  });
};

const typedABI = (file: string, printer: Output, types: Types) => {
  const fileDir = file.split(sep);
  const rootPath = process.cwd();
  const fileName = basename(fileDir[fileDir.length - 1]).split('.')[0];
  const filePath = join(rootPath, file);
  printer.print(
    `export interface I${fileName[0].toUpperCase()}${fileName.length > 1
      ? fileName.slice(1)
      : ''} {`
  );
  const inputMappings = getMapping({ filePath, inOut: 'input' });
  const outputMappings = getMapping({ filePath, inOut: 'output' });
  require(filePath).map((abiFunc, index) => {
    if (abiFunc.type !== 'function') {
      return;
    }
    const inputs = getMappings({
      types,
      abiFunc,
      config: inputMappings,
      isInput: true
    });
    const outputs = getMappings({
      types,
      abiFunc,
      config: outputMappings,
      isInput: false
    });

    const ABIParamlessSend = `ABIFuncParamlessSend`;
    const ABIFuncSend = `ABIFuncSend<{${inputs}}>`;
    const ABIParamlessCall = `ABIFuncParamlessCall${outputs.length === 0
      ? ''
      : `<{${outputs}}>`}`;
    const ABIFuncCall = `ABIFuncCall<{${inputs}}${outputs.length === 0
      ? ''
      : `,{${outputs}}`}>`;
    const isConst = abiFunc.constant;
    const param = isConst ? ABIFuncCall : ABIFuncSend;
    const paramless = isConst ? ABIParamlessCall : ABIParamlessSend;
    printer.print(
      `${abiFunc.name}: ${inputs === '' ? `${paramless}` : `${param}`}`
    );
  });
  printer.print('}');
};
