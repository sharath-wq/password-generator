interface Option {
    label: string;
    value: string;
}

const options: Option[] = [
    {
        label: 'Uppercase',
        value: 'uppercase',
    },
    {
        label: 'Lowercase',
        value: 'lowercase',
    },
    {
        label: 'Numbers',
        value: 'number',
    },
    {
        label: 'Symbols',
        value: 'symbols',
    },
];

export { options };
