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
    Trash2,
    ExternalLink,
    Bot
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

    // Carrega API key do localStorage ou variáveis de ambiente
    useEffect(() => {
        try {
            // Tenta carregar do localStorage primeiro
            const savedKey = localStorage.getItem('ai_api_key');
            const savedProvider = localStorage.getItem('ai_provider') as 'gemini' | 'gpt';
            
            if (savedKey) {
                setApiKey(savedKey);
            } else {
                // Se não houver no localStorage, tenta carregar das variáveis de ambiente
                const envGeminiKey = process.env.GEMINI_API_KEY;
                const envOpenAIKey = process.env.OPENAI_API_KEY;
                
                if (envGeminiKey) {
                    setApiKey(envGeminiKey);
                    setApiProvider('gemini');
                } else if (envOpenAIKey) {
                    setApiKey(envOpenAIKey);
                    setApiProvider('gpt');
                }
            }
            
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
        } catch (error: any) {
            console.error('AI API Error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: `Desculpe, ocorreu um erro ao processar sua solicitação: ${error.message || 'Erro desconhecido'}. Verifique sua API Key e tente novamente.`,
                timestamp: new Date()
            };
            setMessages((prev: Message[]) => [...prev, errorMessage]);
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
        console.log('Calling Gemini API with key:', apiKey.substring(0, 10) + '...');
        
        // Usando v1 ao invés de v1beta e gemini-1.5-flash ao invés de gemini-pro
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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
            const errorData = await response.json();
            console.error('Gemini API Error Response:', errorData);
            throw new Error(`Gemini API error: ${errorData.error?.message || response.statusText}`);
        }

        const data = await response.json();
        console.log('Gemini API Response:', data);
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
        <div className="h-full flex flex-col bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 p-6 overflow-y-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                    <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Assistentes de Insight
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                    Utilize assistentes de IA externos para análise avançada dos seus planos de ação
                </p>
            </div>

            {/* Assistentes Externos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
                {/* Gemini */}
                <a
                    href="https://gemini.google.com/gem/1ZiPvbSuE3Tzw3SBmm8MYzo5vwIp63uEK?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-blue-500 dark:hover:border-blue-400 hover:-translate-y-1"
                >
                    {/* Badge "Externo" */}
                    <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                            <ExternalLink className="w-3 h-3" />
                            Externo
                        </span>
                    </div>

                    {/* Logo/Ícone */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                Google Gemini
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Assistente Google AI
                            </p>
                        </div>
                    </div>

                    {/* Descrição */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        Análise avançada com o modelo Gemini do Google. Ideal para insights profundos e análise contextual de dados complexos.
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                            Análise Contextual
                        </span>
                        <span className="px-2 py-1 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded-full">
                            Multimodal
                        </span>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                            Abrir Gemini
                        </span>
                        <ExternalLink className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                </a>

                {/* Copilot */}
                <a
                    href="https://m365.cloud.microsoft:443/chat/?titleId=T_df29d454-c320-94e1-cb7a-f6092227a223&source=embedded-builder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500 dark:hover:border-green-400 hover:-translate-y-1"
                >
                    {/* Badge "Externo" */}
                    <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                            <ExternalLink className="w-3 h-3" />
                            Externo
                        </span>
                    </div>

                    {/* Logo/Ícone */}
                    <div className="flex items-center gap-4 mb-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                            <Bot className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                                Microsoft Copilot
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Assistente Microsoft 365
                            </p>
                        </div>
                    </div>

                    {/* Descrição */}
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        Assistente integrado ao Microsoft 365. Perfeito para análise de dados corporativos e integração com ferramentas Microsoft.
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded-full">
                            M365 Integrado
                        </span>
                        <span className="px-2 py-1 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 text-xs rounded-full">
                            Corporativo
                        </span>
                    </div>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
                        <span className="text-sm font-medium text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300">
                            Abrir Copilot
                        </span>
                        <ExternalLink className="w-4 h-4 text-green-600 dark:text-green-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                </a>
            </div>

            {/* Info Footer */}
            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 max-w-4xl mx-auto w-full">
                <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                        <div className="w-8 h-8 bg-blue-500 dark:bg-blue-600 rounded-lg flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">
                            💡 Dica de Uso
                        </h4>
                        <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                            Estes assistentes externos foram configurados especificamente para análise de planos de ação. 
                            Eles têm contexto sobre seus dados e podem fornecer insights valiosos sobre status, prazos e responsabilidades.
                        </p>
                    </div>
                </div>
            </div>

            {/* Assistente Interno (Em Desenvolvimento) */}
            <div className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-600 max-w-4xl mx-auto w-full">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-slate-700 rounded-xl mb-3">
                        <Bot className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                    </div>
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                        Assistente Interno
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Chat integrado em desenvolvimento
                    </p>
                    <div className="mt-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded-full">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            Em breve
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AIAssistant;
