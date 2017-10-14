import * as commandLineArgs from 'command-line-args'
import { optionDefinitions } from './options'

export const options = commandLineArgs(optionDefinitions)
