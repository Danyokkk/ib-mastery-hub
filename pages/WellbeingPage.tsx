import React, { useState, useEffect } from 'react';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { MOCK_WELLBEING_ACTIVITIES } from '../constants';
import { WellbeingActivity } from '../types';

const PomodoroTimer: React.FC = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isBreak, setIsBreak] = useState(false);

    useEffect(() => {
        let interval: number | null = null;
        if (isActive) {
            interval = window.setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval!);
                        // Timer finished
                        setIsActive(false);
                        setIsBreak(prev => !prev);
                        setMinutes(isBreak ? 25 : 5);
                        alert(isBreak ? "Break's over! Time to focus." : "Great work! Time for a short break.");
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval!);
        }
        return () => clearInterval(interval!);
    }, [isActive, seconds, minutes, isBreak]);

    const toggle = () => setIsActive(!isActive);

    const reset = () => {
        setIsActive(false);
        setIsBreak(false);
        setMinutes(25);
        setSeconds(0);
    };

    return (
        <Card className="text-center">
             <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-2">Pomodoro Timer</h2>
             <p className="text-sm text-slate-500 mb-4">{isBreak ? "Break Time" : "Focus Session"}</p>
             <div className="text-6xl font-mono font-bold my-4">
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
             </div>
             <div className="flex justify-center gap-2">
                <Button onClick={toggle} size="lg">{isActive ? 'Pause' : 'Start'}</Button>
                <Button onClick={reset} size="lg" variant="secondary">Reset</Button>
             </div>
        </Card>
    );
};

const BreathingExercise: React.FC<{ activity: WellbeingActivity }> = ({ activity }) => {
    return (
        <Card className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <h3 className="text-md font-heading font-bold text-text-neutral">{activity.title}</h3>
                <p className="text-sm text-slate-500">{activity.duration} seconds &middot; {activity.type}</p>
            </div>
            <Button>Begin</Button>
        </Card>
    );
}

const WellbeingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-heading font-extrabold text-text-primary">Stress Relief Hub</h1>
        <p className="text-slate-500 mt-1">Tools to help you stay balanced, focused, and healthy.</p>
      </header>
      
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PomodoroTimer />
            <Card>
                 <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-4">Guided Exercises</h2>
                 <div className="space-y-3">
                    {MOCK_WELLBEING_ACTIVITIES.map(act => (
                        <div key={act.id} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-semibold text-sm">{act.title}</p>
                                <p className="text-xs text-slate-500 capitalize">{act.type} &middot; {act.duration}s</p>
                            </div>
                            <Button size="sm" variant="secondary">Start</Button>
                        </div>
                    ))}
                 </div>
            </Card>
       </div>

        <Card>
            <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-2">Mental Health Resources</h2>
            <p className="text-sm text-slate-500 mb-4">It's okay to not be okay. If you need to talk to someone, help is available. These resources are a starting point, not a substitute for professional advice.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <a href="https://www.mentalhealth.gov/" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <h3 className="font-bold text-secondary">MentalHealth.gov</h3>
                    <p className="text-sm text-slate-500 mt-1">Information and resources from the U.S. government.</p>
                </a>
                <a href="https://www.who.int/teams/mental-health-and-substance-use/mental-health-in-the-workplace" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <h3 className="font-bold text-secondary">World Health Organization (WHO)</h3>
                    <p className="text-sm text-slate-500 mt-1">Global resources and information on mental wellbeing.</p>
                </a>
            </div>
        </Card>
    </div>
  );
};

export default WellbeingPage;