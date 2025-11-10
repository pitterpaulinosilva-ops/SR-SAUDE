import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Sidebar from '../Sidebar';

describe('Sidebar Component', () => {
    const mockOnTabChange = jest.fn();

    beforeEach(() => {
        mockOnTabChange.mockClear();
    });

    it('renderiza todos os itens do menu', () => {
        render(<Sidebar activeTab="plan" onTabChange={mockOnTabChange} />);
        
        expect(screen.getByText('Plano de Ação')).toBeInTheDocument();
        expect(screen.getByText('Ações por Responsável')).toBeInTheDocument();
        expect(screen.getByText('Ações por Setor')).toBeInTheDocument();
    });

    it('destaca o item ativo', () => {
        render(<Sidebar activeTab="plan" onTabChange={mockOnTabChange} />);
        
        const activeButton = screen.getByRole('button', { name: /Plano de Ação/i });
        expect(activeButton).toHaveClass('from-blue-600');
        expect(activeButton).toHaveAttribute('aria-current', 'page');
    });

    it('chama onTabChange quando um item é clicado', () => {
        render(<Sidebar activeTab="plan" onTabChange={mockOnTabChange} />);
        
        const responsibleButton = screen.getByRole('button', { name: /Ações por Responsável/i });
        fireEvent.click(responsibleButton);
        
        expect(mockOnTabChange).toHaveBeenCalledWith('responsible');
        expect(mockOnTabChange).toHaveBeenCalledTimes(1);
    });

    it('renderiza o botão de toggle em mobile', () => {
        render(<Sidebar activeTab="plan" onTabChange={mockOnTabChange} />);
        
        const toggleButton = screen.getByLabelText(/Abrir menu/i);
        expect(toggleButton).toBeInTheDocument();
    });

    it('abre e fecha a sidebar em mobile', () => {
        render(<Sidebar activeTab="plan" onTabChange={mockOnTabChange} />);
        
        const toggleButton = screen.getByLabelText(/Abrir menu/i);
        
        // Abre
        fireEvent.click(toggleButton);
        expect(screen.getByLabelText(/Fechar menu/i)).toBeInTheDocument();
        
        // Fecha
        fireEvent.click(screen.getByLabelText(/Fechar menu/i));
        expect(screen.getByLabelText(/Abrir menu/i)).toBeInTheDocument();
    });

    it('renderiza ícones para cada item', () => {
        const { container } = render(<Sidebar activeTab="plan" onTabChange={mockOnTabChange} />);
        
        // Verifica se há ícones SVG
        const icons = container.querySelectorAll('svg');
        expect(icons.length).toBeGreaterThan(0);
    });

    it('tem acessibilidade adequada', () => {
        render(<Sidebar activeTab="plan" onTabChange={mockOnTabChange} />);
        
        const nav = screen.getByRole('complementary');
        expect(nav).toHaveAttribute('aria-label', 'Menu de navegação');
        
        const buttons = screen.getAllByRole('button');
        buttons.forEach(button => {
            expect(button).toHaveAttribute('aria-label');
        });
    });

    it('exibe descrições dos itens', () => {
        render(<Sidebar activeTab="plan" onTabChange={mockOnTabChange} />);
        
        expect(screen.getByText('Visualizar todas as ações')).toBeInTheDocument();
        expect(screen.getByText('Agrupar por responsável')).toBeInTheDocument();
        expect(screen.getByText('Agrupar por setor')).toBeInTheDocument();
    });
});
