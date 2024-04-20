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
import { BASE_URL } from '@/constants';
import { toast } from '../ui/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '@/redux/userSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const dispatch = useDispatch();

    const user = useSelector((state: any) => state.user);
    const handleLogOut = async () => {
        try {
            await axios.post(`${BASE_URL}/users/signout`);

            toast({
                description: 'Logged out.',
            });

            dispatch(clearUser());
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
                    {user && (
                        <Avatar>
                            <AvatarImage src='#' alt='@shadcn' />
                            <AvatarFallback className='bg-primary text-white font-medium'>
                                {user?.displayName[0]}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to={'/saved'}>
                        <DropdownMenuItem>Saved Passwords</DropdownMenuItem>
                    </Link>
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
