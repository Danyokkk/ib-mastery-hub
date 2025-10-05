import React, { useState } from 'react';
import { MOCK_TIMETABLE_EVENTS } from '../constants';
import { TimetableEvent } from '../types';
import { getWeekDays, isSameDay, formatTime, getEventColor } from '../lib/dateUtils';
import Button from '../components/shared/Button';
import { PlusIcon } from '../components/IconComponents';
import AddEventModal from '../components/timetable/AddEventModal';

const TimetablePage: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<TimetableEvent[]>(MOCK_TIMETABLE_EVENTS);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const weekDays = getWeekDays(currentDate);
    const today = new Date();

    const changeWeek = (offset: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + offset * 7);
            return newDate;
        });
    };
    
    const eventsForDay = (day: Date) => {
        return events.filter(event => isSameDay(new Date(event.start), day))
            .sort((a,b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    }

    const handleAddEvent = (newEvent: Omit<TimetableEvent, 'id' | 'completed'>) => {
        const fullEvent: TimetableEvent = {
            ...newEvent,
            id: `evt-${Date.now()}`,
            completed: false,
        };
        setEvents(prev => [...prev, fullEvent]);
        setIsModalOpen(false);
    };

    return (
    <>
    <div className="space-y-6 flex flex-col h-full">
      <header className="flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
                <h1 className="text-3xl font-heading font-extrabold text-text-neutral">Timetable</h1>
                <p className="text-slate-500 mt-1">Organize your study sessions, deadlines, and activities.</p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-2">
                <Button variant="secondary">Smart Planner</Button>
                <Button onClick={() => setIsModalOpen(true)}>
                    <PlusIcon className="w-5 h-5 mr-2" /> Add Event
                </Button>
            </div>
        </div>
      </header>

      <div className="bg-white rounded-4xl shadow-soft p-4 flex-grow flex flex-col min-h-0">
         <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <Button onClick={() => changeWeek(-1)} size="sm" variant="secondary">&lt; Prev Week</Button>
          <h2 className="text-lg font-heading font-bold text-center">
            {weekDays[0].toLocaleString('default', { month: 'long', day: 'numeric' })} - {weekDays[6].toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })}
          </h2>
          <Button onClick={() => changeWeek(1)} size="sm" variant="secondary">Next Week &gt;</Button>
        </div>
        
        <div className="flex-grow overflow-auto">
            <div className="grid grid-cols-7 gap-1 sm:gap-2 min-w-[500px]">
                {weekDays.map(day => (
                    <div key={day.toISOString()} className={`rounded-lg p-2 ${isSameDay(day, today) ? 'bg-secondary/10' : 'bg-slate-50'}`}>
                        <div className="text-center mb-2">
                            <p className="text-xs text-slate-500 font-semibold">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                            <p className={`font-bold text-lg ${isSameDay(day, today) ? 'text-secondary' : 'text-text-neutral'}`}>{day.getDate()}</p>
                        </div>
                        <div className="space-y-2">
                            {eventsForDay(day).map(event => (
                                <div key={event.id} className={`p-2 rounded-lg text-white text-xs cursor-pointer ${getEventColor(event.type)}`}>
                                    <p className="font-bold truncate">{event.title}</p>
                                    <p className="text-white/80">{formatTime(new Date(event.start))}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
    <AddEventModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddEvent={handleAddEvent}
    />
    </>
  );
};

export default TimetablePage;