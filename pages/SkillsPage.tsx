
import React, { useState } from 'react';
import { User, AtlSkill } from '../types';
import { ATL_SKILL_DEFINITIONS } from '../constants';
import AtlSkillsChart from '../components/dashboard/AtlSkillsChart';
import Card from '../components/shared/Card';

interface SkillsPageProps {
  user: User;
}

const SkillsPage: React.FC<SkillsPageProps> = ({ user }) => {
  const [focusedSkills, setFocusedSkills] = useState<AtlSkill[]>([]);

  const toggleFocusSkill = (skill: AtlSkill) => {
    setFocusedSkills(prev => 
        prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-heading font-extrabold text-text-primary">Approaches to Learning (ATL)</h1>
        <p className="text-slate-500 mt-1">Track and develop the foundational skills for lifelong success.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <AtlSkillsChart skills={user.atlSkills} focusedSkills={focusedSkills} />
        </div>
        <Card>
            <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-4">Set Your Focus</h2>
            <p className="text-sm text-slate-500 mb-4">Select skills to highlight your development goals. Your teachers can see this too!</p>
            <ul className="space-y-3">
                {(Object.keys(ATL_SKILL_DEFINITIONS) as AtlSkill[]).map(skill => (
                    <li key={skill}>
                        <label className="flex items-center p-3 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                            <input 
                                type="checkbox"
                                checked={focusedSkills.includes(skill)}
                                onChange={() => toggleFocusSkill(skill)}
                                className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <span className="ml-3 font-semibold text-sm text-text-neutral">{skill}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </Card>
      </div>

       <Card>
            <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-4">Skill Breakdown</h2>
            <ul className="space-y-4">
                {(Object.entries(user.atlSkills) as [AtlSkill, number][]).map(([skill, value]) => (
                    <li key={skill}>
                        <div className="flex justify-between items-center mb-1">
                            <h3 className="font-semibold text-sm text-text-neutral">{skill}</h3>
                            <span className="font-mono font-bold text-sm text-secondary">{value}/100</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                             <div className="bg-secondary h-2 rounded-full" style={{ width: `${value}%` }}></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-1.5">{ATL_SKILL_DEFINITIONS[skill]}</p>
                    </li>
                ))}
            </ul>
        </Card>
    </div>
  );
};

export default SkillsPage;