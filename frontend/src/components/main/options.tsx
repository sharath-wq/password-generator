import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { options } from '@/constants';

interface OptionsProps {
    checkboxStates: {
        [key: string]: boolean;
    };
    handleLengthChange: any;
    handleCheckboxChange: any;
    length: number;
    setLength: any;
}

const Options = ({ length, handleCheckboxChange, handleLengthChange, checkboxStates }: OptionsProps) => {
    return (
        <div className='w-full shadow-2xl'>
            <div className='flex gap-3 justify-between rounded-xl bg-white items-center p-5 h-60 flex-col'>
                {/* top */}
                <div className='h-1/6 w-[90%] flex flex-col items-center justify-end gap-2'>
                    <h3 className='text-xl dark:text-black'>Customize your password</h3>
                    <Separator />
                </div>
                {/* bottom */}
                <div className='mt-2 h-5/6 w-[90%]'>
                    <div className='w-full flex gap-2 mt-2'>
                        <input
                            className='w-14 p-2 border flex justify-center items-center font-bold outline-none dark:text-black'
                            value={length}
                            onChange={(e) => handleLengthChange(parseInt(e.target.value) || 0)}
                            type='number'
                        />
                        <Slider
                            onValueChange={(newValue) => handleLengthChange(newValue[0])}
                            defaultValue={[length]}
                            max={50}
                            value={[length]}
                            step={1}
                        />
                    </div>
                    <div className='mt-5 grid gap-5 md:grid-cols-4 grid-cols-2'>
                        {options.map((item) => (
                            <div key={item.label} className='flex items-center space-x-2 space-y-2'>
                                <Checkbox
                                    value={item.value}
                                    id={item.value}
                                    checked={checkboxStates[item.value]}
                                    onCheckedChange={() => handleCheckboxChange(item.value)}
                                />
                                <label
                                    htmlFor={item.value}
                                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-black'
                                >
                                    {item.label}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Options;
