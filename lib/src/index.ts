import { basename, join, sep } from 'path';
import {
  getMappings,
  interfaces,
  openCustomOutputFile,
  openFile,
  printToFile
} from './builder';
import { options, usage } from './cli';

export const buildTypedABIs = async () => {
  const opts: any = options;
  const files: string[] = opts.files;
  const types: any = {};
  const outputDir: string = opts.outputDir ? opts.outputDir : './abiTypes.ts';
  const print = (text: string) => printToFile(text, outputDir)
  await openFile(outputDir);

  if (!files || opts.help) {
    return console.log(usage);
  }

  await Promise.all(files.map(async (file) => {
    print(await typedABI(file, types));
    print(await typedABIConnected(file, types));
  }));
  print(interfaces);
  Object.keys(types).map((curr, index) => {
    print(`type ${curr} = ${types[curr]};`);
  });
};

const typedABI = async (file: string, types: any): Promise<string> => {
  const fileDir = file.split(sep);
  const rootPath = process.cwd();
  const fileName = basename(fileDir[fileDir.length - 1]).split('.')[0];
  const filePath = join(rootPath, file);
  let str: string = '';
  str += `export interface I${fileName[0].toUpperCase()}${fileName.length > 1
    ? fileName.slice(1)
    : ''} {\n`
  const outputMappings = await openCustomOutputFile(filePath);
  await Promise.all(require(filePath).map(async (abiFunc: any, index: number) => {
    if (abiFunc.type !== 'function') {
      return;
    }
    const inputs = await getMappings(
      types,
      abiFunc,
      '',
      true,
    );
    const outputs = await getMappings(
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
    str += `${abiFunc.name}: ${inputs === '' ? `${paramless};` : `${param};`}\n`
  }));
  str += '}\n';
  return str;
};

const typedABIConnected = async (file: string, types: any): Promise<string> => {
  const fileDir = file.split(sep);
  const rootPath = process.cwd();
  const fileName = basename(fileDir[fileDir.length - 1]).split('.')[0];
  const filePath = join(rootPath, file);
  let str: string = '';
  str +=
    `export interface I${fileName[0].toUpperCase()}${fileName.length > 1
      ? fileName.slice(1)
      : ''}Connected {\n`;
  const outputMappings = await openCustomOutputFile(filePath);
  await Promise.all(require(filePath).map(async (abiFunc: any, index: number) => {
    if (abiFunc.type !== 'function') {
      return;
    }
    const inputs = await getMappings(
      types,
      abiFunc,
      '',
      true
    );
    const outputs = await getMappings(
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
    str += `${abiFunc.name}: ${inputs === '' ? `${paramless};` : `${param};`}\n`
  }));
  str += '}\n';
  return str;
};
