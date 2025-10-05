import React, { useState, useEffect, useRef } from 'react';
import { MOCK_TIMETABLE_EVENTS } from '../constants';
import { TimetableEvent } from '../types';
import { getWeekDays, isSameDay, formatTime, getEventColor } from '../lib/dateUtils';
import Button from '../components/shared/Button';
import { PlusIcon } from '../components/IconComponents';
import AddEventModal from '../components/timetable/AddEventModal';

const CALENDAR_START_HOUR = 7;
const CALENDAR_END_HOUR = 22;
const HOUR_HEIGHT_PX = 60;

const TimetablePage: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<TimetableEvent[]>(MOCK_TIMETABLE_EVENTS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const weekDays = getWeekDays(currentDate);
    const today = new Date();
    const hours = Array.from({ length: CALENDAR_END_HOUR - CALENDAR_START_HOUR }, (_, i) => i + CALENDAR_START_HOUR);

    // Scroll to current time on initial load if viewing the current week
    useEffect(() => {
        if (scrollRef.current && weekDays.some(day => isSameDay(day, today))) {
            const currentHour = new Date().getHours();
            if (currentHour >= CALENDAR_START_HOUR && currentHour <= CALENDAR_END_HOUR) {
                // Position halfway through the current hour for better visibility
                const scrollTop = (currentHour - CALENDAR_START_HOUR) * HOUR_HEIGHT_PX - (HOUR_HEIGHT_PX / 2);
                scrollRef.current.scrollTop = scrollTop;
            }
        }
    }, [weekDays]);

    const changeWeek = (offset: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setDate(newDate.getDate() + offset * 7);
            return newDate;
        });
    };
    
    const eventsForDay = (day: Date) => {
        return events
            .filter(event => isSameDay(new Date(event.start), day))
            .sort((a,b) => new Date(a.start).getTime() - new Date(b.start).getTime());
    }

    const handleAddEvent = (newEvent: Omit<TimetableEvent, 'id' | 'completed'>) => {
        const fullEvent: TimetableEvent = {
            ...newEvent,
            id: `evt-${Date.now()}`,
            completed: false,
        };
        setEvents(prev => [...prev, fullEvent].sort((a,b) => new Date(a.start).getTime() - new Date(b.start).getTime()));
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
        
        <div className="flex-grow overflow-auto" ref={scrollRef}>
            <div className="grid grid-cols-[auto_repeat(7,1fr)]">
                {/* Day Header Row */}
                <div className="w-14 sticky top-0 bg-white z-10" />
                {weekDays.map(day => (
                    <div key={day.toISOString()} className={`text-center p-2 border-b sticky top-0 bg-white z-10 ${isSameDay(day, today) ? 'border-secondary' : 'border-slate-200'}`}>
                        <p className="text-xs text-slate-500 font-semibold">{day.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                        <p className={`font-bold text-lg ${isSameDay(day, today) ? 'text-secondary' : 'text-text-neutral'}`}>{day.getDate()}</p>
                    </div>
                ))}

                {/* Time Labels Column */}
                <div className="row-start-2">
                    {hours.map(hour => (
                        <div key={hour} className="h-[60px] text-right pr-2 text-xs text-slate-400 relative">
                            <span className="absolute -top-[9px]">{hour}:00</span>
                        </div>
                    ))}
                </div>

                {/* Day Columns for Grid Lines and Events */}
                {weekDays.map(day => (
                    <div key={day.toISOString()} className="relative border-l border-slate-100 row-start-2">
                        {/* Background grid lines */}
                        {hours.map(hour => <div key={hour} className="h-[60px] border-t border-slate-100"></div>)}
                        
                        {/* Events */}
                        <div className="absolute inset-0">
                            {eventsForDay(day).map(event => {
                                const start = new Date(event.start);
                                let end = new Date(event.end);
                                if (end <= start) {
                                    end = new Date(start.getTime() + 60 * 60 * 1000); // Default to 1 hour
                                }

                                const startHour = start.getHours() + start.getMinutes() / 60;
                                const endHour = end.getHours() + end.getMinutes() / 60;

                                if (endHour <= CALENDAR_START_HOUR || startHour >= CALENDAR_END_HOUR) return null;

                                const top = Math.max(0, startHour - CALENDAR_START_HOUR) * HOUR_HEIGHT_PX;
                                const duration = endHour - startHour;
                                const height = duration * HOUR_HEIGHT_PX;

                                return (
                                    <div
                                        key={event.id}
                                        style={{ top: `${top}px`, height: `${height}px` }}
                                        className={`absolute left-1 right-1 p-1 rounded text-white text-[10px] cursor-pointer flex flex-col overflow-hidden ${getEventColor(event.type)}`}
                                        title={`${event.title} (${formatTime(start)} - ${formatTime(end)})`}
                                    >
                                        <p className="font-bold truncate">{event.title}</p>
                                        <p className="text-white/80">{formatTime(start)} - {formatTime(end)}</p>
                                    </div>
                                );
                            })}
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