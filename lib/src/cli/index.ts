import * as commandLineArgs from 'command-line-args'
import { optionDefinitions } from './options'
export { usage } from './usage'

export const options = commandLineArgs(optionDefinitions)
