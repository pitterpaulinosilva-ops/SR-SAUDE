
import { ReactElement } from 'react';

export type DelayStatus = 'Em Atraso' | 'No Prazo' | 'Concluído';
export type TaskStatus = 'Concluído' | 'Em Andamento' | 'Planejado';

// Novo tipo para status de tarefa (sub-ação)
export type SubTaskStatus = 'Não Iniciado' | 'Em Andamento' | 'Concluído';

export interface Action {
    id: number | string;
    action: string;
    responsible: string;
    sector: string;
    startDate: string;
    endDate: string;
    status: TaskStatus;
    followUp: string;
    tasks?: Task[]; // Array opcional de tarefas
}

export interface ProcessedAction extends Action {
    delayStatus: DelayStatus;
}

// Nova interface para Tarefa (sub-ação)
export interface Task {
    id: string;
    actionId: number | string;
    action: string; // Título/descrição da tarefa
    responsible: string;
    sector: string;
    status: SubTaskStatus;
    startDate: string;
    endDate: string;
    order: number;
    followUp?: string; // Acompanhamentos/Observações da tarefa
    createdAt?: string;
    updatedAt?: string;
}

// Interface para cálculo de progresso de ação baseado em tarefas
export interface ActionProgress {
    total: number;
    completed: number;
    percentage: number;
}

export interface PlanMetadata {
    id: string;
    name: string;
    pa_code: string;
    subtitle: string;
    icon: ReactElement;
    link: string;
}

export interface PlanFromDB {
    id: string;
    name: string;
    pa_code: string;
    subtitle: string;
    link: string;
}

export interface Plan extends PlanFromDB {
    icon: ReactElement;
}
