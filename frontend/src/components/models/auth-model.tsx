import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignIn from './_components/sign-in';
import SignUp from './_components/sign-up';

const AuthModel = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='w-full rounded-full'>Save password</Button>
            </DialogTrigger>
            <DialogContent className='flex justify-center w-full '>
                <Tabs defaultValue='signin' className='w-[400px]'>
                    <TabsList className='grid w-full grid-cols-2'>
                        <TabsTrigger value='signin'>Sign In</TabsTrigger>
                        <TabsTrigger value='signup'>Sign Up</TabsTrigger>
                    </TabsList>
                    <SignIn />
                    <SignUp />
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default AuthModel;
