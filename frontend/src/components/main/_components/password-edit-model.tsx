import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { BASE_URL } from '@/constants';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
    name: z.string().min(2).max(20),
    password: z.string().min(8),
});

interface PasswordEditModelProps {
    id: string;
    name: string;
    password: string;
}

const PasswordEditModel = ({ id, name, password }: PasswordEditModelProps) => {
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: name,
            password: password,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await axios.put(`${BASE_URL}/password/update/${id}`, values);

            navigate(0);

            toast({
                description: 'Password updated successful',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.' + error,
            });
        }
    }

    const { isSubmitting, isValid } = form.formState;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='ghost' size={'sm'} className='w-full'>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Edit Password</DialogTitle>
                    <DialogDescription>
                        Make changes to your passwrod name and password here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder='password' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={!isValid || isSubmitting} type='submit'>
                            Submit
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default PasswordEditModel;
