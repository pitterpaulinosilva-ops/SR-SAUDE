/**
 * AI Assistant Component
 * 
 * Assistente de Insight com IA para análise de ações do Status Report.
 * Interface estilo ChatGPT com suporte a Gemini e GPT APIs.
 * 
 * Características:
 * - Interface de chat interativa
 * - Configuração de API Key (Gemini/GPT)
 * - Análise contextual das ações
 * - Histórico de conversas
 * - Suporte a temas claro/escuro
 * 
 * @component
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
    Send, 
    Settings, 
    Key, 
    Sparkles,
    Loader2,
    X,
    Save,
    Trash2
} from 'lucide-react';
import { ProcessedAction } from '../types';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface AIAssistantProps {
    actions: ProcessedAction[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ actions }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    
    // Configurações de API
    const [apiProvider, setApiProvider] = useState<'gemini' | 'gpt'>('gemini');
    const [apiKey, setApiKey] = useState('');
    const [tempApiKey, setTempApiKey] = useState('');
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Carrega API key do localStorage
    useEffect(() => {
        try {
            const savedKey = localStorage.getItem('ai_api_key');
            const savedProvider = localStorage.getItem('ai_provider') as 'gemini' | 'gpt';
            if (savedKey) setApiKey(savedKey);
            if (savedProvider) setApiProvider(savedProvider);
        } catch (error) {
            console.warn('Failed to load API settings');
        }
    }, []);

    // Auto-scroll para última mensagem
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Salva API key
    const saveApiKey = () => {
        try {
            localStorage.setItem('ai_api_key', tempApiKey);
            localStorage.setItem('ai_provider', apiProvider);
            setApiKey(tempApiKey);
            setShowSettings(false);
        } catch (error) {
            console.error('Failed to save API key');
        }
    };

    // Limpa histórico
    const clearHistory = () => {
        setMessages([]);
    };

    // Envia mensagem
    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        if (!apiKey) {
            alert('Por favor, configure sua API Key nas configurações');
            setShowSettings(true);
            return;
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Prepara contexto das ações
            const actionsContext = actions.map(action => ({
                id: action.id,
                action: action.action,
                responsible: action.responsible,
                sector: action.sector,
                status: action.delayStatus,
                deadline: action.deadline
            }));

            const response = await callAI(userMessage.content, actionsContext);

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Desculpe, ocorreu um erro ao processar sua solicitação. Verifique sua API Key e tente novamente.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // Chama API de IA
    const callAI = async (prompt: string, context: any[]): Promise<string> => {
        const systemPrompt = `Você é um assistente especializado em análise de planos de ação e status reports. 
Você tem acesso aos seguintes dados de ações:
${JSON.stringify(context, null, 2)}

Analise os dados e responda às perguntas do usuário de forma clara e objetiva, fornecendo insights úteis sobre as ações, responsáveis, setores, prazos e status.`;

        if (apiProvider === 'gemini') {
            return await callGemini(systemPrompt, prompt);
        } else {
            return await callGPT(systemPrompt, prompt);
        }
    };

    // Chama Gemini API
    const callGemini = async (systemPrompt: string, userPrompt: string): Promise<string> => {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `${systemPrompt}\n\nUsuário: ${userPrompt}`
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error('Gemini API error');
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    };

    // Chama GPT API
    const callGPT = async (systemPrompt: string, userPrompt: string): Promise<string> => {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('GPT API error');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    };

    // Handle Enter key
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="h-full flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-slate-700 bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-6 h-6 text-white" />
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            Assistente de Insight
                        </h2>
                        <p className="text-xs text-blue-100">
                            Powered by {apiProvider === 'gemini' ? 'Gemini' : 'GPT'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={clearHistory}
                        className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors duration-300"
                        title="Limpar histórico"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className="p-2 rounded-lg text-white hover:bg-white/20 transition-colors duration-300"
                        title="Configurações"
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Settings Panel */}
            {showSettings && (
                <div className="p-4 bg-blue-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Provedor de IA
                            </label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setApiProvider('gemini')}
                                    className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                                        apiProvider === 'gemini'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    Gemini
                                </button>
                                <button
                                    onClick={() => setApiProvider('gpt')}
                                    className={`flex-1 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                                        apiProvider === 'gpt'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    GPT
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                API Key
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="password"
                                        value={tempApiKey}
                                        onChange={(e) => setTempApiKey(e.target.value)}
                                        placeholder={`Cole sua ${apiProvider === 'gemini' ? 'Gemini' : 'OpenAI'} API Key`}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                                    />
                                </div>
                                <button
                                    onClick={saveApiKey}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    Salvar
                                </button>
                            </div>
                            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                {apiProvider === 'gemini' 
                                    ? 'Obtenha sua chave em: https://makersuite.google.com/app/apikey'
                                    : 'Obtenha sua chave em: https://platform.openai.com/api-keys'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <Sparkles className="w-16 h-16 text-blue-500 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            Bem-vindo ao Assistente de Insight!
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
                            Faça perguntas sobre as ações do Status Report. Posso ajudar com análises, 
                            identificar gargalos, sugerir prioridades e muito mais.
                        </p>
                        {!apiKey && (
                            <button
                                onClick={() => setShowSettings(true)}
                                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                            >
                                Configurar API Key
                            </button>
                        )}
                    </div>
                ) : (
                    <>
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg p-3 ${
                                        message.role === 'user'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 dark:bg-slate-700 text-gray-900 dark:text-gray-100'
                                    }`}
                                >
                                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    <p className="text-xs mt-1 opacity-70">
                                        {message.timestamp.toLocaleTimeString('pt-BR', { 
                                            hour: '2-digit', 
                                            minute: '2-digit' 
                                        })}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 dark:bg-slate-700 rounded-lg p-3">
                                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                                </div>
                            </div>
                        )}
                    </>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900">
                <div className="flex gap-2">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Digite sua pergunta sobre as ações..."
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors duration-300"
                        rows={2}
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={isLoading || !input.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center gap-2"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Send className="w-5 h-5" />
                        )}
                    </button>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                    Pressione Enter para enviar • Shift+Enter para nova linha
                </p>
            </div>
        </div>
    );
};

export default AIAssistant;
