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
    const [type, setType] = useState<CalendarEventType>('personal');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('Please enter a title for the event.');
            return;
        }
        
        const start = new Date(date);
        start.setHours(9, 0, 0); // Default start time to 9 AM
        
        onAddEvent({
            title,
            start: start.toISOString(),
            end: start.toISOString(), // For simplicity, end time is same as start
            type,
        });

        // Reset form
        setTitle('');
        setDate(new Date().toISOString().split('T')[0]);
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