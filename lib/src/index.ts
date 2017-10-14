import { options, usage } from './cli'
import { Output } from './io'
import { getInputs, getOutputs, getMapping, Types, interfaces } from './builder'

export const buildTypedABIs = () => {
    const opts = options
    const files = opts.files
    const types = new Types()
    const outputDir = opts.outputDir
    ? opts.outputDir
    : './output.d.ts'

    if (!files || opts.help) {
        return console.log(usage);
    }

    const printer = new Output(outputDir)

    files.map((file) => {
        typedABI(file, printer, types)
    })
    printer.print(interfaces)
    Object.keys(types.getTypes()).forEach((curr, index) => {
        printer.print(`type ${curr} = ${types.getTypes()[curr]}`)
    })
}

const typedABI = (file: string, printer: Output, types: Types) => {
    const fileDir = file.split('/');
    const rootPath = process.cwd()
    const fileName = fileDir[fileDir.length - 1].split('.')[0];
    const filePath = `${rootPath}\\${file}`

    printer.print(`export default interface ${fileName} {`)
<<<<<<< HEAD
    require(filePath).map((abiFunc) => {
=======
    require(file).map((abiFunc) => {

>>>>>>> f8ed10b658983649b2c83be143e86086ca8c68a4
        if (abiFunc.type !== 'function') {
            return
        }
        const inputs = getInputs({
            types,
            abiFunc,
            config: getMapping({ filePath, inOut: 'input', funcName: abiFunc })
        })
        const outputs = getOutputs({
            types,
            abiFunc,
            config: getMapping({ filePath, inOut: 'output', funcName: abiFunc })
        })

        const ABIParamless = `ABIFuncParamless${outputs.length === 0
            ? ''
            : `<{${outputs}}>`}`
        const ABIFunc = `ABIFunc<{${inputs}}${outputs.length === 0
            ? ''
            : `,{${outputs}}`}>`
        printer.print(`${abiFunc.name}: ${inputs === '' ? `${ABIParamless}` : `${ABIFunc}`}`)
    })
    printer.print('}')
}

