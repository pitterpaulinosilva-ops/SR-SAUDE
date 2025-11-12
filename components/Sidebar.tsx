/**
 * Sidebar Component
 * 
 * Navegação lateral responsiva com design uniforme ao projeto.
 * 
 * Características:
 * - Design glassmorphism consistente com o projeto
 * - Sistema de recolhimento/expansão com estado persistente
 * - Largura: 280px (expandida) / 72px (recolhida)
 * - Transições suaves (300ms)
 * - Responsiva com gestos de swipe em mobile
 * - Acessibilidade completa (ARIA attributes)
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
                className="md:hidden fixed top-[92px] z-50 left-4 p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-lg border border-white/20 dark:border-slate-700/20 text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105"
                aria-label={isMobileOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isMobileOpen}
                aria-controls="sidebar-navigation"
            >
                {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Overlay para mobile */}
            {isMobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm z-40 transition-all duration-300"
                    onClick={toggleMobile}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar com design glassmorphism */}
            <aside
                ref={sidebarRef}
                id="sidebar-navigation"
                className={`
                    fixed md:sticky top-[88px] md:top-20 left-0 
                    h-[calc(100vh-88px)] md:h-[calc(100vh-5rem)]
                    bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm
                    border-r border-white/20 dark:border-slate-700/20
                    transition-all duration-300 ease-in-out
                    z-40
                    ${isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
                    ${isExpanded ? 'w-[280px]' : 'w-[280px] md:w-[72px]'}
                    ${!isExpanded && 'md:shadow-lg'}
                `}
                aria-label="Menu de navegação"
                aria-expanded={isExpanded}
            >
                <nav className="h-full flex flex-col overflow-hidden">
                    {/* Header da Sidebar */}
                    <div className={`
                        flex items-center justify-between p-4 border-b border-white/20 dark:border-slate-700/20
                        ${!isExpanded && 'md:justify-center'}
                    `}>
                        {(isExpanded || window.innerWidth < 768) && (
                            <div className="flex-1 min-w-0">
                                <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate">
                                    Menu
                                </h2>
                                <p className="text-xs text-gray-600 dark:text-gray-400 truncate mt-0.5">
                                    Navegação
                                </p>
                            </div>
                        )}
                        
                        {/* Desktop Toggle Button */}
                        <button
                            onClick={toggleExpanded}
                            className="hidden md:flex items-center justify-center p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-700/50 transition-all duration-300 hover:scale-110"
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

                    {/* Menu Items */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-2">

                        {sidebarItems.map((item) => {
                            const isActive = activeTab === item.value;
                            const showLabels = isExpanded || window.innerWidth < 768;
                            
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleItemClick(item.value)}
                                    className={`
                                        group relative w-full flex items-center rounded-xl
                                        text-left transition-all duration-300
                                        ${showLabels ? 'gap-3 px-4 py-3.5' : 'justify-center px-3 py-3.5'}
                                        ${isActive
                                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
                                        }
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800
                                        hover:scale-[1.02]
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
                                            <div className="font-semibold text-sm truncate">
                                                {item.label}
                                            </div>
                                            {item.description && (
                                                <div className={`
                                                    text-xs mt-1 transition-colors duration-300 truncate
                                                    ${isActive 
                                                        ? 'text-blue-50/90' 
                                                        : 'text-gray-600 dark:text-gray-400'
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

                                    {/* Barra lateral de destaque arredondada */}
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-12 bg-white rounded-full shadow-lg" />
                                    )}

                                    {/* Tooltip para modo recolhido */}
                                    {!showLabels && (
                                        <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900/95 dark:bg-slate-700/95 backdrop-blur-sm text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
                                            <div className="font-medium">{item.label}</div>
                                            {item.description && (
                                                <div className="text-xs text-gray-300 mt-0.5">{item.description}</div>
                                            )}
                                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-[6px] border-transparent border-r-gray-900/95 dark:border-r-slate-700/95"></div>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer da Sidebar */}
                    {(isExpanded || window.innerWidth < 768) && (
                        <div className="p-4 border-t border-white/20 dark:border-slate-700/20">
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                                <p className="font-semibold mb-1.5 text-gray-700 dark:text-gray-300">💡 Dica</p>
                                <p className="leading-relaxed">Navegue rapidamente entre as seções</p>
                            </div>
                        </div>
                    )}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
