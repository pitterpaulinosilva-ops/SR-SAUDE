
import React, { useState, useContext, createContext } from 'react';

interface TabsContextType {
    activeTab: string;
    setActiveTab: (tabValue: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
    defaultValue: string;
    value?: string;
    onValueChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, value, onValueChange, children, className }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);
    const isControlled = value !== undefined;
    const currentTab = isControlled ? value : activeTab;

    const setCurrentTab = (tabValue: string) => {
        if (!isControlled) setActiveTab(tabValue);
        if (onValueChange) onValueChange(tabValue);
    };

    return (
        <TabsContext.Provider value={{ activeTab: currentTab, setActiveTab: setCurrentTab }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
};

interface TabsListProps {
    children: React.ReactNode;
    className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => (
    <div className={className}>{children}</div>
);

interface TabsTriggerProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className }) => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('TabsTrigger must be used within a Tabs component');
    }
    const { activeTab, setActiveTab } = context;
    const isActive = activeTab === value;
    return <button onClick={() => setActiveTab(value)} className={`${className} transition-colors duration-300 ${isActive ? 'data-[state=active]' : ''}`} data-state={isActive ? 'active' : 'inactive'}>{children}</button>;
};

interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className }) => {
    const context = useContext(TabsContext);
     if (!context) {
        throw new Error('TabsContent must be used within a Tabs component');
    }
    const { activeTab } = context;
    return activeTab === value ? <div className={className}>{children}</div> : null;
};
