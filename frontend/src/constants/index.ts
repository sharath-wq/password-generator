import axios from 'axios';

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

const BASE_URL = 'http://localhost:3000/api';

const axiosJWT = axios.create();
axiosJWT.defaults.withCredentials = true;

export { options, BASE_URL, axiosJWT };
