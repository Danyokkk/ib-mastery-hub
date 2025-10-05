import React from 'react';
import { User } from '../../types';
import { Page } from '../../App';
import ProfileDropdown from '../profile/ProfileDropdown';

interface HeaderProps {
    user: User | null; // Allow user to be null during loading state
    onLogout: () => void;
    setActivePage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, setActivePage }) => {
    // Render a placeholder or nothing if user data isn't loaded yet
    if (!user) {
        return <header className="h-20 flex-shrink-0"></header>;
    }

    return (
        <header className="flex-shrink-0 h-20 flex items-center justify-end px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
                 <div className="text-right">
                    <p className="font-bold text-sm text-text-neutral">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-slate-500">{user.programme}</p>
                </div>
                <ProfileDropdown user={user} onLogout={onLogout} setActivePage={setActivePage} />
            </div>
        </header>
    )
}

export default Header;