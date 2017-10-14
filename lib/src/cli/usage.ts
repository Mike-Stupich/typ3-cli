import * as getUsage from 'command-line-usage';

const sections = [
    {
      header: 'cli for typ3',
      content: 'Generate a type definition file for ABI\'s.'
    },
    {
      header: 'Options',
      optionList: [
        {
          name: 'f',
          typeLabel: '[underline]{file}',
          description: 'The ABI to process.'
        },
        {
            name: 'o',
            typeLabel: '[underline]{output}',
            description: 'Destination of type definition file'
        },
        {
          name: 'h',
          description: 'Print this usage guide.'
        }
      ]
    }
];

export const usage = getUsage(sections);
