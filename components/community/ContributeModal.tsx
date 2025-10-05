import React, { useState } from 'react';
import { CommunitySubmission, SubmissionType } from '../../types';
import Modal from '../shared/Modal';
import Input from '../shared/Input';
import Button from '../shared/Button';

interface ContributeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ContributeModal: React.FC<ContributeModalProps> = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<SubmissionType>('guide');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !description.trim() || !agreedToTerms) {
            alert('Please fill all fields and agree to the terms.');
            return;
        }

        // In a real app, this would also handle file uploads and send data to a backend.
        console.log({ title, description, type, isAnonymous });
        alert('Thank you for your contribution! It has been submitted for review by our moderators.');
        onClose();
    };

    const submissionTypes: SubmissionType[] = ['guide', 'lesson', 'quiz', 'exemplar'];

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold font-heading text-center">Contribute to the Hub</h2>
                <p className="text-sm text-slate-500 text-center">Share your knowledge with the community. Submissions are reviewed before publishing.</p>
                
                <Input
                    label="Title"
                    id="submission-title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g., Guide to TOK Essay Titles"
                    required
                />
                 <div>
                    <label htmlFor="submission-type" className="block text-sm font-bold font-heading text-slate-700 mb-1">
                        Content Type
                    </label>
                    <select
                        id="submission-type"
                        value={type}
                        onChange={e => setType(e.target.value as SubmissionType)}
                        className="block w-full px-4 py-3 text-base font-sans bg-[#F3F4F6] border border-[rgba(55,65,81,0.1)] rounded-xl shadow-inset-soft text-[#111827] focus:ring-primary focus:border-primary"
                    >
                        {submissionTypes.map(t => (
                            <option key={t} value={t} className="capitalize">{t}</option>
                        ))}
                    </select>
                </div>
                
                 <div>
                    <label htmlFor="description" className="block text-sm font-bold font-heading text-slate-700 mb-1">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        rows={3}
                        className="block w-full px-4 py-3 text-base font-sans bg-[#F3F4F6] border rounded-xl"
                        placeholder="Briefly describe what you are sharing."
                        required
                    />
                </div>
                
                <div className="text-xs p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg">
                    <strong>Academic Integrity:</strong> Do not submit work that is not your own or confidential assessment materials. Submissions undergo a plagiarism check.
                </div>

                <div className="flex items-start">
                    <input id="terms" name="terms" type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="h-4 w-4 text-secondary border-slate-300 rounded focus:ring-secondary mt-1"/>
                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">I confirm I have permission to publish this content and agree to the IB Mastery Hub <a href="#" className="font-semibold text-secondary hover:underline">Terms of Contribution</a>.</label>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={!agreedToTerms}>Submit for Review</Button>
                </div>
            </form>
        </Modal>
    );
};

export default ContributeModal;
