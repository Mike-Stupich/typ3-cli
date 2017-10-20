export { getMappings, openCustomOutputFile } from './mappings';
export { interfaces } from './interfaces';
import { appendFileSync, open } from 'fs';

export const openFile = async (file: string) => {
    open(file, 'w', ((err, fd) => {
        if (err) {
            console.error(err);
        }
    }));
}

export const printToFile = (text: string, outputFile: string) => {
    appendFileSync(outputFile, `${text}\n`)
}
