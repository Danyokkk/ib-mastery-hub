import React, { useState } from 'react';
import { Lesson, User, Question } from '../types';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { ChatBubbleLeftRightIcon } from '../components/IconComponents';
// FIX: Imported the Input component to be used for free-response questions.
import Input from '../components/shared/Input';

interface LessonPlayerPageProps {
  lesson: Lesson;
  user: User;
  onExit: () => void;
  onAskStudyBuddy: (topic: string) => void;
}

const LessonPlayerPage: React.FC<LessonPlayerPageProps> = ({ lesson, user, onExit, onAskStudyBuddy }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);

    const questions = lesson.questions || [];
    const currentQuestion = questions[currentQuestionIndex];
    const progress = (currentQuestionIndex / questions.length) * 100;

    const handleAnswerSubmit = () => {
        if (!selectedAnswer) return;
        
        const correct = selectedAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
        setIsCorrect(correct);
        if (correct) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        setIsCorrect(null);
        setSelectedAnswer(null);
        setCurrentQuestionIndex(prev => prev + 1);
    };

    const isLessonFinished = currentQuestionIndex >= questions.length;

    return (
        <div className="p-4 sm:p-6 lg:p-8 flex-grow overflow-y-auto flex flex-col">
            <header className="flex-shrink-0 mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-heading font-extrabold text-text-neutral">{lesson.title}</h1>
                        <p className="text-slate-500 mt-1">Lesson Progress</p>
                    </div>
                    <div className="flex gap-2">
                         <Button onClick={() => onAskStudyBuddy(lesson.title)} variant="secondary" size="sm">
                            <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" /> Ask Study Buddy
                         </Button>
                         <Button onClick={onExit} variant="secondary" size="sm">Exit Lesson</Button>
                    </div>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 mt-4">
                    <div className="bg-primary h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
            </header>

            <main className="flex-grow">
                 {isLessonFinished ? (
                    <Card className="text-center flex flex-col items-center justify-center h-full">
                        <h2 className="text-3xl font-heading font-extrabold text-primary">Lesson Complete!</h2>
                        <p className="text-slate-600 mt-2">Great work, {user.firstName}!</p>
                        <p className="text-4xl font-mono font-bold my-6">{score} / {questions.length}</p>
                        <div className="text-lg font-semibold text-accent">+{lesson.xp || 100} XP Earned</div>
                        <Button onClick={onExit} className="mt-8">Back to Learn</Button>
                    </Card>
                ) : (
                    <Card>
                        <p className="text-sm font-semibold text-slate-500 mb-2">Question {currentQuestionIndex + 1} of {questions.length}</p>
                        <h2 className="text-xl font-bold mb-6">{currentQuestion.text}</h2>

                        <div className="space-y-3">
                            {currentQuestion.type === 'mcq' && currentQuestion.options?.map(option => {
                                const isSelected = selectedAnswer === option;
                                let buttonClass = 'border-slate-300 bg-white hover:bg-slate-50';
                                if (isCorrect !== null && isSelected) {
                                    buttonClass = isCorrect ? 'border-success bg-green-100' : 'border-danger bg-red-100';
                                } else if (isCorrect !== null && option === currentQuestion.correctAnswer) {
                                     buttonClass = 'border-success bg-green-100';
                                }
                                return (
                                <button key={option} onClick={() => setSelectedAnswer(option)} disabled={isCorrect !== null} className={`w-full text-left p-4 rounded-xl border-2 font-semibold transition-all ${buttonClass}`}>
                                    {option}
                                </button>
                            )})}
                             {currentQuestion.type === 'frq' && (
                                <Input 
                                    placeholder="Type your answer here..."
                                    value={selectedAnswer || ''}
                                    onChange={(e) => setSelectedAnswer(e.target.value)}
                                    disabled={isCorrect !== null}
                                />
                            )}
                        </div>
                        
                        {isCorrect !== null && (
                            <div className={`mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                                <h3 className="font-bold">{isCorrect ? "Correct!" : "Not quite..."}</h3>
                                <p className="text-sm">{currentQuestion.explanation}</p>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end">
                            {isCorrect === null ? (
                                <Button onClick={handleAnswerSubmit} disabled={!selectedAnswer}>Check Answer</Button>
                            ): (
                                <Button onClick={handleNext}>Next</Button>
                            )}
                        </div>
                    </Card>
                )}
            </main>
        </div>
    );
};

export default LessonPlayerPage;