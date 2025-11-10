import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public readonly props: Props;
    
    public state: State = {
        hasError: false
    };
    
    constructor(props: Props) {
        super(props);
        this.props = props;
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        // Aqui você pode enviar para um serviço de monitoramento
        // como Sentry, LogRocket, etc.
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 p-4">
                    <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 text-center">
                        <div className="mb-6">
                            <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                Ops! Algo deu errado
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                Encontramos um erro inesperado. Não se preocupe, seus dados estão seguros.
                            </p>
                        </div>
                        
                        {this.state.error && (
                            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
                                <p className="text-sm font-mono text-red-800 dark:text-red-300 break-all">
                                    {this.state.error.message}
                                </p>
                            </div>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => window.location.reload()}
                                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
                            >
                                Recarregar Página
                            </button>
                            <button
                                onClick={() => window.location.href = '/'}
                                className="flex-1 px-6 py-3 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-all duration-300 font-medium"
                            >
                                Ir para Início
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
