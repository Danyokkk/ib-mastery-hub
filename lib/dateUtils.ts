import { TimetableEvent } from '../types';

export const getWeekDays = (date: Date): Date[] => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  startOfWeek.setDate(diff);
  
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(startOfWeek);
    day.setDate(day.getDate() + i);
    return day;
  });
};

export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
};

export const isSameDay = (d1: Date, d2: Date): boolean => {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
}

export const getEventColor = (type: TimetableEvent['type']): string => {
    switch (type) {
        case 'subject': return 'bg-blue-500 border-blue-600';
        case 'ia': return 'bg-purple-500 border-purple-600';
        case 'ee': return 'bg-fuchsia-500 border-fuchsia-600';
        case 'cas': return 'bg-amber-500 border-amber-600';
        case 'exam': return 'bg-red-500 border-red-600';
        case 'test': return 'bg-orange-500 border-orange-600';
        case 'personal': return 'bg-gray-500 border-gray-600';
        default: return 'bg-gray-400 border-gray-500';
    }
}
