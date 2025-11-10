import React from 'react';
import { Users, Building, Calendar, GripVertical } from 'lucide-react';
import { Task, SubTaskStatus } from '../types';

interface TaskItemProps {
    task: Task;
    isDragging?: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ 
    task,
    isDragging = false 
}) => {
    const { action, responsible, sector, status, startDate, endDate, order } = task;

    // Configuração de cores para cada status
    const statusConfig: Record<SubTaskStatus, { label: string; className: string; bgColor: string }> = {
        'Não Iniciado': { 
            label: 'Não Iniciado', 
            className: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
            bgColor: 'bg-gray-50 dark:bg-gray-800/50'
        },
        'Em Andamento': { 
            label: 'Em Andamento', 
            className: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20'
        },
        'Concluído': { 
            label: 'Concluído', 
            className: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200',
            bgColor: 'bg-green-50 dark:bg-green-900/20'
        }
    };

    const currentStatus = statusConfig[status];
    const formattedStartDate = new Date(startDate + 'T00:00:00-03:00').toLocaleDateString('pt-BR');
    const formattedEndDate = new Date(endDate + 'T00:00:00-03:00').toLocaleDateString('pt-BR');

    return (
        <div 
            className={`
                ${currentStatus.bgColor}
                border-l-4 
                ${status === 'Concluído' ? 'border-green-500' : status === 'Em Andamento' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}
                rounded-lg p-4 
                transition-all duration-300
                ${isDragging ? 'opacity-50 shadow-2xl scale-105' : 'hover:shadow-md'}
                group
            `}
        >
            <div className="flex items-start gap-3">
                {/* Drag Handle */}
                <div className="cursor-grab active:cursor-grabbing pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                </div>

                {/* Conteúdo Principal */}
                <div className="flex-1 min-w-0">
                    {/* Cabeçalho com número e título */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                    #{order + 1}
                                </span>
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight">
                                {action}
                            </h4>
                        </div>
                        
                        {/* Badge de Status */}
                        <span className={`
                            inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                            ${currentStatus.className}
                            whitespace-nowrap
                        `}>
                            {currentStatus.label}
                        </span>
                    </div>

                    {/* Informações */}
                    <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400 mb-3">
                        <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                            <span className="font-medium">Responsável:</span>
                            <span className="truncate">{responsible}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                            <span className="font-medium">Setor:</span>
                            <span className="truncate">{sector}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                            <span className="font-medium">Período:</span>
                            <span>{formattedStartDate} - {formattedEndDate}</span>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default TaskItem;
