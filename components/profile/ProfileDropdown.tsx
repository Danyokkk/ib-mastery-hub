import React, { useState, useRef, useEffect } from 'react';
import { User } from '../../types';
import { Page } from '../../App';
import { LogoutIcon, UserCircleIcon, DashboardIcon, CalendarIcon, SchoolIcon } from '../IconComponents';

interface ProfileDropdownProps {
  user: User;
  onLogout: () => void;
  setActivePage: (page: Page) => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, onLogout, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (page: Page) => {
    setActivePage(page);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="w-12 h-12 rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
        <img src={user.avatarUrl} alt="User avatar" className="w-full h-full object-cover" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-soft-md py-2 z-10">
           <div className="px-4 py-2 border-b">
                <p className="font-bold text-sm text-text-neutral">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
            </div>
            <div className="py-1">
                 <button onClick={() => handleLinkClick('Dashboard')} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center"><DashboardIcon className="w-5 h-5 mr-3" /> Dashboard</button>
                 <button onClick={() => handleLinkClick('Timetable')} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center"><CalendarIcon className="w-5 h-5 mr-3" /> Timetable</button>
                 <button onClick={() => handleLinkClick('Core')} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center"><SchoolIcon className="w-5 h-5 mr-3" /> Core</button>
            </div>
             <div className="py-1 border-t">
                 <button onClick={() => handleLinkClick('Profile')} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 flex items-center"><UserCircleIcon className="w-5 h-5 mr-3" /> My Profile</button>
                <button onClick={onLogout} className="w-full text-left px-4 py-2 text-sm text-danger hover:bg-danger/10 flex items-center"><LogoutIcon className="w-5 h-5 mr-3" /> Logout</button>
             </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
