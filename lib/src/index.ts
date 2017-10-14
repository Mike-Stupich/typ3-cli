import { options } from './cli'
import { Output } from './io'
import { getInputs, getOutputs, getMapping, Types, interfaces } from './builder'

export const buildTypedABIs = () => {
    const opts = options
    const files = opts.files
    const outputDir = opts.outputDir
    ? opts.outputDir
    : './'
    files.map((file) => {
        typedABI(file, outputDir)
    })
}


const typedABI = (file: string, outputDir: string) => {
    const printer = new Output(outputDir)
    const types = new Types()
    const fileDir = file.split('/');
    const fileName = fileDir[fileDir.length - 1].split('.')[0];

    printer.print(`export default interface ${fileName} {`)
    require(file).map((abiFunc) => {
        if (abiFunc.type !== 'function') {
            return
        }
        const inputs = getInputs({
            types,
            abiFunc,
            config: getMapping({ fileName, inOut: 'input', funcName: abiFunc })
        })
        const outputs = getOutputs({
            types,
            abiFunc,
            config: getMapping({ fileName, inOut: 'output', funcName: abiFunc })
        })

        const ABIParamless = `ABIFuncParamless${outputs.length === 0
            ? ''
            : `<{${outputs}}>`}`
        const ABIFunc = `ABIFunc<${inputs}>${outputs.length === 0
            ? ''
            : `,<{${outputs}}`}>`
    })
    printer.print('}')
    printer.print(interfaces)

    Object.keys(types.getTypes()).forEach((curr, index) => {
        printer.print(`type ${curr} = ${types.getTypes()[curr]}`)
    })
}
