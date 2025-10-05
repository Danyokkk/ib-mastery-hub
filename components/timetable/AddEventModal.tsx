import React, { useState } from 'react';
import { TimetableEvent, CalendarEventType } from '../../types';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import Button from '../shared/Button';

interface AddEventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddEvent: (event: Omit<TimetableEvent, 'id' | 'completed'>) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onAddEvent }) => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('10:00');
    const [type, setType] = useState<CalendarEventType>('personal');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('Please enter a title for the event.');
            return;
        }
        
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const startDate = new Date(`${date}T00:00:00`);
        startDate.setHours(startHour, startMinute);

        const [endHour, endMinute] = endTime.split(':').map(Number);
        const endDate = new Date(`${date}T00:00:00`);
        endDate.setHours(endHour, endMinute);

        if (endDate <= startDate) {
            alert('End time must be after start time.');
            return;
        }
        
        onAddEvent({
            title,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            type,
        });

        // Reset form
        setTitle('');
        setDate(new Date().toISOString().split('T')[0]);
        setStartTime('09:00');
        setEndTime('10:00');
        setType('personal');
    };
    
    const eventTypes: CalendarEventType[] = ['personal', 'subject', 'ia', 'ee', 'cas', 'exam', 'test'];

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-2xl font-bold font-heading text-center">Add New Event</h2>
                <Input
                    label="Event Title"
                    id="event-title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g., Study for Math Test"
                    required
                />
                <Input
                    label="Date"
                    id="event-date"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    required
                />
                 <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Start Time"
                        id="event-start-time"
                        type="time"
                        value={startTime}
                        onChange={e => setStartTime(e.target.value)}
                        required
                    />
                    <Input
                        label="End Time"
                        id="event-end-time"
                        type="time"
                        value={endTime}
                        onChange={e => setEndTime(e.target.value)}
                        required
                    />
                </div>
                 <div>
                    <label htmlFor="event-type" className="block text-sm font-bold font-heading text-slate-700 mb-1">
                        Event Type
                    </label>
                    <select
                        id="event-type"
                        value={type}
                        onChange={e => setType(e.target.value as CalendarEventType)}
                        className="block w-full px-4 py-3 text-base font-sans bg-[#F3F4F6] border border-[rgba(55,65,81,0.1)] rounded-xl shadow-inset-soft text-[#111827] focus:ring-primary focus:border-primary"
                    >
                        {eventTypes.map(type => (
                            <option key={type} value={type} className="capitalize">{type}</option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Add Event</Button>
                </div>
            </form>
        </Modal>
    );
};

export default AddEventModal;