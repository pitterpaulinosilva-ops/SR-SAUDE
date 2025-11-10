import React from 'react';
import { Target, ShieldCheck, Leaf } from 'lucide-react';
import { PlanMetadata, Action } from './types';

export const plansMetadata: PlanMetadata[] = [
    { id: 'saude_ona', name: 'Sáude (ONA)', pa_code: '10717', subtitle: 'Rumo à Acreditação ONA', icon: <Target className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white"/>, link: 'https://sistemafiea.sysepa.com.br/epa/incluir_plano_acao.php?codigo=10717' },
    { id: 'sst_iso45001', name: 'SST (ISO 45001)', pa_code: '12451', subtitle: 'Certificação em Saúde e Segurança', icon: <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white"/>, link: 'https://sistemafiea.sysepa.com.br/epa/incluir_plano_acao.php?codigo=12451' },
    { id: 'ambiental_iso14001', name: 'Ambiental (ISO 14001)', pa_code: '13880', subtitle: 'Certificação em Gestão Ambiental', icon: <Leaf className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white"/>, link: 'https://sistemafiea.sysepa.com.br/epa/incluir_plano_acao.php?codigo=13880' },
];

export const allSampleData: Record<string, Action[]> = {
    saude_ona: [
        { id: 1, action: "Definir e aprovar a Política de Segurança do Paciente", responsible: "Ana Lima", sector: "Qualidade", startDate: "2024-05-10", endDate: "2024-06-15", status: "Concluído", followUp: "Política aprovada pela diretoria em 10/06. Documentação arquivada no sistema de gestão da qualidade." },
        { id: 2, action: "Treinar equipes no novo protocolo de higiene das mãos", responsible: "Carlos Souza", sector: "Enfermagem", startDate: "2024-06-01", endDate: "2024-07-25", status: "Em Andamento", followUp: "Treinamento realizado com 80% da equipe de enfermagem. Próxima sessão agendada para 15/07." },
        { id: 3, action: "Implementar checklist de cirurgia segura", responsible: "Mariana Costa", sector: "Centro Cirúrgico", startDate: "2024-06-05", endDate: "2024-07-20", status: "Em Andamento", followUp: "Checklist em fase piloto. Feedback inicial coletado e ajustes sendo realizados." },
    ],
    sst_iso45001: [
        { id: 1, action: "Realizar diagnóstico de perigos e riscos", responsible: "Mariana Alves", sector: "SST", startDate: "2024-06-01", endDate: "2024-07-30", status: "Em Andamento", followUp: "Mapeamento de riscos concluído em 5 dos 8 setores. Próximos passos: consolidação do relatório." },
        { id: 2, action: "Formar a Comissão Interna de Prevenção de Acidentes (CIPA)", responsible: "João Ferreira", sector: "RH", startDate: "2024-05-15", endDate: "2024-06-20", status: "Concluído", followUp: "Membros da CIPA eleitos e empossados. Reuniões mensais agendadas." },
        { id: 3, action: "Adquirir Equipamentos de Proteção Individual (EPIs)", responsible: "Carlos Rodrigues", sector: "Compras", startDate: "2024-07-01", endDate: "2024-08-15", status: "Planejado", followUp: "Levantamento de necessidades de EPIs em andamento junto aos setores." },
    ],
    ambiental_iso14001: [
        { id: 1, action: "Elaborar a Política de Gestão Ambiental", responsible: "Sofia Bernardes", sector: "Sustentabilidade", startDate: "2024-06-10", endDate: "2024-07-10", status: "Concluído", followUp: "Política elaborada, aprovada e comunicada a todos os colaboradores." },
        { id: 2, action: "Mapear aspectos e impactos ambientais", responsible: "Ricardo Gomes", sector: "Engenharia", startDate: "2024-07-11", endDate: "2024-09-20", status: "Em Andamento", followUp: "Levantamento de campo iniciado. Foco inicial em consumo de água e energia." },
        { id: 3, action: "Criar programa de coleta seletiva e gestão de resíduos", responsible: "Ana Pereira", sector: "Operações", startDate: "2024-08-01", endDate: "2024-10-30", status: "Planejado", followUp: "Orçamentos para coletores e parceiros de reciclagem sendo analisados." },
    ]
};