
import React, { useState, useEffect } from 'react';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { ThemeProvider } from './context/ThemeContext';
import { usePlans } from './hooks/usePlans';
import { useProcessedActionData } from './hooks/useProcessedActionData';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs';
import ThemeToggle from './components/ThemeToggle';
import LoadingSpinner from './components/LoadingSpinner';
import ActionPlanDashboard from './components/ActionPlanDashboard';

const AppContent = () => {
    const { plans, loading: plansLoading, error } = usePlans();
    const [activePlanId, setActivePlanId] = useState<string | null>(null);

    useEffect(() => {
        if (plans.length > 0 && !activePlanId) {
            setActivePlanId(plans[0].id);
        }
    }, [plans, activePlanId]);

    const { data: actions, loading: actionsLoading } = useProcessedActionData(activePlanId);
    
    const getFooterText = () => `Atualizado em: ${new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })} | Todos os direitos reservados para DIGEST Processos.`;

    const activePlan = plans.find(p => p.id === activePlanId);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 text-gray-800 dark:text-gray-100 flex flex-col transition-colors duration-300">
            {/* Skip Link para Acessibilidade */}
            <a 
                href="#main-content" 
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Pular para conteúdo principal
            </a>
            
            {/* Topbar Fixa - Layout Vertical em Mobile */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 shadow-lg border-b border-gray-200 dark:border-slate-700 transition-colors duration-300">
                {/* Layout Mobile: Vertical (Logo acima, título abaixo) */}
                <div className="md:hidden">
                    {/* Linha 1: Logo, Botões */}
                    <div className="flex items-center justify-between gap-2 px-3 py-2">
                        <div className="flex items-center flex-shrink-0">
                            <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                        </div>
                        
                        <div className="flex items-center gap-2">
                            {!plansLoading && !error && plans.length > 0 && (
                                <a
                                    href="https://sistemafiea.sysepa.com.br/epa/incluir_plano_acao.php?codigo=26203"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 rounded-lg font-semibold text-xs bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 shadow-lg transition-colors duration-300 inline-flex items-center gap-1 flex-shrink-0"
                                    title="Abrir Plano de Ação no EPA"
                                >
                                    <span>EPA</span>
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            )}
                            <ThemeToggle />
                        </div>
                    </div>
                    
                    {/* Linha 2: Título do Plano */}
                    <div className="px-3 pb-2">
                        <h1 className="text-xs font-bold text-gray-900 dark:text-gray-100 leading-tight">
                            Manutenção da Certificação ONA 2026
                        </h1>
                        <p className="text-[10px] text-gray-600 dark:text-gray-400">
                            PA: 26203
                        </p>
                    </div>
                </div>
                
                {/* Layout Desktop: Horizontal (tudo na mesma linha) */}
                <div className="hidden md:flex items-center justify-between gap-4 px-4 py-3">
                    <div className="flex items-center flex-shrink-0">
                        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                    </div>
                    
                    <div className="flex-1 flex justify-center px-4 min-w-0">
                        <div className="text-center">
                            <h1 className="text-base lg:text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
                                Manutenção da Certificação ONA 2026
                            </h1>
                            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                                PA: 26203
                            </p>
                        </div>
                    </div>
                        
                    {!plansLoading && !error && plans.length > 0 && (
                        <a
                            href="https://sistemafiea.sysepa.com.br/epa/incluir_plano_acao.php?codigo=26203"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 lg:px-8 py-2 rounded-lg font-semibold text-sm bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 shadow-lg transition-colors duration-300 inline-flex items-center gap-2 flex-shrink-0"
                            title="Abrir Plano de Ação no EPA"
                        >
                            <span>PA EPA</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    )}
                        
                    <div className="flex-shrink-0">
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Conteúdo Principal - Layout Responsivo Otimizado */}
            <main id="main-content" className="flex-grow mt-[88px] md:mt-16 w-full">
                <div className="h-full w-full max-w-[2000px] mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
                    {plansLoading && (
                        <div className="flex items-center justify-center min-h-[60vh]">
                            <LoadingSpinner />
                        </div>
                    )}
                    
                    {error && (
                        <div className="flex items-center justify-center min-h-[60vh] px-4">
                            <div className="text-center py-12 sm:py-16 bg-red-100 dark:bg-red-900/30 rounded-lg transition-colors duration-300 max-w-2xl w-full">
                                <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
                                <h3 className="mt-2 font-medium text-red-800 dark:text-red-200">Ocorreu um erro</h3>
                                <p className="mt-1 text-sm text-red-600 dark:text-red-300">{error}</p>
                            </div>
                        </div>
                    )}
                    
                    {!plansLoading && !error && plans.length > 0 && activePlanId && (
                        <>
                            {plans.map((plan: any) => (
                                activePlanId === plan.id && (
                                    <div key={plan.id} className="h-full">
                                        {(actionsLoading || !activePlan) ? (
                                            <div className="flex items-center justify-center min-h-[60vh]">
                                                <LoadingSpinner />
                                            </div>
                                        ) : (
                                            <ActionPlanDashboard plan={activePlan} actions={actions} allPlans={plans} />
                                        )}
                                    </div>
                                )
                            ))}
                        </>
                    )}
                </div>
            </main>

            <footer className="text-center p-3 sm:p-4 md:p-6 mt-6 sm:mt-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t border-white/20 dark:border-slate-700/20 transition-colors duration-300">
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-2">{getFooterText()}</p>
            </footer>
        </div>
    );
};

// Componente raiz que envolve o App com os provedores
import { TaskProvider } from './context/TaskContext';

const Root = () => (
    <ThemeProvider>
        <TaskProvider>
            <AppContent />
        </TaskProvider>
    </ThemeProvider>
);

export default Root;
