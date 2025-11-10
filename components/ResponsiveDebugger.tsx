/**
 * ResponsiveDebugger Component
 * 
 * Componente de debug para visualizar breakpoints ativos durante o desenvolvimento.
 * Mostra o breakpoint atual e dimensões da tela.
 * 
 * USO: Adicione ao App.tsx apenas em desenvolvimento
 * 
 * @component
 */

import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

const ResponsiveDebugger: React.FC = () => {
    const [dimensions, setDimensions] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getBreakpoint = () => {
        const width = dimensions.width;
        if (width < 640) return { name: 'xs', label: 'Mobile', icon: <Smartphone className="w-4 h-4" />, color: 'bg-red-500' };
        if (width < 768) return { name: 'sm', label: 'Mobile L', icon: <Smartphone className="w-4 h-4" />, color: 'bg-orange-500' };
        if (width < 1024) return { name: 'md', label: 'Tablet', icon: <Tablet className="w-4 h-4" />, color: 'bg-yellow-500' };
        if (width < 1280) return { name: 'lg', label: 'Tablet L', icon: <Tablet className="w-4 h-4" />, color: 'bg-green-500' };
        if (width < 1536) return { name: 'xl', label: 'Desktop', icon: <Monitor className="w-4 h-4" />, color: 'bg-blue-500' };
        return { name: '2xl', label: 'Large Desktop', icon: <Monitor className="w-4 h-4" />, color: 'bg-purple-500' };
    };

    const breakpoint = getBreakpoint();

    // Só mostra em desenvolvimento
    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-[9999] pointer-events-none">
            <div className="bg-black/90 text-white rounded-lg shadow-2xl p-3 backdrop-blur-sm border border-white/20">
                <div className="flex items-center gap-3">
                    {/* Ícone e Breakpoint */}
                    <div className={`${breakpoint.color} p-2 rounded-md flex items-center justify-center`}>
                        {breakpoint.icon}
                    </div>
                    
                    {/* Info */}
                    <div className="text-xs">
                        <div className="font-bold">{breakpoint.label}</div>
                        <div className="text-gray-300">
                            {breakpoint.name} • {dimensions.width}x{dimensions.height}
                        </div>
                    </div>
                </div>

                {/* Grid Indicator */}
                <div className="mt-2 pt-2 border-t border-white/20 text-xs text-gray-300">
                    <div className="flex items-center justify-between gap-4">
                        <span>Grid:</span>
                        <span className="font-mono">
                            {dimensions.width < 640 && '1 col'}
                            {dimensions.width >= 640 && dimensions.width < 1024 && '2 cols'}
                            {dimensions.width >= 1024 && dimensions.width < 1280 && '2 cols'}
                            {dimensions.width >= 1280 && dimensions.width < 1536 && '3 cols'}
                            {dimensions.width >= 1536 && '4 cols'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveDebugger;
