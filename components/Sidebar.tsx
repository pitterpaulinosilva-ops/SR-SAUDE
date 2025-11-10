/**
 * Sidebar Component - Redesigned
 * 
 * Navegação lateral responsiva com sistema de recolhimento/expansão.
 * 
 * Características:
 * - Sistema de recolhimento/expansão com estado persistente
 * - Largura: 300px (expandida) / 60px (recolhida)
 * - Altura dinâmica baseada no viewport (100vh)
 * - Transições suaves (300ms)
 * - Responsiva com gestos de swipe em mobile
 * - Acessibilidade completa (ARIA attributes)
 * - Scroll interno quando necessário
 * - Sombra sutil quando sobreposta
 * - Suporte a temas claro/escuro
 * 
 * @component
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
    ClipboardList, 
    Users, 
    Menu, 
    X,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Sparkles
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
    // Estado de mobile (overlay)
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    
    // Estado de expansão/recolhimento (desktop) - persistente
    const [isExpanded, setIsExpanded] = useState(() => {
        try {
            const saved = localStorage.getItem('sidebarExpanded');
            return saved !== null ? JSON.parse(saved) : true;
        } catch {
            return true;
        }
    });

    // Ref para gestos de swipe
    const sidebarRef = useRef<HTMLElement>(null);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    // Persiste estado de expansão
    useEffect(() => {
        try {
            localStorage.setItem('sidebarExpanded', JSON.stringify(isExpanded));
        } catch (error) {
            console.warn('Failed to save sidebar state');
        }
    }, [isExpanded]);

    // Gestos de swipe para mobile
    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchMove = (e: TouchEvent) => {
            touchEndX.current = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            const swipeDistance = touchEndX.current - touchStartX.current;
            const minSwipeDistance = 50;

            // Swipe right para abrir
            if (swipeDistance > minSwipeDistance && touchStartX.current < 50) {
                setIsMobileOpen(true);
            }
            // Swipe left para fechar
            else if (swipeDistance < -minSwipeDistance && isMobileOpen) {
                setIsMobileOpen(false);
            }
        };

        if (window.innerWidth < 768) {
            document.addEventListener('touchstart', handleTouchStart);
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);

            return () => {
                document.removeEventListener('touchstart', handleTouchStart);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [isMobileOpen]);

    const sidebarItems: SidebarItem[] = [
        {
            id: 'plan',
            label: 'Plano de Ação',
            icon: <ClipboardList className="w-5 h-5" />,
            value: 'plan',
            description: 'Visualizar todas as ações'
        },
        {
            id: 'analytics',
            label: 'Análises',
            icon: <Users className="w-5 h-5" />,
            value: 'analytics',
            description: 'Responsáveis e Setores'
        },
        {
            id: 'assistant',
            label: 'Assistente de Insight',
            icon: <Sparkles className="w-5 h-5" />,
            value: 'assistant',
            description: 'IA para análise de ações'
        }
    ];

    const handleItemClick = (value: string) => {
        onTabChange(value);
        // Fecha a sidebar em mobile após selecionar
        if (window.innerWidth < 768) {
            setIsMobileOpen(false);
        }
    };

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    const toggleMobile = () => {
        setIsMobileOpen(!isMobileOpen);
    };

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                onClick={toggleMobile}
                className="md:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors duration-300"
                aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isMobileOpen}
                aria-controls="sidebar-navigation"
            >
                {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Overlay para mobile */}
            {isMobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 dark:bg-black/70 z-40 transition-opacity duration-300"
                    onClick={toggleMobile}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar - Redesigned com recolhimento/expansão */}
            <aside
                ref={sidebarRef}
                id="sidebar-navigation"
                className={`
                    fixed md:sticky top-16 md:top-20 left-0 
                    h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]
                    bg-white dark:bg-slate-800 
                    border-r border-gray-200 dark:border-slate-700
                    transition-all duration-300 ease-in-out
                    z-40
                    ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
                    ${isExpanded ? 'w-[300px]' : 'w-[300px] md:w-[60px]'}
                    ${!isExpanded && 'md:shadow-md'}
                `}
                aria-label="Menu de navegação"
                aria-expanded={isExpanded}
            >
                <nav className="h-full flex flex-col overflow-hidden">
                    {/* Header da Sidebar com Toggle Button */}
                    <div className={`
                        flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700
                        ${!isExpanded && 'md:justify-center'}
                    `}>
                        {(isExpanded || window.innerWidth < 768) && (
                            <div className="flex-1 min-w-0">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                                    Navegação
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                    Selecione uma visualização
                                </p>
                            </div>
                        )}
                        
                        {/* Desktop Toggle Button */}
                        <button
                            onClick={toggleExpanded}
                            className="hidden md:flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors duration-300"
                            aria-label={isExpanded ? 'Recolher sidebar' : 'Expandir sidebar'}
                            aria-expanded={isExpanded}
                            title={isExpanded ? 'Recolher' : 'Expandir'}
                        >
                            {isExpanded ? (
                                <ChevronsLeft className="w-5 h-5" />
                            ) : (
                                <ChevronsRight className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {/* Menu Items - Com scroll interno */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">

                        {sidebarItems.map((item) => {
                            const isActive = activeTab === item.value;
                            const showLabels = isExpanded || window.innerWidth < 768;
                            
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleItemClick(item.value)}
                                    className={`
                                        group relative w-full flex items-center rounded-lg
                                        text-left transition-all duration-300
                                        ${showLabels ? 'gap-3 px-3 py-3' : 'justify-center px-2 py-3'}
                                        ${isActive
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                                        }
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800
                                    `}
                                    aria-label={item.label}
                                    aria-current={isActive ? 'page' : undefined}
                                    title={!showLabels ? item.label : undefined}
                                >
                                    {/* Ícone */}
                                    <span className={`
                                        flex-shrink-0 transition-transform duration-300
                                        ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                                    `}>
                                        {item.icon}
                                    </span>

                                    {/* Conteúdo - Visível apenas quando expandido */}
                                    {showLabels && (
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-sm truncate">
                                                {item.label}
                                            </div>
                                            {item.description && (
                                                <div className={`
                                                    text-xs mt-0.5 transition-colors duration-300 truncate
                                                    ${isActive 
                                                        ? 'text-blue-100' 
                                                        : 'text-gray-500 dark:text-gray-400'
                                                    }
                                                `}>
                                                    {item.description}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Indicador de ativo */}
                                    {isActive && showLabels && (
                                        <ChevronRight className="w-4 h-4 flex-shrink-0 animate-pulse" />
                                    )}

                                    {/* Barra lateral de destaque */}
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full" />
                                    )}

                                    {/* Tooltip para modo recolhido */}
                                    {!showLabels && (
                                        <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-slate-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50 shadow-lg">
                                            {item.label}
                                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-slate-700"></div>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer da Sidebar */}
                    {(isExpanded || window.innerWidth < 768) && (
                        <div className="p-4 border-t border-gray-200 dark:border-slate-700">
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                <p className="font-medium mb-1">Dica:</p>
                                <p className="truncate">Use as teclas de seta para navegar</p>
                            </div>
                        </div>
                    )}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
