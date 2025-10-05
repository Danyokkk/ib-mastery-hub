
import React from 'react';
// FIX: Replaced non-existent UserData type with User.
import { User, CoreStatus } from '../../types';
import Card from '../shared/Card';

interface DiplomaProgressProps {
  // FIX: Replaced non-existent UserData type with User.
  user: User;
}

const CoreStatusIndicator: React.FC<{ label: string; status: CoreStatus }> = ({ label, status }) => {
  const colorClasses = {
    'on-track': 'bg-success',
    'at-risk': 'bg-accent',
    'needs-attention': 'bg-danger',
  };
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${colorClasses[status]}`}></div>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};


const SubjectProgressBar: React.FC<{
    name: string;
    level: string;
    completion: number;
    score: number;
}> = ({ name, level, completion, score }) => (
    <div>
        <div className="flex justify-between items-baseline mb-1">
            <span className="text-sm font-semibold text-text-neutral">{name} <span className="text-xs text-slate-400">{level}</span></span>
            <span className="text-sm font-bold font-mono text-secondary">{score}/7</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div 
                className="bg-gradient-to-r from-primary to-success h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${completion}%` }}
                role="progressbar"
                aria-valuenow={completion}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${name} progress`}
            ></div>
        </div>
    </div>
);

const DiplomaProgress: React.FC<DiplomaProgressProps> = ({ user }) => {
  return (
    <Card>
        <h2 className="text-lg font-heading font-bold mb-4">Diploma Progress</h2>
        <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-500 mb-3">Core Requirements</h3>
            <div className="flex justify-between items-center">
                <CoreStatusIndicator label="TOK" status={user.coreProgress.tok} />
                <CoreStatusIndicator label="EE" status={user.coreProgress.ee} />
                <CoreStatusIndicator label="CAS" status={user.coreProgress.cas} />
            </div>
        </div>
        <div>
            <h3 className="text-sm font-semibold text-slate-500 mb-3">Subjects</h3>
            <div className="space-y-4">
                {user.subjects.map(({subject, level}) => (
                    <SubjectProgressBar 
                        key={subject.id}
                        name={subject.name}
                        level={level}
                        completion={user.subjectProgress[subject.id]?.completion || 0}
                        score={user.subjectProgress[subject.id]?.predictedScore || 0}
                    />
                ))}
            </div>
        </div>
    </Card>
  );
};

export default DiplomaProgress;
