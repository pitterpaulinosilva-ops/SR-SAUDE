
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    const baseClasses = "w-full p-2 sm:p-3 pl-8 sm:pl-10 bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 backdrop-blur-sm text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400";
    
    return (
        <input ref={ref} {...props} className={`${baseClasses} ${className}`} />
    );
});

Input.displayName = 'Input';

export default Input;
