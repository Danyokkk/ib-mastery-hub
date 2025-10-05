import React, { useState } from 'react';
import { User, LessonTopic, Lesson, Subject } from '../types';
import { MOCK_LESSON_TOPICS } from '../constants';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import { CheckCircleIcon, ChatBubbleLeftRightIcon } from '../components/IconComponents';

interface LearnPageProps {
  user: User;
  onStartLesson: (lesson: Lesson) => void;
  onAskStudyBuddy: (topic: string) => void;
}

type LessonFilter = 'all' | 'quiz' | 'video' | 'reading';

const LearnPage: React.FC<LearnPageProps> = ({ user, onStartLesson, onAskStudyBuddy }) => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(
    user.subjects.length > 0 ? user.subjects[0].subject : null
  );
  const [activeFilter, setActiveFilter] = useState<LessonFilter>('all');

  const topicsForSubject = selectedSubject
    ? MOCK_LESSON_TOPICS.filter(topic => topic.subjectId === selectedSubject.id)
    : [];

  const filteredTopics = topicsForSubject.map(topic => ({
    ...topic,
    lessons: topic.lessons.filter(lesson => activeFilter === 'all' || lesson.type === activeFilter)
  })).filter(topic => topic.lessons.length > 0);

  const filterButtons: { label: string; filter: LessonFilter }[] = [
    { label: 'All', filter: 'all' },
    { label: 'Quizzes', filter: 'quiz' },
    { label: 'Videos', filter: 'video' },
    { label: 'Reading', filter: 'reading' },
  ];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-heading font-extrabold text-text-primary">Learn</h1>
        <p className="text-slate-500 mt-1">Interactive lessons and quizzes tailored to your subjects.</p>
      </header>
      
      {user.subjects.length === 0 || !selectedSubject ? (
         <Card className="text-center py-10">
          <p className="text-slate-500 font-semibold">No subjects selected.</p>
          <p className="text-sm text-slate-400 mt-1">Please add subjects on your profile page to see available lessons.</p>
        </Card>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex space-x-2 border-b border-slate-200 overflow-x-auto pb-2">
                {user.subjects.map(({ subject, level }) => (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject)}
                    className={`py-3 px-4 font-extrabold text-sm transition-colors whitespace-nowrap ${
                      selectedSubject.id === subject.id
                        ? 'border-b-2 border-secondary text-secondary'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {subject.name} <span className="text-xs font-medium">{level}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => onAskStudyBuddy(selectedSubject.name)}>
                    <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2" /> Ask Study Buddy
                </Button>
                <Button variant="secondary" size="sm" onClick={() => alert('Redirecting to the Connect page...')}>Ask the Hub</Button>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            {filterButtons.map(({ label, filter }) => (
                <Button key={filter} size="sm" variant={activeFilter === filter ? 'primary' : 'secondary'} onClick={() => setActiveFilter(filter)}>
                    {label}
                </Button>
            ))}
          </div>


          <div className="space-y-6">
            {filteredTopics.length > 0 ? filteredTopics.map(topic => (
              <Card key={topic.id}>
                <h2 className="text-lg font-heading font-extrabold text-text-neutral mb-4">{topic.name}</h2>
                <ul className="space-y-3">
                  {topic.lessons.map(lesson => (
                    <li key={lesson.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center">
                         <CheckCircleIcon className={`w-6 h-6 mr-3 flex-shrink-0 ${lesson.completed ? 'text-success' : 'text-slate-300'}`} />
                        <div>
                          <p className="font-semibold text-text-neutral">{lesson.title}</p>
                          <p className="text-xs text-slate-500 capitalize">{lesson.type} &middot; {lesson.duration} mins &middot; {lesson.xp} XP &middot; {lesson.difficulty}</p>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => onStartLesson(lesson)} className="w-full sm:w-auto">
                        {lesson.completed ? 'Review' : 'Start'}
                      </Button>
                    </li>
                  ))}
                </ul>
              </Card>
            )) : (
                <Card className="text-center py-10">
                    <p className="text-slate-500 font-semibold">No '{activeFilter}' lessons found for this subject.</p>
                    <p className="text-sm text-slate-400 mt-1">Try selecting a different filter.</p>
                </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LearnPage;