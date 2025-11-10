import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

/**
 * Theme System - Context API
 * 
 * Este módulo implementa o sistema de temas da aplicação usando React Context API.
 * Suporta temas claro (light) e escuro (dark) com persistência via localStorage.
 * 
 * @module ThemeContext
 */

/**
 * Tipo que define os temas disponíveis na aplicação
 * @typedef {'light' | 'dark'} Theme
 */
type Theme = 'light' | 'dark';

/**
 * Interface do contexto de tema
 * @interface ThemeContextType
 * @property {Theme} theme - Tema atual ('light' ou 'dark')
 * @property {() => void} toggleTheme - Função para alternar entre temas
 */
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

/**
 * Contexto React para gerenciamento de tema
 * @type {React.Context<ThemeContextType | undefined>}
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider Component
 * 
 * Provedor de contexto que gerencia o estado do tema da aplicação.
 * Deve envolver toda a aplicação para fornecer acesso ao tema em qualquer componente.
 * 
 * Funcionalidades:
 * - Inicializa com tema 'light' como padrão
 * - Carrega preferência salva do localStorage na inicialização
 * - Persiste mudanças de tema no localStorage automaticamente
 * - Aplica classes CSS no elemento root do documento
 * - Trata erros de localStorage graciosamente
 * 
 * @component
 * @param {Object} props - Props do componente
 * @param {ReactNode} props.children - Componentes filhos que terão acesso ao contexto
 * 
 * @example
 * // Uso básico no root da aplicação
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    /**
     * Estado do tema com inicialização lazy
     * Tenta carregar do localStorage, caso contrário usa 'light' como padrão
     */
    const [theme, setTheme] = useState<Theme>(() => {
        try {
            // Verifica se há um tema salvo no localStorage
            const savedTheme = localStorage.getItem('theme') as Theme | null;
            // Valida se o tema é válido, caso contrário usa 'light' como padrão
            if (savedTheme === 'light' || savedTheme === 'dark') {
                return savedTheme;
            }
            return 'light';
        } catch (error) {
            // Se localStorage não estiver disponível, usa 'light' como padrão
            console.warn('localStorage not available, using default light theme');
            return 'light';
        }
    });

    /**
     * Efeito que sincroniza o tema com o DOM e localStorage
     * Executado sempre que o tema muda
     */
    useEffect(() => {
        const root = window.document.documentElement;
        // Remove ambas as classes para evitar conflitos
        root.classList.remove('light', 'dark');
        // Adiciona a classe do tema atual ao elemento root
        // Isso ativa as classes dark: do Tailwind CSS
        root.classList.add(theme);
        
        // Salva o tema no localStorage para persistência entre sessões
        try {
            localStorage.setItem('theme', theme);
        } catch (error) {
            console.warn('Failed to save theme preference to localStorage');
        }
    }, [theme]);

    /**
     * Função para alternar entre temas
     * Alterna de 'light' para 'dark' e vice-versa
     */
    const toggleTheme = () => setTheme((prevTheme: Theme) => (prevTheme === 'light' ? 'dark' : 'light'));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * Hook customizado para acessar o contexto de tema
 * 
 * Fornece acesso ao tema atual e à função de alternância.
 * Deve ser usado apenas dentro de componentes que estão dentro do ThemeProvider.
 * 
 * @throws {Error} Se usado fora do ThemeProvider
 * @returns {ThemeContextType} Objeto contendo theme e toggleTheme
 * 
 * @example
 * // Uso em um componente
 * function MyComponent() {
 *   const { theme, toggleTheme } = useTheme();
 *   
 *   return (
 *     <div className="bg-white dark:bg-slate-800">
 *       <p>Tema atual: {theme}</p>
 *       <button onClick={toggleTheme}>Alternar Tema</button>
 *     </div>
 *   );
 * }
 */
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
