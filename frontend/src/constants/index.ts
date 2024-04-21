const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

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

const BASE_URL = `${BACKEND_URL}/api`;

export { options, BASE_URL };
