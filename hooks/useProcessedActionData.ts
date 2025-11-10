
import { useState, useEffect } from 'react';
import { allSampleData } from '../constants';
import { ProcessedAction, DelayStatus, Action } from '../types';

export const useProcessedActionData = (planId: string | null) => {
    const [actions, setActions] = useState<ProcessedAction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!planId) {
            setLoading(false);
            setActions([]);
            return;
        }

        setLoading(true);
        // Simula uma busca de dados assíncrona com os dados locais
        const timer = setTimeout(() => {
            const actionsData: Action[] = allSampleData[planId] || [];
            
            const processedData = actionsData.map(item => {
                const today = new Date(); 
                today.setHours(0, 0, 0, 0);
                
                const endDate = new Date(item.endDate + 'T00:00:00-03:00');
                
                let delayStatus: DelayStatus = 'No Prazo';
                if (item.status === 'Concluído') {
                    delayStatus = 'Concluído';
                } else if (today > endDate) {
                    delayStatus = 'Em Atraso';
                }
                
                return { ...item, delayStatus };
            });

            setActions(processedData);
            setLoading(false);
        }, 300); // Atraso menor para carregar as ações

        return () => clearTimeout(timer);
    }, [planId]);

    return { data: actions, loading };
};