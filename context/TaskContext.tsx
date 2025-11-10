import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Task, ActionProgress, SubTaskStatus } from '../types';

interface TaskContextType {
    tasks: Record<string | number, Task[]>; // Mapeado por actionId
    loading: boolean;
    error: string | null;
    
    // Actions
    fetchTasksForAction: (actionId: string | number) => Promise<void>;
    addTask: (actionId: string | number, task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
    deleteTask: (taskId: string) => Promise<void>;
    reorderTask: (taskId: string, newOrder: number) => Promise<void>;
    
    // Computed
    getTasksForAction: (actionId: string | number) => Task[];
    getActionProgress: (actionId: string | number) => ActionProgress;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};

interface TaskProviderProps {
    children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const [tasks, setTasks] = useState<Record<string | number, Task[]>>({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Mock data - Tarefas de exemplo baseadas nas ações reais
    const mockTasksData: Record<string | number, Task[]> = {
        // Saúde ONA - Ação 1: Política de Segurança
        1: [
            {
                id: 'task-1-1',
                actionId: 1,
                action: 'Revisar políticas existentes e benchmarks',
                responsible: 'Ana Lima',
                sector: 'Qualidade',
                status: 'Concluído',
                startDate: '2024-05-10',
                endDate: '2024-05-20',
                order: 0,
                createdAt: '2024-05-10T10:00:00Z',
                updatedAt: '2024-05-20T15:30:00Z'
            },
            {
                id: 'task-1-2',
                actionId: 1,
                action: 'Elaborar minuta da política',
                responsible: 'Ana Lima',
                sector: 'Qualidade',
                status: 'Concluído',
                startDate: '2024-05-21',
                endDate: '2024-05-30',
                order: 1,
                createdAt: '2024-05-10T10:00:00Z',
                updatedAt: '2024-05-30T16:00:00Z'
            },
            {
                id: 'task-1-3',
                actionId: 1,
                action: 'Submeter para aprovação da diretoria',
                responsible: 'Ana Lima',
                sector: 'Qualidade',
                status: 'Concluído',
                startDate: '2024-06-01',
                endDate: '2024-06-10',
                order: 2,
                createdAt: '2024-05-10T10:00:00Z',
                updatedAt: '2024-06-10T14:00:00Z'
            },
            {
                id: 'task-1-4',
                actionId: 1,
                action: 'Comunicar política aprovada aos colaboradores',
                responsible: 'Ana Lima',
                sector: 'Qualidade',
                status: 'Concluído',
                startDate: '2024-06-11',
                endDate: '2024-06-15',
                order: 3,
                createdAt: '2024-05-10T10:00:00Z',
                updatedAt: '2024-06-15T11:00:00Z'
            }
        ],
        // Saúde ONA - Ação 2: Treinamento higiene das mãos
        2: [
            {
                id: 'task-2-1',
                actionId: 2,
                action: 'Desenvolver material didático do treinamento',
                responsible: 'Carlos Souza',
                sector: 'Enfermagem',
                status: 'Concluído',
                startDate: '2024-06-01',
                endDate: '2024-06-15',
                order: 0,
                createdAt: '2024-06-01T09:00:00Z',
                updatedAt: '2024-06-15T17:00:00Z'
            },
            {
                id: 'task-2-2',
                actionId: 2,
                action: 'Agendar sessões de treinamento',
                responsible: 'Carlos Souza',
                sector: 'Enfermagem',
                status: 'Concluído',
                startDate: '2024-06-16',
                endDate: '2024-06-20',
                order: 1,
                createdAt: '2024-06-01T09:00:00Z',
                updatedAt: '2024-06-20T10:00:00Z'
            },
            {
                id: 'task-2-3',
                actionId: 2,
                action: 'Realizar treinamento turno manhã',
                responsible: 'Carlos Souza',
                sector: 'Enfermagem',
                status: 'Concluído',
                startDate: '2024-06-21',
                endDate: '2024-07-05',
                order: 2,
                createdAt: '2024-06-01T09:00:00Z',
                updatedAt: '2024-07-05T12:00:00Z'
            },
            {
                id: 'task-2-4',
                actionId: 2,
                action: 'Realizar treinamento turno tarde',
                responsible: 'Carlos Souza',
                sector: 'Enfermagem',
                status: 'Em Andamento',
                startDate: '2024-07-06',
                endDate: '2024-07-15',
                order: 3,
                createdAt: '2024-06-01T09:00:00Z',
                updatedAt: '2024-07-10T14:00:00Z'
            },
            {
                id: 'task-2-5',
                actionId: 2,
                action: 'Realizar treinamento turno noite',
                responsible: 'Carlos Souza',
                sector: 'Enfermagem',
                status: 'Não Iniciado',
                startDate: '2024-07-16',
                endDate: '2024-07-25',
                order: 4,
                createdAt: '2024-06-01T09:00:00Z',
                updatedAt: '2024-06-01T09:00:00Z'
            }
        ],
        // Saúde ONA - Ação 3: Checklist cirurgia
        3: [
            {
                id: 'task-3-1',
                actionId: 3,
                action: 'Adaptar checklist OMS para realidade local',
                responsible: 'Mariana Costa',
                sector: 'Centro Cirúrgico',
                status: 'Concluído',
                startDate: '2024-06-05',
                endDate: '2024-06-20',
                order: 0,
                createdAt: '2024-06-05T08:00:00Z',
                updatedAt: '2024-06-20T16:00:00Z'
            },
            {
                id: 'task-3-2',
                actionId: 3,
                action: 'Treinar equipe cirúrgica no uso do checklist',
                responsible: 'Mariana Costa',
                sector: 'Centro Cirúrgico',
                status: 'Em Andamento',
                startDate: '2024-06-21',
                endDate: '2024-07-05',
                order: 1,
                createdAt: '2024-06-05T08:00:00Z',
                updatedAt: '2024-07-01T10:00:00Z'
            },
            {
                id: 'task-3-3',
                actionId: 3,
                action: 'Implementar fase piloto em 5 cirurgias',
                responsible: 'Mariana Costa',
                sector: 'Centro Cirúrgico',
                status: 'Não Iniciado',
                startDate: '2024-07-06',
                endDate: '2024-07-15',
                order: 2,
                createdAt: '2024-06-05T08:00:00Z',
                updatedAt: '2024-06-05T08:00:00Z'
            },
            {
                id: 'task-3-4',
                actionId: 3,
                action: 'Coletar feedback e ajustar checklist',
                responsible: 'Mariana Costa',
                sector: 'Centro Cirúrgico',
                status: 'Não Iniciado',
                startDate: '2024-07-16',
                endDate: '2024-07-20',
                order: 3,
                createdAt: '2024-06-05T08:00:00Z',
                updatedAt: '2024-06-05T08:00:00Z'
            }
        ]
    };

    // Fetch tasks for a specific action
    const fetchTasksForAction = useCallback(async (actionId: string | number) => {
        setLoading(true);
        setError(null);
        
        try {
            // TODO: Replace with actual API call
            // const response = await fetch(`/api/actions/${actionId}/tasks`);
            // const data = await response.json();
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Get mock tasks for this action
            const actionTasks = mockTasksData[actionId] || [];
            
            setTasks(prev => ({
                ...prev,
                [actionId]: actionTasks
            }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao carregar tarefas');
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    // Add a new task
    const addTask = useCallback(async (
        actionId: string | number,
        task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
    ) => {
        setLoading(true);
        setError(null);
        
        try {
            // TODO: Replace with actual API call
            // const response = await fetch(`/api/actions/${actionId}/tasks`, {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(task)
            // });
            // const newTask = await response.json();
            
            // Mock implementation
            const newTask: Task = {
                ...task,
                id: `task-${Date.now()}`,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
            
            setTasks(prev => ({
                ...prev,
                [actionId]: [...(prev[actionId] || []), newTask].sort((a, b) => a.order - b.order)
            }));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao criar tarefa');
            console.error('Error adding task:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Update an existing task
    const updateTask = useCallback(async (taskId: string, updates: Partial<Task>) => {
        setError(null);
        
        try {
            // TODO: Replace with actual API call
            // const response = await fetch(`/api/tasks/${taskId}`, {
            //     method: 'PATCH',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(updates)
            // });
            // await response.json();
            
            // Optimistic update
            setTasks(prev => {
                const newTasks = { ...prev };
                Object.keys(newTasks).forEach(actionId => {
                    newTasks[actionId] = newTasks[actionId].map(task =>
                        task.id === taskId
                            ? { ...task, ...updates, updatedAt: new Date().toISOString() }
                            : task
                    );
                });
                return newTasks;
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao atualizar tarefa');
            console.error('Error updating task:', err);
            throw err;
        }
    }, []);

    // Delete a task
    const deleteTask = useCallback(async (taskId: string) => {
        setError(null);
        
        try {
            // TODO: Replace with actual API call
            // await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
            
            // Optimistic delete
            setTasks(prev => {
                const newTasks = { ...prev };
                Object.keys(newTasks).forEach(actionId => {
                    newTasks[actionId] = newTasks[actionId].filter(task => task.id !== taskId);
                });
                return newTasks;
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao excluir tarefa');
            console.error('Error deleting task:', err);
            throw err;
        }
    }, []);

    // Reorder a task
    const reorderTask = useCallback(async (taskId: string, newOrder: number) => {
        setError(null);
        
        try {
            // TODO: Replace with actual API call
            // await fetch(`/api/tasks/${taskId}/reorder`, {
            //     method: 'PATCH',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ newOrder })
            // });
            
            // Optimistic reorder
            setTasks(prev => {
                const newTasks = { ...prev };
                Object.keys(newTasks).forEach(actionId => {
                    const taskIndex = newTasks[actionId].findIndex(t => t.id === taskId);
                    if (taskIndex !== -1) {
                        const updatedTasks = [...newTasks[actionId]];
                        const [movedTask] = updatedTasks.splice(taskIndex, 1);
                        movedTask.order = newOrder;
                        
                        // Reorder all tasks
                        updatedTasks.splice(newOrder, 0, movedTask);
                        updatedTasks.forEach((task, index) => {
                            task.order = index;
                        });
                        
                        newTasks[actionId] = updatedTasks;
                    }
                });
                return newTasks;
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao reordenar tarefa');
            console.error('Error reordering task:', err);
            throw err;
        }
    }, []);

    // Get tasks for a specific action
    const getTasksForAction = useCallback((actionId: string | number): Task[] => {
        return tasks[actionId] || [];
    }, [tasks]);

    // Calculate action progress based on tasks
    const getActionProgress = useCallback((actionId: string | number): ActionProgress => {
        const actionTasks = tasks[actionId] || [];
        const total = actionTasks.length;
        const completed = actionTasks.filter(task => task.status === 'Concluído').length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        return { total, completed, percentage };
    }, [tasks]);

    const value: TaskContextType = {
        tasks,
        loading,
        error,
        fetchTasksForAction,
        addTask,
        updateTask,
        deleteTask,
        reorderTask,
        getTasksForAction,
        getActionProgress
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};
