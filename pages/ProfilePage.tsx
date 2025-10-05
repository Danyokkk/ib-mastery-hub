import React, { useState } from 'react';
import { User, IBLevel } from '../types';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import ImageUploader from '../components/profile/ImageUploader';

interface ProfilePageProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onUpdateUser }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [bio, setBio] = useState(user.bio);

  const handleSave = () => {
    onUpdateUser({ ...user, firstName, lastName, bio });
    alert('Profile saved!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl font-heading font-extrabold text-text-neutral">My Profile</h1>
        <p className="text-slate-500 mt-1">Manage your personal information and settings.</p>
      </header>

      <Card>
        <h2 className="text-lg font-heading font-bold mb-6">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
             <ImageUploader avatarUrl={user.avatarUrl} onUpload={(url) => onUpdateUser({ ...user, avatarUrl: url })} />
             <p className="text-lg font-bold mt-4">{user.firstName} {user.lastName}</p>
             <p className="text-xs text-slate-500 mt-2 text-center">Click image to upload or generate a new avatar</p>
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <Input label="Last Name" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <Input label="Email" id="email" value={user.email} disabled />
             <div>
                <label htmlFor="bio" className="block text-sm font-bold font-heading text-slate-700 mb-1">
                    Bio
                </label>
                <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="block w-full px-4 py-3 text-base font-sans bg-[#F3F4F6] border border-[rgba(55,65,81,0.1)] rounded-xl shadow-inset-soft placeholder-[#9CA3AF] text-[#111827] transition-all duration-200 ease-in-out input-glow-focus"
                    placeholder="Tell us a little about yourself..."
                />
            </div>
            <Button onClick={handleSave} className="mt-2">Save Changes</Button>
          </div>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-lg font-heading font-bold mb-4">My Subjects</h2>
        <ul className="divide-y divide-slate-200">
            {user.subjects.map(({subject, level}) => (
                <li key={subject.id} className="py-3 flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-sm">{subject.name}</p>
                        <p className="text-xs text-slate-500">{subject.group}</p>
                    </div>
                    <span className={`font-bold text-xs px-3 py-1 rounded-full ${level === IBLevel.HL ? 'bg-secondary/20 text-secondary' : 'bg-slate-200 text-slate-600'}`}>
                        {level}
                    </span>
                </li>
            ))}
        </ul>
      </Card>
    </div>
  );
};

export default ProfilePage;
