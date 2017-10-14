const getMappings = ({ types, abiFunc, config, input}) => {
    const abiInOut = input
    ? abiFunc.inputs
    : abiFunc.outputs

    const configInOut = input
    ? config.inputMappings
    : config.outputMappings

    const mappedFunctions = abiInOut.reduce((str, curr, index) => {
        types.mapType(curr.type)
        const name =
        (configInOut &&
            configInOut[abiFunc].name &&
            configInOut[abiFunc][index]) ||
        curr.name ||
        `${curr.type}_${index}`
        return (str += `${name}: ${curr.type}${index === abiInOut.length - 1
        ? ''
        : ', '}`)
    }, '')
    return mappedFunctions
}

export const getInputs = ({ types, abiFunc, config }) => {
    return getMappings({ types, abiFunc, config, input: true })
}

export const getOutputs = ({types, abiFunc, config }) => {
    return getMappings({ types, abiFunc, config, input: false })
}

export const getMapping = ({ fileName, inOut, funcName }) => {
    const mapping = require(`${fileName}.${inOut}.json`)
    ? require(`${fileName}.${inOut}.json`)
    : funcName
    return mapping
}
