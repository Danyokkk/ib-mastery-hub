
import React from 'react';
// FIX: Replaced non-existent CalendarEvent type with TimetableEvent.
import { TimetableEvent, CalendarEventType } from '../../types';
import Card from '../shared/Card';

interface UpcomingTasksProps {
  // FIX: Replaced non-existent CalendarEvent type with TimetableEvent.
  events: TimetableEvent[];
}

const getEventStyle = (type: CalendarEventType) => {
    switch (type) {
        case 'subject': return 'border-secondary/80 bg-secondary/10 text-secondary';
        // FIX: Replaced 'ia_ee' with separate cases for 'ia' and 'ee' to match the CalendarEventType.
        case 'ia':
        case 'ee':
             return 'border-orange-500/80 bg-orange-500/10 text-orange-600';
        case 'cas': return 'border-green-500/80 bg-green-500/10 text-green-600';
        case 'exam': return 'border-danger/80 bg-danger/10 text-danger';
        default: return 'border-slate-400 bg-slate-100 text-slate-600';
    }
}

const UpcomingTasks: React.FC<UpcomingTasksProps> = ({ events }) => {
  const upcoming = events
    .filter(e => !e.completed)
    // FIX: Changed sorting and date display to use `start` property instead of non-existent `date`.
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 4);

  return (
    <Card>
      <h2 className="text-lg font-heading font-bold mb-4">Upcoming Tasks</h2>
      {upcoming.length > 0 ? (
        <ul className="space-y-3">
          {upcoming.map(event => (
            <li key={event.id} className={`p-3 rounded-lg border-l-4 ${getEventStyle(event.type)}`}>
              <p className="font-semibold text-sm">{event.title}</p>
              {/* FIX: Changed date display to use `start` property instead of non-existent `date`. */}
              <p className="text-xs font-medium opacity-80">{new Date(event.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500 text-center py-4">No upcoming tasks. Great job!</p>
      )}
    </Card>
  );
};

export default UpcomingTasks;
