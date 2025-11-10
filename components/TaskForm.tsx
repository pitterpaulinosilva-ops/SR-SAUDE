import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Task, SubTaskStatus } from '../types';
import Input from './Input';
import Button from './Button';

interface TaskFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
    initialData?: Task;
    actionDateRange: { start: string; end: string };
}

interface FormErrors {
    action?: string;
    responsible?: string;
    sector?: string;
    startDate?: string;
    endDate?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    actionDateRange
}) => {
    const [formData, setFormData] = useState({
        action: '',
        responsible: '',
        sector: '',
        status: 'Não Iniciado' as SubTaskStatus,
        startDate: actionDateRange.start,
        endDate: actionDateRange.end
    });
    
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Preencher formulário com dados iniciais (modo edição)
    useEffect(() => {
        if (initialData) {
            setFormData({
                action: initialData.action,
                responsible: initialData.responsible,
                sector: initialData.sector,
                status: initialData.status,
                startDate: initialData.startDate,
                endDate: initialData.endDate
            });
        } else {
            // Reset para modo criação
            setFormData({
                action: '',
                responsible: '',
                sector: '',
                status: 'Não Iniciado',
                startDate: actionDateRange.start,
                endDate: actionDateRange.end
            });
        }
        setErrors({});
    }, [initialData, actionDateRange, isOpen]);

    // Validação do formulário
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Validar action
        if (!formData.action.trim()) {
            newErrors.action = 'A descrição da tarefa é obrigatória';
        } else if (formData.action.length > 200) {
            newErrors.action = 'A descrição deve ter no máximo 200 caracteres';
        }

        // Validar responsável
        if (!formData.responsible.trim()) {
            newErrors.responsible = 'O responsável é obrigatório';
        } else if (formData.responsible.length > 100) {
            newErrors.responsible = 'O responsável deve ter no máximo 100 caracteres';
        }

        // Validar setor
        if (!formData.sector.trim()) {
            newErrors.sector = 'O setor é obrigatório';
        } else if (formData.sector.length > 100) {
            newErrors.sector = 'O setor deve ter no máximo 100 caracteres';
        }

        // Validar datas
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);
        const actionStart = new Date(actionDateRange.start);
        const actionEnd = new Date(actionDateRange.end);

        if (startDate < actionStart) {
            newErrors.startDate = 'A data de início deve ser maior ou igual à data de início da ação';
        }

        if (endDate > actionEnd) {
            newErrors.endDate = 'A data de término deve ser menor ou igual à data de término da ação';
        }

        if (endDate < startDate) {
            newErrors.endDate = 'A data de término deve ser maior ou igual à data de início';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit({
                actionId: initialData?.actionId || 0,
                action: formData.action.trim(),
                responsible: formData.responsible.trim(),
                sector: formData.sector.trim(),
                status: formData.status,
                startDate: formData.startDate,
                endDate: formData.endDate,
                order: initialData?.order || 0
            });
            onClose();
        } catch (error) {
            console.error('Error submitting task:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Limpar erro do campo ao editar
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {initialData ? 'Editar Tarefa' : 'Nova Tarefa'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        aria-label="Fechar"
                    >
                        <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Descrição da Tarefa */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Descrição da Tarefa <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="text"
                            value={formData.action}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('action', e.target.value)}
                            placeholder="Ex: Realizar levantamento de dados"
                            className={errors.action ? 'border-red-500' : ''}
                            aria-label="Descrição da tarefa"
                            aria-required="true"
                            aria-invalid={!!errors.action}
                        />
                        {errors.action && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.action}</p>
                        )}
                    </div>

                    {/* Responsável */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Responsável <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="text"
                            value={formData.responsible}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('responsible', e.target.value)}
                            placeholder="Ex: João Silva"
                            className={errors.responsible ? 'border-red-500' : ''}
                            aria-label="Responsável"
                            aria-required="true"
                            aria-invalid={!!errors.responsible}
                        />
                        {errors.responsible && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.responsible}</p>
                        )}
                    </div>

                    {/* Setor */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Setor <span className="text-red-500">*</span>
                        </label>
                        <Input
                            type="text"
                            value={formData.sector}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('sector', e.target.value)}
                            placeholder="Ex: TI"
                            className={errors.sector ? 'border-red-500' : ''}
                            aria-label="Setor"
                            aria-required="true"
                            aria-invalid={!!errors.sector}
                        />
                        {errors.sector && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.sector}</p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Status
                        </label>
                        <select
                            value={formData.status}
                            onChange={(e) => handleChange('status', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            aria-label="Status da tarefa"
                        >
                            <option value="Não Iniciado">Não Iniciado</option>
                            <option value="Em Andamento">Em Andamento</option>
                            <option value="Concluído">Concluído</option>
                        </select>
                    </div>

                    {/* Datas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Data de Início */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Data de Início
                            </label>
                            <Input
                                type="date"
                                value={formData.startDate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('startDate', e.target.value)}
                                min={actionDateRange.start}
                                max={actionDateRange.end}
                                className={errors.startDate ? 'border-red-500' : ''}
                                aria-label="Data de início"
                                aria-invalid={!!errors.startDate}
                            />
                            {errors.startDate && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.startDate}</p>
                            )}
                        </div>

                        {/* Data de Término */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Data de Término
                            </label>
                            <Input
                                type="date"
                                value={formData.endDate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('endDate', e.target.value)}
                                min={actionDateRange.start}
                                max={actionDateRange.end}
                                className={errors.endDate ? 'border-red-500' : ''}
                                aria-label="Data de término"
                                aria-invalid={!!errors.endDate}
                            />
                            {errors.endDate && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.endDate}</p>
                            )}
                        </div>
                    </div>

                    {/* Info sobre período da ação */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                            <strong>Período da Ação:</strong> {new Date(actionDateRange.start + 'T00:00:00-03:00').toLocaleDateString('pt-BR')} até {new Date(actionDateRange.end + 'T00:00:00-03:00').toLocaleDateString('pt-BR')}
                        </p>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Salvando...
                                </>
                            ) : (
                                initialData ? 'Salvar Alterações' : 'Criar Tarefa'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
