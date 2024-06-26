import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import { BASE_URL } from '@/constants';

const formSchema = z.object({
    name: z.string().trim().min(2).max(20),
    password: z.string().trim().min(8),
});

interface SavePasswordModelProps {
    password: string;
}

const SavePasswordModel = ({ password }: SavePasswordModelProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            password: password,
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            axios.defaults.withCredentials = true;
            await axios.post(`${BASE_URL}/password/save`, values);

            toast({
                description: 'Password saved successful',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.' + error,
            });
        }
    }

    useEffect(() => {
        form.setValue('password', password);
    }, [password]);

    const { isSubmitting } = form.formState;

    return (
        <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
                <DialogTitle>Save Password</DialogTitle>
                <DialogDescription>Add name to your password. Click save when you're done.</DialogDescription>
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
                    <Button disabled={isSubmitting} type='submit'>
                        Submit
                    </Button>
                </form>
            </Form>
        </DialogContent>
    );
};

export default SavePasswordModel;
