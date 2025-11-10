
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Users } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ProcessedAction } from '../../types';

interface ResponsibleChartProps {
    data: ProcessedAction[];
}

const ResponsibleChart: React.FC<ResponsibleChartProps> = ({ data }) => {
    const { theme } = useTheme();
    const chartData = useMemo(() => {
        const counts = data.reduce((acc, item) => {
            if (!acc[item.responsible]) {
                acc[item.responsible] = { 'Em Atraso': 0, 'No Prazo': 0, 'Concluído': 0 };
            }
            acc[item.responsible][item.delayStatus]++;
            return acc;
        }, {} as Record<string, Record<string, number>>);
        return Object.keys(counts).map(key => ({ name: key, ...counts[key] }));
    }, [data]);

    return (
        <div className="p-4 sm:p-6 transition-colors duration-300">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2 transition-colors duration-300">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400"/>Ações por Responsável
            </h3>
            <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                    <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                        <XAxis type="number" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                        <YAxis dataKey="name" type="category" width={100} stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} tick={{fontSize: 12}} />
                        <Tooltip 
                            cursor={{ fill: theme === 'dark' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(203, 213, 225, 0.3)' }}
                            contentStyle={{ 
                                background: theme === 'dark' ? '#1e293b' : '#ffffff', 
                                borderColor: theme === 'dark' ? '#334155' : '#e2e8f0', 
                                borderRadius: '0.5rem' 
                            }}
                        />
                        <Legend wrapperStyle={{paddingTop: '20px'}}/>
                        <Bar dataKey="Em Atraso" stackId="a" fill="#ef4444" />
                        <Bar dataKey="No Prazo" stackId="a" fill="#0ea5e9" />
                        <Bar dataKey="Concluído" stackId="a" fill="#22c55e" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ResponsibleChart;
