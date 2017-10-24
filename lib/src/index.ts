import { basename, join, sep } from 'path';
import {
  getMappings,
  interfaces,
  openCustomOutputFile,
  openFile,
  printToFile
} from './builder';
import { options, usage } from './cli';

interface IFilesWithOutput {
  output?: string;
  files: [{
    file: string,
    output: string
  }] | string[];
}

export const buildTypedABIs = async () => {
  const opts: any = options;
  const files: string[] = opts.files;
  const outputDirs: string[] = opts.output ? opts.output : ['./abiTypes.ts'];
  if (!files || opts.help) {
    return console.log(usage);
  }
  const filesWithOutput = await determineFileOutput(files, outputDirs);
  filesWithOutput.output ? buildWithSingleOutput(filesWithOutput) : buildWithMultipleOutputs(filesWithOutput);
};

const buildWithMultipleOutputs = async (filesWithMultiOutputs: IFilesWithOutput) => {
  const { files } = filesWithMultiOutputs;
  const types: any = {};
  await Promise.all((files as any[]).map(async (fileWithOutput) => {
    const { file, output } = fileWithOutput;
    const print = (text: string) => printToFile(text, output!);
    await openFile(output!);
    print(await typedABI(file, types));
    print(await typedABIConnected(file, types));
    print(interfaces);
    Object.keys(types).map((curr, index) => {
      print(`type ${curr} = ${types[curr]};`);
    });
  }));
};

const buildWithSingleOutput = async (filesWithSingleOutput: IFilesWithOutput) => {
  const { files, output } = filesWithSingleOutput;
  const types: any = {};
  const print = (text: string) => printToFile(text, output!);
  await openFile(output!);
  await Promise.all((files as string[]).map(async (file) => {
    print(await typedABI(file, types));
    print(await typedABIConnected(file, types));
  }));
  print(interfaces);
  Object.keys(types).map((curr, index) => {
    print(`type ${curr} = ${types[curr]};`);
  });
};

const determineFileOutput = async (files: string[], outputs: string[]): Promise<IFilesWithOutput> => {
  const numFiles = files.length;
  const numOutputs = outputs.length;
  if (numFiles === numOutputs) {
    const arr: any = [];
    files.map((file, index) => {
      arr.push({ file, output: outputs[index] });
    });
    return { files: arr };
  } else {
    return { output: outputs[0], files };
  }
};

const typedABI = async (file: string, types: any): Promise<string> => {
  const fileDir = file.split(sep);
  const rootPath = process.cwd();
  const fileName = basename(fileDir[fileDir.length - 1]).split('.')[0];
  const filePath = join(rootPath, file);
  let str = '';
  str += `export interface I${fileName[0].toUpperCase()}${fileName.length > 1
    ? fileName.slice(1)
    : ''} {\n`;
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
    str += `${abiFunc.name}: ${inputs === '' ? `${paramless};` : `${param};`}\n`;
  }));
  str += '}\n';
  return str;
};

const typedABIConnected = async (file: string, types: any): Promise<string> => {
  const fileDir = file.split(sep);
  const rootPath = process.cwd();
  const fileName = basename(fileDir[fileDir.length - 1]).split('.')[0];
  const filePath = join(rootPath, file);
  let str = '';
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
    str += `${abiFunc.name}: ${inputs === '' ? `${paramless};` : `${param};`}\n`;
  }));
  str += '}\n';
  return str;
};
