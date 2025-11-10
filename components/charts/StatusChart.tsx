
import React, { useMemo } from 'react';
import { Info } from 'lucide-react';
import { ProcessedAction } from '../../types';

interface StatusChartProps {
    data: ProcessedAction[];
}

const StatusChart: React.FC<StatusChartProps> = ({ data }) => {
    const chartData = useMemo(() => {
        const counts = data.reduce((acc, item) => {
            acc[item.delayStatus] = (acc[item.delayStatus] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);
        
        // Ordem específica: Concluído, No Prazo, Em Atraso (último)
        const order = ['Concluído', 'No Prazo', 'Em Atraso'];
        return order
            .filter(key => counts[key] > 0)
            .map(key => ({ 
                name: key, 
                value: counts[key],
                percentage: ((counts[key] / data.length) * 100).toFixed(0)
            }));
    }, [data]);

    const COLORS: { [key: string]: string } = { 
        'Em Atraso': '#ef4444', 
        'No Prazo': '#0ea5e9', 
        'Concluído': '#22c55e' 
    };

    const DARK_COLORS: { [key: string]: string } = { 
        'Em Atraso': '#dc2626', 
        'No Prazo': '#0284c7', 
        'Concluído': '#16a34a' 
    };

    const BG_COLORS: { [key: string]: string } = { 
        'Em Atraso': '#fee2e2', 
        'No Prazo': '#e0f2fe', 
        'Concluído': '#dcfce7' 
    };

    const DARK_BG_COLORS: { [key: string]: string } = { 
        'Em Atraso': '#7f1d1d', 
        'No Prazo': '#075985', 
        'Concluído': '#14532d' 
    };

    const ICONS: { [key: string]: string } = {
        'Concluído': '●',
        'Em Atraso': '●',
        'No Prazo': '●'
    };

    const ICON_COLORS: { [key: string]: string } = {
        'Concluído': '#22c55e',
        'Em Atraso': '#ef4444',
        'No Prazo': '#0ea5e9'
    };

    const total = data.length;

    return (
        <div className="p-4 sm:p-6 transition-colors duration-300">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-2 transition-colors duration-300">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400"/>
                Status Geral das Ações ({total})
            </h3>
            
            <div className="space-y-4">
                {chartData.map((item) => (
                    <div key={item.name} className="space-y-2">
                        {/* Label e Valores */}
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                <span className="text-2xl" style={{ color: ICON_COLORS[item.name] }}>{ICONS[item.name]}</span>
                                {item.name}
                            </span>
                            <span className="font-bold text-gray-900 dark:text-gray-100">
                                {item.value} ({item.percentage}%)
                            </span>
                        </div>
                        
                        {/* Barra de Progresso */}
                        <div className="relative w-full h-8 rounded-lg overflow-hidden"
                             style={{ 
                                 backgroundColor: 'var(--bg-color)',
                                 '--bg-color': `light-dark(${BG_COLORS[item.name]}, ${DARK_BG_COLORS[item.name]})`
                             } as React.CSSProperties}>
                            <div 
                                className="h-full rounded-lg transition-all duration-500 ease-out flex items-center justify-end pr-3"
                                style={{ 
                                    width: `${item.percentage}%`,
                                    backgroundColor: 'var(--bar-color)',
                                    '--bar-color': `light-dark(${COLORS[item.name]}, ${DARK_COLORS[item.name]})`
                                } as React.CSSProperties}
                            >
                                <span className="text-white font-bold text-xs drop-shadow-md">
                                    {item.percentage}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Legenda resumida */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap gap-4 justify-center text-xs text-gray-600 dark:text-gray-400">
                    {chartData.map((item) => (
                        <div key={item.name} className="flex items-center gap-2">
                            <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: COLORS[item.name] }}
                            />
                            <span>{item.name}: {item.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatusChart;
