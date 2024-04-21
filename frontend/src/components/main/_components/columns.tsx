import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';

import { CaretSortIcon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Password } from './saved-passwords';
import { toast } from '@/components/ui/use-toast';
import PasswordEditModel from './password-edit-model';
import PasswordDeleteModel from './password-delete-model';

export const columns: ColumnDef<Password>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label='Select all'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label='Select row'
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'id',
        header: 'Id',
        cell: ({ row }) => <div className='capitalize'>{row.getValue('id')}</div>,
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Name
                    <CaretSortIcon className='ml-2 h-4 w-4' />
                </Button>
            );
        },
        cell: ({ row }) => <div className='lowercase'>{row.getValue('name')}</div>,
    },
    {
        accessorKey: 'password',
        header: ({ column }) => {
            return (
                <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                    Password
                    <CaretSortIcon className='ml-2 h-4 w-4' />
                </Button>
            );
        },
        cell: ({ row }) => <div className='lowercase'>{row.getValue('password')}</div>,
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <DotsHorizontalIcon className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                navigator.clipboard.writeText(payment.password);
                                toast({
                                    description: 'Copied to clipboard!',
                                });
                            }}
                            asChild
                        >
                            <Button variant='ghost' size={'sm'} className='w-full'>
                                Copy
                            </Button>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <PasswordEditModel {...payment} />
                        <PasswordDeleteModel {...payment} />
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
