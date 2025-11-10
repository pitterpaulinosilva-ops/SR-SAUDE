
import { useState, useEffect } from 'react';
import { plansMetadata } from '../constants';
import { Plan } from '../types';

export const usePlans = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        // Simula uma busca de dados assíncrona com os dados locais
        const timer = setTimeout(() => {
            try {
                setPlans(plansMetadata);
                setLoading(false);
            } catch (e) {
                setError("Falha ao carregar os dados locais dos planos.");
                setLoading(false);
            }
        }, 500); // Atraso para simular o carregamento

        return () => clearTimeout(timer);
    }, []);

    return { plans, loading, error };
}