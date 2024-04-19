import { useEffect, useState } from 'react';
import Heading from './heading';
import Input from './input';
import Options from './options';

import { Button } from '@/components/ui/button';
import { generateRandomPassword } from '@/lib/generte-password';
import { toast } from '@/components/ui/use-toast';
import AuthModel from '../models/auth-model';

const Main = () => {
    const [length, setLength] = useState<number>(12);
    const [user, setUser] = useState(null);
    const [checkboxStates, setCheckboxStates] = useState<{ [key: string]: boolean }>({
        uppercase: true,
        lowercase: true,
        number: true,
        symbols: true,
    });
    const [password, setPassword] = useState(generateRandomPassword(12, true, true, true, true));

    const handleLengthChange = (newLength: number) => {
        setLength(newLength);
    };

    const handleCheckboxChange = (value: string) => {
        const isLastTrueCheckbox =
            Object.values(checkboxStates).filter((state) => state).length === 1 && checkboxStates[value];

        if (isLastTrueCheckbox) {
            return;
        }

        setCheckboxStates({
            ...checkboxStates,
            [value]: !checkboxStates[value],
        });
    };

    useEffect(() => {
        const newPassword = generateRandomPassword(
            length,
            checkboxStates.uppercase,
            checkboxStates.lowercase,
            checkboxStates.number,
            checkboxStates.symbols
        );
        setPassword(newPassword);
    }, [checkboxStates, length]);

    const handleGenerate = () => {
        const newPassword = generateRandomPassword(
            length,
            checkboxStates.uppercase,
            checkboxStates.lowercase,
            checkboxStates.number,
            checkboxStates.symbols
        );
        setPassword(newPassword);
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(password);
            toast({
                description: 'Copied to clipboard!',
            });
        } catch (err) {
            toast({
                title: 'Failed to copy',
                description: 'Failed to copy to clipboard' + err,
            });
        }
    };

    return (
        <div className='w-full h-full flex justify-center items-center bg-secondary'>
            <div className='sm:w-[50%] w-[80%] h-full flex flex-col items-center justify-center gap-5'>
                {/* Heading */}
                <Heading />

                {/* Input */}
                <Input
                    copyToClipboard={copyToClipboard}
                    handleGenerate={handleGenerate}
                    setPassword={setPassword}
                    password={password}
                />

                {/* Options */}
                <Options
                    length={length}
                    setLength={setLength}
                    checkboxStates={checkboxStates}
                    handleCheckboxChange={handleCheckboxChange}
                    handleLengthChange={handleLengthChange}
                />

                {/* Button */}
                {user ? <Button className='w-full rounded-full'>Save password</Button> : <AuthModel />}
            </div>
        </div>
    );
};

export default Main;
