
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Building } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ProcessedAction } from '../../types';

interface SectorChartProps {
    data: ProcessedAction[];
}

const SectorChart: React.FC<SectorChartProps> = ({ data }) => {
    const { theme } = useTheme();
    const chartData = useMemo(() => {
        const counts = data.reduce((acc, item) => {
            if (!acc[item.sector]) {
                acc[item.sector] = { 'Em Atraso': 0, 'No Prazo': 0, 'Concluído': 0 };
            }
            acc[item.sector][item.delayStatus]++;
            return acc;
        }, {} as Record<string, Record<string, number>>);
        return Object.keys(counts).map(key => ({ name: key, ...counts[key] }));
    }, [data]);

    return (
        <div className="p-4 sm:p-6 transition-colors duration-300">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2 transition-colors duration-300">
                <Building className="w-5 h-5 text-blue-600 dark:text-blue-400"/>Ações por Setor
            </h3>
            <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer>
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#334155' : '#e2e8f0'} />
                        <XAxis dataKey="name" stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} tick={{fontSize: 12}} />
                        <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#64748b'} />
                        <Tooltip 
                            cursor={{ fill: theme === 'dark' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(203, 213, 225, 0.3)' }} 
                            contentStyle={{ 
                                background: theme === 'dark' ? '#1e293b' : '#ffffff', 
                                borderColor: theme === 'dark' ? '#334155' : '#e2e8f0', 
                                borderRadius: '0.5rem' 
                            }}
                        />
                        <Legend />
                        <Bar dataKey="Em Atraso" stackId="a" fill="#ef4444" />
                        <Bar dataKey="No Prazo" stackId="a" fill="#0ea5e9" />
                        <Bar dataKey="Concluído" stackId="a" fill="#22c55e" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SectorChart;
