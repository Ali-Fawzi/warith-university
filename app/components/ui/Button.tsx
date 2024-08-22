import {forwardRef} from 'react';
import {Link} from '@remix-run/react';
import clsx from 'clsx';

import {missingClass} from '~/lib/utils';

export const Button = forwardRef(
    (
        {
            as = 'button',
            className = '',
            variant = 'primary',
            width = 'auto',
            baseButtonClasses = 'inline-block rounded-sm font-semibold text-center py-1.5 px-3',
            ...props
        }: {
            as?: React.ElementType;
            className?: string;
            baseButtonClasses?: string;
            variant?: 'primary' | 'secondary' | 'inline';
            width?: 'auto' | 'full';
            [key: string]: any;
        },
        ref,
    ) => {
        const Component = props?.to ? Link : as;

        const variants = {
            primary: `${baseButtonClasses} bg-dark text-white hover:bg-dark/90 ease-in-out transform transition duration-500 select-none`,
            secondary: `${baseButtonClasses} bg-white text-black hover:bg-dark hover:text-white ease-in-out transform transition duration-500 select-none`,
            inline: 'border-b border-primary/10 leading-none pb-1',
        };

        const widths = {
            auto: 'w-auto',
            full: 'w-full',
        };

        const styles = clsx(
            missingClass(className, 'bg-') && variants[variant],
            missingClass(className, 'w-') && widths[width],
            className,
        );

        return (
            <Component
                className={styles}
                {...props}
                ref={ref}
            />
        );
    },
);
