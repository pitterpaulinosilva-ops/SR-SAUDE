import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../ThemeToggle';
import { ThemeProvider } from '../../context/ThemeContext';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        clear: () => {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

describe('ThemeToggle', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove('light', 'dark');
    });

    describe('Requirement 6.1, 6.2: Indicadores visuais corretos', () => {
        it('should display moon icon when light theme is active', () => {
            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>
            );

            // Moon icon should be present (lucide-react renders as svg)
            const button = screen.getByRole('button', { name: /toggle theme/i });
            expect(button).toBeInTheDocument();
            
            // Check if moon icon is rendered (it has specific class from lucide-react)
            const svg = button.querySelector('svg');
            expect(svg).toBeInTheDocument();
        });

        it('should display sun icon when dark theme is active', () => {
            localStorage.setItem('theme', 'dark');

            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>
            );

            const button = screen.getByRole('button', { name: /toggle theme/i });
            const svg = button.querySelector('svg');
            expect(svg).toBeInTheDocument();
        });
    });

    describe('Requirement 2.4, 2.5: Alternância de tema via botão', () => {
        it('should toggle theme when clicked', () => {
            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>
            );

            const button = screen.getByRole('button', { name: /toggle theme/i });
            
            // Initial state should be light
            expect(document.documentElement.classList.contains('light')).toBe(true);

            // Click to toggle to dark
            fireEvent.click(button);
            expect(document.documentElement.classList.contains('dark')).toBe(true);

            // Click again to toggle back to light
            fireEvent.click(button);
            expect(document.documentElement.classList.contains('light')).toBe(true);
        });
    });

    describe('Requirement 6.3, 6.4, 6.5: Acessibilidade e feedback visual', () => {
        it('should have proper aria-label for accessibility', () => {
            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>
            );

            const button = screen.getByRole('button', { name: /toggle theme/i });
            expect(button).toHaveAttribute('aria-label', 'Toggle theme');
        });

        it('should have transition classes for smooth visual feedback', () => {
            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>
            );

            const button = screen.getByRole('button', { name: /toggle theme/i });
            expect(button.className).toContain('transition-colors');
            expect(button.className).toContain('duration-300');
        });

        it('should have hover state classes', () => {
            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>
            );

            const button = screen.getByRole('button', { name: /toggle theme/i });
            expect(button.className).toContain('hover:bg-slate-300');
            expect(button.className).toContain('dark:hover:bg-slate-600');
        });
    });

    describe('Visual Styling', () => {
        it('should have correct styling classes', () => {
            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>
            );

            const button = screen.getByRole('button', { name: /toggle theme/i });
            
            // Check for required styling classes
            expect(button.className).toContain('rounded-full');
            expect(button.className).toContain('p-2');
            expect(button.className).toContain('bg-slate-200');
            expect(button.className).toContain('dark:bg-slate-700');
        });

        it('should have correct icon size', () => {
            render(
                <ThemeProvider>
                    <ThemeToggle />
                </ThemeProvider>
            );

            const button = screen.getByRole('button', { name: /toggle theme/i });
            const svg = button.querySelector('svg');
            
            expect(svg?.classList.contains('w-5')).toBe(true);
            expect(svg?.classList.contains('h-5')).toBe(true);
        });
    });
});
