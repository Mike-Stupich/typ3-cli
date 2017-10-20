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
          typeLabel: 'files, ...',
          description: 'The ABI files to process.',
          multiple: true
        },
        {
            name: 'output',
            alias: 'o',
            typeLabel: 'outputFile',
            description: 'Destination of type definition file'
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
