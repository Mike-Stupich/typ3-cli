import * as getUsage from "command-line-usage";

const sections = [
    {
      header: 'cli for typ3',
      content: 'Generates something.'
    },
    {
      header: 'Options',
      optionList: [
        {
          name: 'f',
          typeLabel: '[underline]{file}',
          description: 'The json ABI input to process.'
        },
        {
            name: 'o',
            typeLabel: '[underline]{output file}',
            description: 'Where the output typing file should go'
        },
        {
          name: 'h',
          description: 'Print this usage guide.'
        }
      ]
    }
];

export const usage = getUsage(sections);
