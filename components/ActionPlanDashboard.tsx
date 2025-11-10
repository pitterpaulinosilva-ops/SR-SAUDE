
import React, { useState, useEffect } from 'react';
import { Search, ExternalLink, Folder } from 'lucide-react';
import { Plan, ProcessedAction } from '../types';
import Sidebar from './Sidebar';
import StatusChart from './charts/StatusChart';
import ResponsibleChart from './charts/ResponsibleChart';
import SectorChart from './charts/SectorChart';
import Input from './Input';
import Button from './Button';
import ActionCard from './ActionCard';

interface ActionPlanDashboardProps {
    plan: Plan;
    actions: ProcessedAction[];
    allPlans: Plan[];
}

const ActionPlanDashboard: React.FC<ActionPlanDashboardProps> = ({ plan, actions, allPlans }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentFilter, setCurrentFilter] = useState('Todos');
    const [filteredData, setFilteredData] = useState<ProcessedAction[]>([]);
    const [activeTab, setActiveTab] = useState('plan');

    useEffect(() => {
        let filtered = actions;
        if (currentFilter !== 'Todos') {
            filtered = filtered.filter(item => item.delayStatus === currentFilter);
        }
        if (searchTerm) {
            const lowercasedTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(item =>
                item.action.toLowerCase().includes(lowercasedTerm) ||
                item.responsible.toLowerCase().includes(lowercasedTerm) ||
                item.sector.toLowerCase().includes(lowercasedTerm) ||
                String(item.id).includes(lowercasedTerm)
            );
        }
        setFilteredData(filtered);
    }, [searchTerm, currentFilter, actions]);

    const filterButtons = [
        { label: 'Todos', value: 'Todos' as const }, { label: 'Em Atraso', value: 'Em Atraso' as const },
        { label: 'No Prazo', value: 'No Prazo' as const }, { label: 'Concluído', value: 'Concluído' as const }
    ];
    
    const filterButtonClasses: Record<string, string> = {
        'Em Atraso': 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg',
        'No Prazo': 'bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-600 hover:to-sky-700 shadow-lg',
        'Concluído': 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg',
        'Todos': 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 shadow-lg'
    }

    // Renderiza o conteúdo baseado na tab ativa
    const renderContent = () => {
        switch (activeTab) {
            case 'plan':
                return (
                    <div className="space-y-4 sm:space-y-6">
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg border border-white/20 dark:border-slate-700/20 overflow-hidden transition-colors duration-300">
                            <StatusChart data={actions} />
                        </div>
                        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg border border-white/20 dark:border-slate-700/20 p-3 sm:p-4 md:p-6 transition-colors duration-300">
                            <div className="flex flex-col gap-3 sm:gap-4 items-center">
                                <div className="relative w-full">
                                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    <Input 
                                        type="text" 
                                        placeholder="Pesquisar por código, ação, responsável ou setor..." 
                                        value={searchTerm} 
                                        onChange={(e) => setSearchTerm(e.target.value)} 
                                    />
                                </div>
                                <div className="flex flex-wrap gap-2 justify-center w-full">
                                    {filterButtons.map((button) => (
                                        <Button 
                                            key={button.value} 
                                            variant={currentFilter === button.value ? "default" : "outline"} 
                                            onClick={() => setCurrentFilter(button.value)} 
                                            className={currentFilter === button.value ? filterButtonClasses[button.value] : ''}
                                        >
                                            {button.label}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {filteredData.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
                                {filteredData.map((action: any) => (
                                    <ActionCard key={action.id} action={action} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 sm:py-16 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg border border-white/20 dark:border-slate-700/20 transition-colors duration-300">
                                <Folder className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Nenhum resultado encontrado
                                </h3>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    Tente ajustar sua busca ou filtros.
                                </p>
                            </div>
                        )}
                    </div>
                );
            case 'responsible':
                return (
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg border border-white/20 dark:border-slate-700/20 overflow-hidden transition-colors duration-300">
                        <ResponsibleChart data={actions} />
                    </div>
                );
            case 'sector':
                return (
                    <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg border border-white/20 dark:border-slate-700/20 overflow-hidden transition-colors duration-300">
                        <SectorChart data={actions} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-0 md:gap-4 lg:gap-6 h-full">
            {/* Sidebar */}
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            
            {/* Conteúdo Principal - Otimizado para diferentes telas */}
            <main className="flex-1 min-w-0 w-full transition-all duration-300">
                <div className="h-full">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default ActionPlanDashboard;
