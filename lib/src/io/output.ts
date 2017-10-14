import { appendFileSync, unlinkSync, existsSync } from 'fs'

export class Output {
    private outputFile: string

    public constructor(filePath) {
        if (existsSync(filePath)) {
            unlinkSync(filePath)
        }
        this.outputFile = filePath
    }

    public print = (text) => {
        appendFileSync(this.outputFile, `${text}\n`)
    }

    public getOutput = () => this.outputFile
}
