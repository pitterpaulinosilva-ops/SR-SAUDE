
import { ReactElement } from 'react';

export type DelayStatus = 'Em Atraso' | 'No Prazo' | 'Concluído';
export type TaskStatus = 'Concluído' | 'Em Andamento' | 'Planejado';

export interface Action {
    id: number | string;
    action: string;
    responsible: string;
    sector: string;
    startDate: string;
    endDate: string;
    status: TaskStatus;
    followUp: string;
}

export interface ProcessedAction extends Action {
    delayStatus: DelayStatus;
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
