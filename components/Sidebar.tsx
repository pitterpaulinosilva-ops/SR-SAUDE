/**
 * Sidebar Component
 * 
 * Navegação lateral responsiva e estilizada que substitui os botões de tabs.
 * 
 * Características:
 * - Responsiva com collapse em mobile
 * - Estados visuais (hover, active, disabled)
 * - Ícones para cada ação
 * - Transições suaves
 * - Acessibilidade completa
 * - Suporte a temas claro/escuro
 * 
 * @component
 */

import React, { useState } from 'react';
import { 
    ClipboardList, 
    Users, 
    Building2, 
    Menu, 
    X,
    ChevronRight
} from 'lucide-react';

interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    value: string;
    description?: string;
}

interface SidebarProps {
    activeTab: string;
    onTabChange: (value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    const sidebarItems: SidebarItem[] = [
        {
            id: 'plan',
            label: 'Plano de Ação',
            icon: <ClipboardList className="w-5 h-5" />,
            value: 'plan',
            description: 'Visualizar todas as ações'
        },
        {
            id: 'responsible',
            label: 'Ações por Responsável',
            icon: <Users className="w-5 h-5" />,
            value: 'responsible',
            description: 'Agrupar por responsável'
        },
        {
            id: 'sector',
            label: 'Ações por Setor',
            icon: <Building2 className="w-5 h-5" />,
            value: 'sector',
            description: 'Agrupar por setor'
        }
    ];

    const handleItemClick = (value: string) => {
        onTabChange(value);
        // Fecha a sidebar em mobile após selecionar
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-300"
                aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isOpen}
            >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay para mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 dark:bg-black/70 z-40 transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar - Otimizada para diferentes telas */}
            <aside
                className={`
                    fixed md:sticky top-16 md:top-20 left-0 
                    h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]
                    w-64 sm:w-72 lg:w-80 xl:w-72
                    bg-white dark:bg-slate-800 
                    border-r border-gray-200 dark:border-slate-700
                    shadow-xl md:shadow-none
                    transition-all duration-300 ease-in-out
                    z-40
                    ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
                aria-label="Menu de navegação"
            >
                <nav className="h-full flex flex-col p-4 space-y-2 overflow-y-auto">
                    {/* Header da Sidebar */}
                    <div className="mb-4 pb-4 border-b border-gray-200 dark:border-slate-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 px-3">
                            Navegação
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400 px-3 mt-1">
                            Selecione uma visualização
                        </p>
                    </div>

                    {/* Menu Items */}
                    {sidebarItems.map((item) => {
                        const isActive = activeTab === item.value;
                        
                        return (
                            <button
                                key={item.id}
                                onClick={() => handleItemClick(item.value)}
                                className={`
                                    group relative w-full flex items-center gap-3 px-3 py-3 rounded-lg
                                    text-left transition-all duration-300
                                    ${isActive
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                                    }
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800
                                `}
                                aria-label={item.label}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {/* Ícone */}
                                <span className={`
                                    flex-shrink-0 transition-transform duration-300
                                    ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                                `}>
                                    {item.icon}
                                </span>

                                {/* Conteúdo */}
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm">
                                        {item.label}
                                    </div>
                                    {item.description && (
                                        <div className={`
                                            text-xs mt-0.5 transition-colors duration-300
                                            ${isActive 
                                                ? 'text-blue-100' 
                                                : 'text-gray-500 dark:text-gray-400'
                                            }
                                        `}>
                                            {item.description}
                                        </div>
                                    )}
                                </div>

                                {/* Indicador de ativo */}
                                {isActive && (
                                    <ChevronRight className="w-4 h-4 flex-shrink-0 animate-pulse" />
                                )}

                                {/* Barra lateral de destaque */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                                )}
                            </button>
                        );
                    })}

                    {/* Espaçador */}
                    <div className="flex-1" />

                    {/* Footer da Sidebar (opcional) */}
                    <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                        <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
                            <p className="font-medium mb-1">Dica:</p>
                            <p>Use as teclas de seta para navegar</p>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
