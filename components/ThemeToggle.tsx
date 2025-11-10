/**
 * ThemeToggle Component
 * 
 * Botão de alternância de tema que permite ao usuário alternar entre temas claro e escuro.
 * 
 * Características:
 * - Exibe ícone de lua (Moon) quando o tema claro está ativo
 * - Exibe ícone de sol (Sun) quando o tema escuro está ativo
 * - Feedback visual no hover com transição suave
 * - Acessível com aria-label apropriado
 * - Estilização responsiva aos temas usando classes dark: do Tailwind
 * 
 * @module ThemeToggle
 * @component
 * 
 * @example
 * // Uso básico no header da aplicação
 * <header>
 *   <nav>
 *     <ThemeToggle />
 *   </nav>
 * </header>
 */

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

/**
 * Componente de botão para alternar entre temas
 * 
 * @returns {JSX.Element} Botão de alternância de tema
 */
const ThemeToggle: React.FC = () => {
    // Obtém o tema atual e a função de alternância do contexto
    const { theme, toggleTheme } = useTheme();
    
    return (
        <button 
            onClick={toggleTheme} 
            // Classes Tailwind com suporte a tema escuro:
            // - bg-slate-200 dark:bg-slate-700: Fundo claro/escuro
            // - text-gray-800 dark:text-gray-100: Cor do texto
            // - hover:bg-slate-300 dark:hover:bg-slate-600: Estado hover
            // - transition-colors duration-300: Transição suave de 300ms
            className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-gray-100 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors duration-300" 
            aria-label="Toggle theme"
        >
            {/* Exibe lua no tema claro (indica que pode mudar para escuro) */}
            {/* Exibe sol no tema escuro (indica que pode mudar para claro) */}
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
    );
};

export default ThemeToggle;
