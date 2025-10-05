import React from 'react';
import Card from '../shared/Card';

interface StreakCounterProps {
    streak: number;
}

const StreakCounter: React.FC<StreakCounterProps> = ({ streak }) => {
    return (
        <Card className="flex flex-col items-center justify-center text-center h-full streak-glow bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="text-6xl font-extrabold text-accent">🔥</div>
            <p className="text-5xl font-mono font-bold mt-2 text-text-neutral">{streak}</p>
            <p className="text-sm font-semibold text-slate-500 mt-1">Day Streak</p>
        </Card>
    )
};

export default StreakCounter;
