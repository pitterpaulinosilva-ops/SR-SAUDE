
import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ProcessedAction } from '../../types';

interface StatusChartProps {
    data: ProcessedAction[];
}

const StatusChart: React.FC<StatusChartProps> = ({ data }) => {
    const { theme } = useTheme();
    const chartData = useMemo(() => {
        const counts = data.reduce((acc, item) => {
            acc[item.delayStatus] = (acc[item.delayStatus] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
    }, [data]);

    const COLORS: { [key: string]: string } = { 'Em Atraso': '#ef4444', 'No Prazo': '#0ea5e9', 'Concluído': '#22c55e' };
    const total = data.length;

    return (
        <div className="p-4 sm:p-6 transition-colors duration-300">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2 transition-colors duration-300">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400"/>Status Geral das Ações ({total})
            </h3>
            <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Tooltip 
                            contentStyle={{ 
                                background: theme === 'dark' ? '#1e293b' : '#ffffff', 
                                borderColor: theme === 'dark' ? '#334155' : '#e2e8f0', 
                                borderRadius: '0.5rem' 
                            }} 
                            formatter={(value: number) => `${value} (${((value/total)*100).toFixed(1)}%)`} 
                        />
                        <Legend iconType="circle" />
                        <Pie data={chartData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name">
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default StatusChart;
