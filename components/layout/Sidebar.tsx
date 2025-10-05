import React from 'react';
import { Page } from '../../App';
import { DashboardIcon, BookOpenIcon, CalendarIcon, SchoolIcon, LightbulbIcon, UsersIcon, UserCircleIcon, QuestionMarkCircleIcon, BrainIcon, GraduationCapIcon } from '../IconComponents';

interface SidebarProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavItem: React.FC<{
  label: Page;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`w-full flex items-center p-3 rounded-xl font-bold transition-colors duration-200 ${
        isActive ? 'bg-secondary/10 text-secondary' : 'text-slate-500 hover:bg-slate-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const navItems: { label: Page; icon: React.ReactNode }[] = [
    { label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6 mr-3" /> },
    { label: 'Learn', icon: <BookOpenIcon className="w-6 h-6 mr-3" /> },
    { label: 'Timetable', icon: <CalendarIcon className="w-6 h-6 mr-3" /> },
    { label: 'Core', icon: <SchoolIcon className="w-6 h-6 mr-3" /> },
    { label: 'Skills', icon: <LightbulbIcon className="w-6 h-6 mr-3" /> },
    { label: 'Connect', icon: <UsersIcon className="w-6 h-6 mr-3" /> },
    { label: 'UniFrog', icon: <GraduationCapIcon className="w-6 h-6 mr-3" /> },
    { label: 'Stress Relief', icon: <BrainIcon className="w-6 h-6 mr-3" /> },
  ];
  
  const bottomNavItems: { label: Page; icon: React.ReactNode }[] = [
    { label: 'Profile', icon: <UserCircleIcon className="w-6 h-6 mr-3" /> },
    { label: 'Help', icon: <QuestionMarkCircleIcon className="w-6 h-6 mr-3" /> },
  ]

  return (
    <aside className="w-64 bg-white/60 backdrop-blur-lg flex-shrink-0 p-6 flex flex-col justify-between border-r border-slate-200/80">
      <div>
        <div className="flex items-center space-x-2 mb-10">
          <GraduationCapIcon className="w-10 h-10 text-secondary" />
          <span className="text-xl font-heading font-extrabold text-secondary">IB Mastery Hub</span>
        </div>
        <nav>
          <ul className="space-y-2">
            {navItems.map(item => (
              <NavItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                isActive={activePage === item.label}
                onClick={() => setActivePage(item.label)}
              />
            ))}
          </ul>
        </nav>
      </div>
      <nav>
        <ul className="space-y-2">
             {bottomNavItems.map(item => (
              <NavItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                isActive={activePage === item.label}
                onClick={() => setActivePage(item.label)}
              />
            ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;