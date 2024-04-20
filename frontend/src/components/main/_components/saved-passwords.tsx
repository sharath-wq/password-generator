import DataTableDemo from './data-table';

export type Password = {
    id: string;
    name: string;
    password: string;
};

const data: Password[] = [
    {
        id: '1',
        name: 'Example1',
        password: 'P@ssw0rd1',
    },
    {
        id: '2',
        name: 'Example2',
        password: 'SecurePass123',
    },
    {
        id: '3',
        name: 'Example3',
        password: 'Secret123!',
    },
    {
        id: '4',
        name: 'Example4',
        password: 'StrongPassword#1',
    },
    {
        id: '5',
        name: 'Example5',
        password: 'SafeAndSecure',
    },
    {
        id: '6',
        name: 'Example6',
        password: 'Pa$$w0rd!23',
    },
    {
        id: '7',
        name: 'Example7',
        password: 'MyP@ssw0rd',
    },
    {
        id: '8',
        name: 'Example8',
        password: 'P@55w0rd',
    },
    {
        id: '9',
        name: 'Example9',
        password: 'S3cur3P@ss',
    },
    {
        id: '10',
        name: 'Example10',
        password: 'P@ssw0rd!123',
    },
];

export { data };

const SavedPasswords = () => {
    return (
        <div className='w-full h-full flex justify-center items-center bg-secondary'>
            <div className='sm:w-[60%] w-[100%] h-full flex flex-col items-center justify-center gap-5 '>
                <DataTableDemo />
            </div>
        </div>
    );
};

export default SavedPasswords;
