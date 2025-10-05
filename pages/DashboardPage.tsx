import React, { useState } from 'react';
import { User, AtlSkill, IBProgramme } from '../types';
import StreakCounter from '../components/dashboard/StreakCounter';
import DiplomaProgress from '../components/dashboard/DiplomaProgress';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';
import AtlSkillsChart from '../components/dashboard/AtlSkillsChart';
import Card from '../components/shared/Card';
import { MOCK_WELLBEING_ACTIVITIES } from '../constants';
import Button from '../components/shared/Button';

interface DashboardPageProps {
  user: User;
}

const DPCabinet: React.FC<{ user: User }> = ({ user }) => (
  <DiplomaProgress user={user} />
);

const CPCabinet: React.FC<{ user: User }> = ({ user }) => (
    <Card>
        <h2 className="text-lg font-heading font-bold mb-4">CP Cabinet</h2>
        <p className="text-slate-500">Your Career-related Programme dashboard is under construction. Key features for tracking your career-related study, service learning, and language development are coming soon!</p>
    </Card>
);

const MYPCabinet: React.FC<{ user: User }> = ({ user }) => (
    <Card>
        <h2 className="text-lg font-heading font-bold mb-4">MYP Cabinet</h2>
        <p className="text-slate-500">Your Middle Years Programme dashboard is being developed. Features for tracking interdisciplinary units, the personal project, and service as action are on their way!</p>
    </Card>
);

const StressReliefModule: React.FC = () => {
    return (
        <Card>
            <h3 className="text-lg font-heading font-bold mb-4">Quick Stress Relief</h3>
            <p className="text-sm text-slate-500 mb-4">Take a short break to recharge. You've got this!</p>
            <div className="space-y-2">
                {MOCK_WELLBEING_ACTIVITIES.slice(0, 3).map(activity => (
                    <div key={activity.id} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-semibold text-sm">{activity.title}</p>
                            <p className="text-xs text-slate-500 capitalize">{activity.type} &middot; {activity.duration / 60} min</p>
                        </div>
                        <Button size="sm" variant="secondary">Start</Button>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const DashboardPage: React.FC<DashboardPageProps> = ({ user }) => {

  const renderCabinet = () => {
    switch(user.programme) {
      case IBProgramme.DP: return <DPCabinet user={user} />;
      case IBProgramme.CP: return <CPCabinet user={user} />;
      case IBProgramme.MYP: return <MYPCabinet user={user} />;
      default: return null;
    }
  };

  const getCabinetTitle = () => {
      switch(user.programme) {
        case IBProgramme.DP: return "DP Cabinet";
        case IBProgramme.CP: return "CP Cabinet";
        case IBProgramme.MYP: return "MYP Cabinet";
        default: return "Dashboard";
      }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-heading font-extrabold text-text-primary">Welcome back, {user.firstName}!</h1>
        <p className="text-slate-500 mt-1">Here's your {getCabinetTitle()} snapshot for today.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="md:col-span-2 lg:col-span-1">
          <StreakCounter streak={user.streak} />
        </div>
        <div className="md:col-span-2 lg:col-span-3">
            <UpcomingTasks events={user.timetable} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            {renderCabinet()}
        </div>
        <div className="space-y-6">
            <AtlSkillsChart skills={user.atlSkills} />
            <StressReliefModule />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
