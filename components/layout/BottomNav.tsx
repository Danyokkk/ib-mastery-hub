import React from 'react';
import { Page } from '../../App';
import { DashboardIcon, BookOpenIcon, CalendarIcon, UsersIcon, BrainIcon } from '../IconComponents';

interface BottomNavProps {
    activePage: Page;
    setActivePage: (page: Page) => void;
}

const NavItem: React.FC<{
    label: Page;
    icon: React.ReactNode;
    isActive: boolean;
    onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center flex-1 transition-colors duration-200 ${isActive ? 'text-secondary' : 'text-slate-400'}`}>
        {icon}
        <span className="text-xs font-bold mt-1">{label}</span>
    </button>
)

const BottomNav: React.FC<BottomNavProps> = ({ activePage, setActivePage }) => {
    const navItems: { label: Page, icon: React.ReactNode }[] = [
        { label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
        { label: 'Learn', icon: <BookOpenIcon className="w-6 h-6" /> },
        { label: 'Timetable', icon: <CalendarIcon className="w-6 h-6" /> },
        { label: 'Connect', icon: <UsersIcon className="w-6 h-6" /> },
        { label: 'Stress Relief', icon: <BrainIcon className="w-6 h-6" /> },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md shadow-soft-top flex items-center justify-around px-2 border-t border-slate-200/80 z-20">
            {navItems.map(item => (
                <NavItem 
                    key={item.label}
                    label={item.label}
                    icon={item.icon}
                    isActive={activePage === item.label}
                    onClick={() => setActivePage(item.label)}
                />
            ))}
        </div>
    )
}

export default BottomNav;