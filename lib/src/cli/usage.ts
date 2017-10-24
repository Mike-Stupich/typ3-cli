import * as getUsage from 'command-line-usage';

const sections = [
    {
      header: 'typ3-cli',
      content: 'Generate a type definition file for Ethereum ABI\'s.'
    },
    {
      header: 'Options',
      optionList: [
        {
          name: 'files',
          alias: 'f',
          typeLabel: 'files...',
          description: 'The ABI files to process.',
          multiple: true
        },
        {
            name: 'output',
            alias: 'o',
            typeLabel: 'outputFiles...',
            description: 'Destinations of type definition file. Can be either 1 file for all,\
             or one output file for each input file.',
            multiple: true
        },
        {
          name: 'help',
          alias: 'h',
          description: 'Print this usage guide.'
        }
      ]
    }
];

export const usage = getUsage(sections);
