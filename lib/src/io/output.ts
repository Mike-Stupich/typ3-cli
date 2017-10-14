import { appendFileSync } from 'fs'

export class Output {
    private outputFile: string

    public constructor(filePath) {
        this.outputFile = filePath
    }

    public print = (text) => {
        appendFileSync(this.outputFile, `text\n`)
    }

    public getOutput = () => this.outputFile
}
