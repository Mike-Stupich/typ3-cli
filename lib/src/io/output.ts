import { appendFileSync, open, unlink } from 'fs';

export class Output {
    private outputFile: string;

    public constructor(filePath: string) {
        open(filePath, 'w', ((err,fd) => {
            if (err) {
                console.error(err);
            }
        }));
        this.outputFile = filePath;
    }

    public print = (text: string) => {
        appendFileSync(this.outputFile, `${text}\n`);
    }

    public getOutput = () => this.outputFile;
}
