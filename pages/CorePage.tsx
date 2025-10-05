import React, { useState } from 'react';
import { User } from '../types';
import Card from '../components/shared/Card';
import Tabs from '../components/shared/Tabs';
import Button from '../components/shared/Button';
import { SchoolIcon, BookOpenIcon, SparklesIcon, ExternalLinkIcon, CheckCircleIcon, EditIcon } from '../components/IconComponents';
import { MOCK_EE_PROJECT, MOCK_CAS_PORTFOLIO, IBO_LINKS } from '../constants';

interface CorePageProps {
  user: User;
}

const TOKTab: React.FC = () => (
    <div className="space-y-4">
        <Card>
            <h3 className="font-bold text-lg mb-2">What is TOK?</h3>
            <p className="text-sm text-slate-600 space-y-2">
                <span>Theory of Knowledge (TOK) is a central part of the DP Core. It encourages you to reflect on the nature of knowledge and on how we know what we claim to know.</span>
                <span>It challenges you to question assumptions, recognize different perspectives, and make connections across your subjects. Key assessments are the TOK Exhibition and the TOK Essay.</span>
            </p>
        </Card>
        <Card>
            <h3 className="font-bold mb-2">TOK Exhibition</h3>
            <p className="text-sm text-slate-500 mb-4">Plan and draft your exhibition. Receive structural feedback on your commentary.</p>
            <Button>Open Exhibition Planner</Button>
        </Card>
        <Card>
            <h3 className="font-bold mb-2">TOK Essay</h3>
            <p className="text-sm text-slate-500 mb-4">Deconstruct prescribed titles and build your arguments using our step-by-step guide.</p>
            <Button variant="secondary">Explore Essay Titles</Button>
        </Card>
    </div>
);

const EETab: React.FC = () => {
    const ee = MOCK_EE_PROJECT;
    const criteria = [
        { name: 'A: Focus and method', max: 6 },
        { name: 'B: Knowledge and understanding', max: 6 },
        { name: 'C: Critical thinking', max: 12 },
        { name: 'D: Presentation', max: 4 },
        { name: 'E: Engagement', max: 6 },
    ];

    return (
        <div className="space-y-4">
             <Card>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-bold">Your Extended Essay</h3>
                        <p className="text-sm text-slate-500 italic max-w-md">"{ee.researchQuestion}"</p>
                    </div>
                    <Button size="sm" variant="secondary" className="flex-shrink-0">
                        <EditIcon className="w-4 h-4 mr-2"/> Workspace
                    </Button>
                </div>
                <div className="mt-4 space-y-3">
                    <h4 className="text-sm font-semibold">Rubric Progress</h4>
                    {criteria.map(c => (
                        <div key={c.name}>
                             <div className="flex justify-between text-xs font-medium mb-1">
                                <span>{c.name}</span>
                                <span>{ee.rubricProgress[c.name.charAt(0) as keyof typeof ee.rubricProgress]}/{c.max}</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                                <div className="bg-secondary h-2 rounded-full" style={{width: `${(ee.rubricProgress[c.name.charAt(0) as keyof typeof ee.rubricProgress] / c.max) * 100}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
             </Card>
        </div>
    )
};

const CASTab: React.FC = () => {
    const portfolio = MOCK_CAS_PORTFOLIO;
    const outcomes = 7;
    const completedOutcomes = new Set(portfolio.activities.flatMap(a => a.learningOutcomes)).size;
    
    return (
         <div className="space-y-4">
             <Card>
                <div className="flex justify-between items-center">
                    <h3 className="font-bold">CAS Portfolio</h3>
                    <Button size="sm">Log New Activity</Button>
                </div>
                <p className="text-sm text-slate-500 my-2">You have logged <span className="font-bold">{portfolio.activities.length} activities</span> and met <span className="font-bold">{completedOutcomes} of {outcomes}</span> learning outcomes.</p>
                <div className="space-y-2 mt-4">
                    {portfolio.activities.map(act => (
                        <div key={act.id} className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
                           <div>
                             <span className={`text-xs font-bold px-2 py-1 rounded-full ${act.type === 'Creativity' ? 'bg-purple-200 text-purple-800' : act.type === 'Activity' ? 'bg-blue-200 text-blue-800' : 'bg-orange-200 text-orange-800'}`}>{act.type}</span>
                             <p className="font-semibold text-sm mt-1">{act.title}</p>
                           </div>
                           <span className="text-sm font-mono font-semibold">{act.hours} hrs</span>
                        </div>
                    ))}
                </div>
             </Card>
        </div>
    )
};


const CorePage: React.FC<CorePageProps> = ({ user }) => {
  const tabs = [
    { name: 'TOK', icon: <SchoolIcon className="w-5 h-5 mr-2"/> },
    { name: 'EE', icon: <BookOpenIcon className="w-5 h-5 mr-2"/> },
    { name: 'CAS', icon: <SparklesIcon className="w-5 h-5 mr-2"/> },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-heading font-extrabold text-text-neutral">DP Core</h1>
        <p className="text-slate-500 mt-1">Manage your Theory of Knowledge, Extended Essay, and CAS requirements.</p>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
            <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="mt-4">
                {activeTab === 'TOK' && <TOKTab />}
                {activeTab === 'EE' && <EETab />}
                {activeTab === 'CAS' && <CASTab />}
            </div>
        </div>

        <div className="lg:w-1/3 space-y-4">
            <Card>
                <h3 className="font-bold mb-2">Official IB Resources</h3>
                <ul className="space-y-2">
                    <a href={IBO_LINKS.TOK_GUIDE} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-secondary hover:underline">
                        <ExternalLinkIcon className="w-4 h-4 mr-2"/> Theory of Knowledge Guide
                    </a>
                     <a href={IBO_LINKS.TOK_WHAT_IS} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-secondary hover:underline">
                        <ExternalLinkIcon className="w-4 h-4 mr-2"/> What is TOK?
                    </a>
                    <a href={IBO_LINKS.EE_GUIDE} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-secondary hover:underline">
                        <ExternalLinkIcon className="w-4 h-4 mr-2"/> Extended Essay Guide
                    </a>
                    <a href={IBO_LINKS.CAS_GUIDE} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-secondary hover:underline">
                        <ExternalLinkIcon className="w-4 h-4 mr-2"/> CAS Guide
                    </a>
                </ul>
            </Card>
            <Card>
                <h3 className="font-bold mb-2">Exemplar Library</h3>
                <p className="text-sm text-slate-500 mb-3">Explore high-scoring student work (with permission).</p>
                <Button variant="secondary" size="sm" fullWidth>Browse Exemplars</Button>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default CorePage;
