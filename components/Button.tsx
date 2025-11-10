
import React from 'react';

interface ButtonProps {
    variant?: 'default' | 'outline';
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'default', onClick, className = '', children }) => {
    const baseClasses = "font-semibold py-1.5 sm:py-2 px-3 sm:px-4 rounded-lg transition-colors duration-300 text-xs sm:text-sm flex-1 sm:flex-none min-w-0";
    
    const variantClasses = variant === 'default' 
        ? 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 shadow-lg' 
        : 'bg-white/70 dark:bg-slate-700/70 border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-600 backdrop-blur-sm text-gray-800 dark:text-gray-100';

    return (
        <button onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
            {children}
        </button>
    );
};

export default Button;
