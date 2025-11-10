import React from 'react';
import { ChevronDown, ChevronUp, ListTodo } from 'lucide-react';
import { Task } from '../types';
import TaskItem from './TaskItem';

interface TaskListProps {
    tasks: Task[];
    isExpanded?: boolean;
    onToggleExpand?: () => void;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    isExpanded = false,
    onToggleExpand
}) => {
    // Ordenar tarefas por ordem
    const sortedTasks = [...tasks].sort((a, b) => a.order - b.order);

    return (
        <div className="space-y-4">
            {/* Cabeçalho */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Tarefas ({tasks.length})
                    </h3>
                </div>
                
                {onToggleExpand && (
                    <button
                        onClick={onToggleExpand}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        aria-label={isExpanded ? 'Recolher tarefas' : 'Expandir tarefas'}
                    >
                        {isExpanded ? (
                            <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        )}
                    </button>
                )}
            </div>

            {/* Lista de Tarefas com animação */}
            <div
                className={`
                    transition-all duration-500 ease-in-out overflow-hidden
                    ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
                `}
            >
                {sortedTasks.length > 0 ? (
                    <div className="space-y-3">
                        {sortedTasks.map((task, index) => (
                            <div
                                key={task.id}
                                className="animate-fadeIn"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <TaskItem task={task} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 dark:bg-slate-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600">
                        <ListTodo className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
                        <h4 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Nenhuma tarefa cadastrada
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            As tarefas serão adicionadas via código
                        </p>
                    </div>
                )}
            </div>

            {/* Estilos para animação fadeIn */}
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default TaskList;
