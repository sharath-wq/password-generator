import { Progress } from '@/components/ui/progress';
import { Copy, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InputProps {
    password: string;
    setPassword: any;
    handleGenerate: () => void;
    copyToClipboard: any;
}

const Input = ({ copyToClipboard, password, setPassword, handleGenerate }: InputProps) => {
    const progress =
        password.length < 3 ? 0 : password.length < 6 ? 25 : password.length < 9 ? 50 : password.length < 12 ? 75 : 100;

    return (
        <div className='w-full shadow-2xl'>
            <div className='grid grid-cols-2 w-full gap-3 justify-between rounded-t-xl bg-white h-20 items-center p-2 pl-8'>
                <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type='text'
                    className='col-span-1 place-content-start outline-none text-xl sm:text-2xl font-bold dark:text-black'
                />
                <div className='flex col-span-1  place-content-end'>
                    <Button
                        onClick={copyToClipboard}
                        size={'icon'}
                        variant={'secondary'}
                        className='bg-transparent hover:bg-transparent dark:text-black'
                    >
                        <Copy />
                    </Button>
                    <Button
                        onClick={handleGenerate}
                        size={'icon'}
                        variant={'secondary'}
                        className='bg-transparent hover:bg-transparent dark:text-black'
                    >
                        <RefreshCcw />
                    </Button>
                </div>
            </div>
            <div>
                <Progress value={progress} />
            </div>
        </div>
    );
};

export default Input;
