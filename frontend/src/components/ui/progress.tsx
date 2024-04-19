'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/lib/utils';

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        className={cn('relative h-4 w-full overflow-hidden bg-secondary', className)}
        {...props}
    >
        <ProgressPrimitive.Indicator
            className={`h-full w-full flex-1 transition-all ${
                value === 25
                    ? 'bg-red-600'
                    : value === 50
                    ? 'bg-orange-600'
                    : value === 75
                    ? 'bg-yellow-500'
                    : 'bg-green-600'
            }`}
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
