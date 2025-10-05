import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { StudyBuddySession, ChatMessage } from '../../types';
import Button from '../shared/Button';
import { ChatBubbleLeftRightIcon } from '../IconComponents';

interface StudyBuddyModalProps {
    isOpen: boolean;
    onClose: () => void;
    topic: string;
}

const StudyBuddyModal: React.FC<StudyBuddyModalProps> = ({ isOpen, onClose, topic }) => {
    const [session, setSession] = useState<StudyBuddySession | null>(null);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && topic) {
            setSession({
                topic: topic,
                history: [
                    { role: 'system', text: `You are an expert IB tutor. The user is asking about the topic: ${topic}. Be encouraging and helpful. Explain concepts clearly and provide examples when useful.` },
                    { role: 'model', text: `Hi! I'm your AI Study Buddy. How can I help you with ${topic} today?` }
                ],
            });
        } else {
            setSession(null);
        }
    }, [isOpen, topic]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [session?.history]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentMessage.trim() || !session) return;

        const newMessage: ChatMessage = { role: 'user', text: currentMessage };
        const updatedHistory = [...session.history, newMessage];
        setSession({ ...session, history: updatedHistory });
        setCurrentMessage('');
        setIsLoading(true);

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const model = 'gemini-2.5-flash';
            
            const systemInstruction = session.history.find(m => m.role === 'system')?.text || '';
            const contents = updatedHistory.filter(m => m.role !== 'system').map(m => m.text);

            const response = await ai.models.generateContent({
                model,
                contents: contents.join('\n'), // Simple concatenation for context
                config: { systemInstruction }
            });

            const aiResponse: ChatMessage = { role: 'model', text: response.text };
            setSession(prev => prev ? { ...prev, history: [...updatedHistory, aiResponse] } : null);
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            const errorResponse: ChatMessage = { role: 'model', text: "Sorry, I'm having trouble connecting right now. Please try again later." };
            setSession(prev => prev ? { ...prev, history: [...updatedHistory, errorResponse] } : null);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 bg-black bg-opacity-30 backdrop-blur-sm" onClick={onClose}>
            <div className="bg-white rounded-4xl shadow-soft-md w-full max-w-md h-[80vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                <header className="p-4 border-b flex justify-between items-center flex-shrink-0">
                    <div>
                        <h2 className="font-heading font-bold text-lg flex items-center gap-2">
                           <ChatBubbleLeftRightIcon className="w-6 h-6 text-primary" /> AI Study Buddy
                        </h2>
                        <p className="text-sm text-slate-500">Topic: {session?.topic}</p>
                    </div>
                     <Button onClick={onClose} variant="secondary" size="sm">Close</Button>
                </header>

                <div className="flex-grow p-4 overflow-y-auto space-y-4">
                    {session?.history.filter(m => m.role !== 'system').map((message, index) => (
                        <div key={index} className={`flex items-start gap-2.5 ${message.role === 'user' ? 'justify-end' : ''}`}>
                            {message.role === 'model' && <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">🤖</div>}
                            <div className={`max-w-xs md:max-w-sm p-3 rounded-2xl ${message.role === 'user' ? 'bg-secondary text-white rounded-br-none' : 'bg-slate-100 text-text-neutral rounded-bl-none'}`}>
                               <p className="text-sm">{message.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-start gap-2.5">
                           <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">🤖</div>
                           <div className="max-w-sm p-3 rounded-2xl bg-slate-100 text-text-neutral rounded-bl-none">
                               <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-75"></div>
                                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse delay-150"></div>
                               </div>
                           </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <footer className="p-4 border-t flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={currentMessage}
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-grow block w-full px-4 py-3 text-sm font-sans bg-white border border-slate-300 rounded-full placeholder-slate-500 text-text-neutral focus:outline-none focus:ring-2 focus:ring-secondary"
                            disabled={isLoading}
                        />
                        <Button type="submit" size="md" disabled={isLoading || !currentMessage.trim()}>
                            Send
                        </Button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default StudyBuddyModal;