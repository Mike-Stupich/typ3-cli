import { options } from './cli'
import { Output } from './io'
import { getInputs, getOutputs, Types, interfaces } from './builder'

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
    
}
