import React from 'react';
import { ActionProgress } from '../types';

interface ProgressBarProps {
    progress: ActionProgress;
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
    progress, 
    showLabel = true,
    size = 'md' 
}) => {
    const { total, completed, percentage } = progress;

    // Configuração de tamanhos
    const sizeConfig = {
        sm: {
            height: 'h-1.5',
            text: 'text-xs',
            padding: 'py-1'
        },
        md: {
            height: 'h-2.5',
            text: 'text-sm',
            padding: 'py-2'
        },
        lg: {
            height: 'h-3',
            text: 'text-base',
            padding: 'py-3'
        }
    };

    const config = sizeConfig[size];

    // Determinar cor baseada na porcentagem
    const getProgressColor = () => {
        if (percentage === 100) {
            return 'bg-gradient-to-r from-green-500 to-green-600';
        } else if (percentage >= 70) {
            return 'bg-gradient-to-r from-blue-500 to-blue-600';
        } else if (percentage >= 40) {
            return 'bg-gradient-to-r from-yellow-500 to-yellow-600';
        } else {
            return 'bg-gradient-to-r from-orange-500 to-orange-600';
        }
    };

    // Determinar cor do texto baseada na porcentagem
    const getTextColor = () => {
        if (percentage === 100) {
            return 'text-green-700 dark:text-green-400';
        } else if (percentage >= 70) {
            return 'text-blue-700 dark:text-blue-400';
        } else if (percentage >= 40) {
            return 'text-yellow-700 dark:text-yellow-400';
        } else {
            return 'text-orange-700 dark:text-orange-400';
        }
    };

    return (
        <div className={config.padding}>
            {/* Label */}
            {showLabel && (
                <div className={`flex items-center justify-between mb-2 ${config.text}`}>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                        Progresso: {completed}/{total} tarefas concluídas
                    </span>
                    <span className={`font-bold ${getTextColor()}`}>
                        {percentage}%
                    </span>
                </div>
            )}

            {/* Barra de Progresso */}
            <div className={`
                w-full ${config.height} 
                bg-gray-200 dark:bg-gray-700 
                rounded-full 
                overflow-hidden
                shadow-inner
            `}>
                <div
                    className={`
                        ${config.height} 
                        ${getProgressColor()}
                        rounded-full
                        transition-all duration-500 ease-out
                        shadow-sm
                    `}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${percentage}% concluído`}
                />
            </div>

            {/* Mensagem de status */}
            {showLabel && total > 0 && (
                <div className={`mt-1 ${config.text}`}>
                    {percentage === 100 ? (
                        <span className="text-green-600 dark:text-green-400 font-medium">
                            ✓ Todas as tarefas concluídas!
                        </span>
                    ) : percentage === 0 ? (
                        <span className="text-gray-500 dark:text-gray-400">
                            Nenhuma tarefa iniciada
                        </span>
                    ) : (
                        <span className="text-gray-600 dark:text-gray-400">
                            {total - completed} {total - completed === 1 ? 'tarefa restante' : 'tarefas restantes'}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProgressBar;
