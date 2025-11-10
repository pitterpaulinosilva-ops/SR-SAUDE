
import React, { useState } from 'react';
import { Users, Building, Clock, CheckCircle, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { ProcessedAction, DelayStatus, TaskStatus } from '../types';

interface ActionCardProps {
    action: ProcessedAction;
}

const ActionCard: React.FC<ActionCardProps> = ({ action }) => {
    const { id, action: title, responsible, sector, endDate, delayStatus, followUp, status } = action;
    const [isDetailsVisible, setIsDetailsVisible] = useState(false);

    const delayStatusConfig: Record<DelayStatus, { icon: React.ReactElement; color: string; bg: string }> = {
        'Em Atraso': { icon: <AlertTriangle className="w-4 h-4" />, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/50' },
        'No Prazo': { icon: <Clock className="w-4 h-4" />, color: 'text-sky-500', bg: 'bg-sky-100 dark:bg-sky-900/50' },
        'Concluído': { icon: <CheckCircle className="w-4 h-4" />, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/50' }
    };

    const taskStatusConfig: Record<TaskStatus, { label: string; className: string }> = {
        'Concluído': { label: 'Concluído', className: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200' },
        'Em Andamento': { label: 'Em Andamento', className: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200' },
        'Planejado': { label: 'Planejado', className: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200' }
    };
    
    const currentDelayStatus = delayStatusConfig[delayStatus];
    const currentTaskStatus = taskStatusConfig[status] || { label: status, className: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200' };
    const formattedEndDate = new Date(endDate + 'T00:00:00-03:00').toLocaleDateString('pt-BR');

    return (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-slate-700/20 p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 transition-colors">
            <div>
                <div className="flex justify-between items-start mb-3">
                    <span className="font-bold text-sm text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded-full">ID: {id}</span>
                    <div className={`flex items-center gap-2 text-sm font-semibold ${currentDelayStatus.color} ${currentDelayStatus.bg} px-2.5 py-1 rounded-full`}>
                        {currentDelayStatus.icon}
                        <span>{delayStatus}</span>
                    </div>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-base leading-tight">{title}</h3>
                <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
                    <div className="flex items-center gap-2"><Users className="w-4 h-4 text-gray-400" /><span className="font-medium">Responsável:</span><span>{responsible}</span></div>
                    <div className="flex items-center gap-2"><Building className="w-4 h-4 text-gray-400" /><span className="font-medium">Setor:</span><span>{sector}</span></div>
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gray-400" /><span className="font-medium">Prazo Final:</span><span>{formattedEndDate}</span></div>
                </div>
                <div className="mt-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${currentTaskStatus.className}`}>Status: {currentTaskStatus.label}</span>
                </div>
            </div>
            <div className={`transition-all duration-500 ease-in-out overflow-hidden transition-colors ${isDetailsVisible ? 'max-h-96 mt-4 pt-4 border-t border-dashed border-gray-300 dark:border-slate-600' : 'max-h-0'}`}>
                <h4 className="font-semibold text-sm text-gray-700 dark:text-gray-300 mb-2">Acompanhamento:</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{followUp || "Nenhum acompanhamento registrado."}</p>
            </div>
            <div className="mt-4 text-center">
                <button onClick={() => setIsDetailsVisible(!isDetailsVisible)} className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors duration-300">
                    <span>{isDetailsVisible ? 'Ocultar Detalhes' : 'Ver Detalhes'}</span>
                    {isDetailsVisible ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
            </div>
        </div>
    );
};

export default ActionCard;
