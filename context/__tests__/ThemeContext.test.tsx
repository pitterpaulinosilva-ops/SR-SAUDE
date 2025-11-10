import { renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../ThemeContext';

// Mock localStorage
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
            store[key] = value.toString();
        },
        removeItem: (key: string) => {
            delete store[key];
        },
        clear: () => {
            store = {};
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});

describe('ThemeContext', () => {
    beforeEach(() => {
        localStorage.clear();
        document.documentElement.classList.remove('light', 'dark');
    });

    describe('Requirement 1.1, 1.2, 1.3: Inicialização com tema claro', () => {
        it('should initialize with light theme when no preference exists', () => {
            const { result } = renderHook(() => useTheme(), {
                wrapper: ThemeProvider
            });

            expect(result.current.theme).toBe('light');
            expect(document.documentElement.classList.contains('light')).toBe(true);
        });

        it('should apply light theme to document root on initialization', () => {
            renderHook(() => useTheme(), {
                wrapper: ThemeProvider
            });

            expect(document.documentElement.classList.contains('light')).toBe(true);
            expect(document.documentElement.classList.contains('dark')).toBe(false);
        });
    });

    describe('Requirement 2.1, 2.2: Alternância entre temas', () => {
        it('should toggle from light to dark theme', () => {
            const { result } = renderHook(() => useTheme(), {
                wrapper: ThemeProvider
            });

            act(() => {
                result.current.toggleTheme();
            });

            expect(result.current.theme).toBe('dark');
            expect(document.documentElement.classList.contains('dark')).toBe(true);
            expect(document.documentElement.classList.contains('light')).toBe(false);
        });

        it('should toggle from dark to light theme', () => {
            localStorage.setItem('theme', 'dark');
            
            const { result } = renderHook(() => useTheme(), {
                wrapper: ThemeProvider
            });

            act(() => {
                result.current.toggleTheme();
            });

            expect(result.current.theme).toBe('light');
            expect(document.documentElement.classList.contains('light')).toBe(true);
            expect(document.documentElement.classList.contains('dark')).toBe(false);
        });
    });

    describe('Requirement 3.2, 3.3: Persistência do tema', () => {
        it('should save theme preference to localStorage when toggling', () => {
            const { result } = renderHook(() => useTheme(), {
                wrapper: ThemeProvider
            });

            act(() => {
                result.current.toggleTheme();
            });

            expect(localStorage.getItem('theme')).toBe('dark');
        });

        it('should load saved theme preference from localStorage', () => {
            localStorage.setItem('theme', 'dark');

            const { result } = renderHook(() => useTheme(), {
                wrapper: ThemeProvider
            });

            expect(result.current.theme).toBe('dark');
            expect(document.documentElement.classList.contains('dark')).toBe(true);
        });

        it('should default to light theme if localStorage has invalid value', () => {
            localStorage.setItem('theme', 'invalid');

            const { result } = renderHook(() => useTheme(), {
                wrapper: ThemeProvider
            });

            expect(result.current.theme).toBe('light');
        });
    });

    describe('Requirement 4.1: Transições sem recarregamento', () => {
        it('should maintain state when toggling theme', () => {
            const { result } = renderHook(() => useTheme(), {
                wrapper: ThemeProvider
            });

            const initialTheme = result.current.theme;

            act(() => {
                result.current.toggleTheme();
            });

            // Verify theme changed without component unmounting
            expect(result.current.theme).not.toBe(initialTheme);
            expect(result.current.toggleTheme).toBeDefined();
        });
    });

    describe('Error Handling', () => {
        it('should handle localStorage errors gracefully', () => {
            const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
            
            // Mock localStorage to throw error
            const originalGetItem = Storage.prototype.getItem;
            Storage.prototype.getItem = jest.fn(() => {
                throw new Error('localStorage not available');
            });

            const { result } = renderHook(() => useTheme(), {
                wrapper: ThemeProvider
            });

            expect(result.current.theme).toBe('light');
            expect(consoleWarnSpy).toHaveBeenCalled();

            // Restore
            Storage.prototype.getItem = originalGetItem;
            consoleWarnSpy.mockRestore();
        });
    });

    describe('useTheme Hook', () => {
        it('should throw error when used outside ThemeProvider', () => {
            // Suppress console.error for this test
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

            expect(() => {
                renderHook(() => useTheme());
            }).toThrow('useTheme must be used within a ThemeProvider');

            consoleErrorSpy.mockRestore();
        });
    });
});
