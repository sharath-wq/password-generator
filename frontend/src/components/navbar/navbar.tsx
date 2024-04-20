import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { BASE_URL, axiosJWT } from '@/constants';
import { toast } from '../ui/use-toast';

const Navbar = () => {
    const handleLogOut = async () => {
        try {
            const response = await axiosJWT.post(`${BASE_URL}/users/signout`);

            console.log(response);

            toast({
                description: 'Logged out.',
            });
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem with your request.' + error,
            });
        }
    };

    return (
        <div className='flex justify-end p-4 border-b shadow-2xl gap-3'>
            <ModeToggle />

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src='#' alt='@shadcn' />
                        <AvatarFallback className='bg-primary text-white font-medium'>S</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Saved Passwords</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut className='mr-2 h-4 w-4' />
                        <span onClick={handleLogOut}>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default Navbar;
