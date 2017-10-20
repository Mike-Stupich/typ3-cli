import { basename, join, sep } from 'path';
import { getMappings, interfaces, openCustomOutputFile, Types } from './builder';
import { options, usage } from './cli';
import { Output } from './io';

export const buildTypedABIs = async () => {
  const opts: any = options;
  const files: string[] = opts.files;
  const types: Types = new Types();
  const outputDir: string = opts.outputDir ? opts.outputDir : './abiTypes.ts';

  if (!files || opts.help) {
    return console.log(usage);
  }

  const printer: Output = new Output(outputDir);

  files.map(async (file) => {
    typedABI(file, printer, types);
    typedABIConnected(file, printer, types);
  });
  printer.print(interfaces);
  Object.keys(types.getTypes()).map((curr, index) => {
    printer.print(`type ${curr} = ${types.getTypes()[curr]};`);
  });
};

const typedABI = async (file: string, printer: Output, types: Types) => {
  const fileDir = file.split(sep);
  const rootPath = process.cwd();
  const fileName = basename(fileDir[fileDir.length - 1]).split('.')[0];
  const filePath = join(rootPath, file);
  printer.print(
    `export interface I${fileName[0].toUpperCase()}${fileName.length > 1
      ? fileName.slice(1)
      : ''} {`
  );
  const outputMappings = openCustomOutputFile(filePath);
  require(filePath).map(async (abiFunc: any, index: number) => {
    if (abiFunc.type !== 'function') {
      return;
    }
    const inputs = getMappings(
      types,
      abiFunc,
      '',
      true,
    );
    const outputs = getMappings(
      types,
      abiFunc,
      outputMappings,
      false
    );

    const ABIParamlessSend = `IABIFuncParamlessSend`;
    const ABIFuncSend = `IABIFuncSend<{${inputs}}>`;
    const ABIParamlessCall = `IABIFuncParamlessCall${outputs.length === 0
      ? ''
      : `<{${outputs}}>`}`;
    const ABIFuncCall = `IABIFuncCall<{${inputs}}${outputs.length === 0
      ? ''
      : `,{${outputs}}`}>`;
    const isConst = abiFunc.constant;
    const param = isConst ? ABIFuncCall : ABIFuncSend;
    const paramless = isConst ? ABIParamlessCall : ABIParamlessSend;
    printer.print(
      `${abiFunc.name}: ${inputs === '' ? `${paramless};` : `${param};`}`
    );
  });
  printer.print('}');
};

const typedABIConnected = async (file: string, printer: Output, types: Types) => {
  const fileDir = file.split(sep);
  const rootPath = process.cwd();
  const fileName = basename(fileDir[fileDir.length - 1]).split('.')[0];
  const filePath = join(rootPath, file);
  printer.print(
    `export interface I${fileName[0].toUpperCase()}${fileName.length > 1
      ? fileName.slice(1)
      : ''}Connected {`
  );
  const outputMappings = openCustomOutputFile(filePath);
  require(filePath).map(async (abiFunc:any, index:number) => {
    if (abiFunc.type !== 'function') {
      return;
    }
    const inputs = getMappings(
      types,
      abiFunc,
      '',
      true
    );
    const outputs = getMappings(
      types,
      abiFunc,
      outputMappings,
      false
    );

    const ABIParamlessSend = `ABIFuncParamlessSendConnected`;
    const ABIFuncSend = `ABIFuncSendConnected<{${inputs}}>`;
    const ABIParamlessCall = `ABIFuncParamlessCallConnected${outputs.length ===
    0
      ? ''
      : `<{${outputs}}>`}`;
    const ABIFuncCall = `ABIFuncCallConnected<{${inputs}}${outputs.length === 0
      ? ''
      : `,{${outputs}}`}>`;
    const isConst = abiFunc.constant;
    const param = isConst ? ABIFuncCall : ABIFuncSend;
    const paramless = isConst ? ABIParamlessCall : ABIParamlessSend;
    printer.print(
      `${abiFunc.name}: ${inputs === '' ? `${paramless};` : `${param};`}`
    );
  });
  printer.print('}');
};
