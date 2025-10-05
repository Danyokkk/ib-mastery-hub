import React, { useState } from 'react';
import { User, University } from '../types';
import { MOCK_UNIVERSITIES } from '../constants';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import { GraduationCapIcon } from '../components/IconComponents';

interface UniFrogPageProps {
  user: User;
}

const Questionnaire: React.FC<{ onComplete: (results: University[]) => void }> = ({ onComplete }) => {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep(s => s + 1);

    const renderStep = () => {
        switch (step) {
            case 0: return (
                <div>
                    <h2 className="text-xl font-bold mb-4">What subjects are you passionate about?</h2>
                    <Input placeholder="e.g., Biology, Computer Science, Literature" />
                    <Button onClick={nextStep} className="mt-4">Next</Button>
                </div>
            )
            case 1: return (
                <div>
                    <h2 className="text-xl font-bold mb-4">Where in the world do you want to study?</h2>
                    <Input placeholder="e.g., Canada, UK, anywhere" />
                    <Button onClick={nextStep} className="mt-4">Next</Button>
                </div>
            )
            case 2: return (
                 <div>
                    <h2 className="text-xl font-bold mb-4">What's your estimated annual tuition budget?</h2>
                    <Input placeholder="e.g., $20,000" type="number" />
                    <Button onClick={() => onComplete(MOCK_UNIVERSITIES)} className="mt-4">Find My Matches</Button>
                </div>
            )
            default: return null;
        }
    }
    
    return (
        <Card className="text-center">
            <GraduationCapIcon className="w-12 h-12 text-primary mx-auto mb-4" />
            {renderStep()}
        </Card>
    );
};

const UniversityCard: React.FC<{ uni: University }> = ({ uni }) => (
    <Card>
        <h3 className="text-lg font-heading font-extrabold">{uni.name} <span className="font-semibold text-sm text-slate-500">({uni.country})</span></h3>
        <p className="font-semibold text-secondary my-1">{uni.program}</p>
        <div className="text-sm space-y-2 mt-3">
            <p><span className="font-bold">Entry:</span> {uni.entryRequirements}</p>
            <p><span className="font-bold">Cost:</span> {uni.costEstimate}</p>
            <p><span className="font-bold">Fit Score:</span> <span className="font-mono text-primary">{uni.fitScore}%</span></p>
        </div>
        <Button size="sm" variant="secondary" className="mt-4">View Details</Button>
    </Card>
);

const UniFrogPage: React.FC<UniFrogPageProps> = ({ user }) => {
  const [results, setResults] = useState<University[] | null>(null);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-heading font-extrabold text-text-primary">UniFrog University Finder</h1>
        <p className="text-slate-500 mt-1">Discover universities that match your profile and ambitions.</p>
      </header>

      {!results ? (
        <Questionnaire onComplete={setResults} />
      ) : (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Your Top Matches</h2>
                <Button onClick={() => setResults(null)} variant="secondary">Start Over</Button>
            </div>
             <div className="text-xs p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-lg mb-4">
                <strong>Disclaimer:</strong> These are AI-powered suggestions. Always verify entry requirements and program details on the university's official website.
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(uni => <UniversityCard key={uni.id} uni={uni} />)}
            </div>
        </div>
      )}
    </div>
  );
};

export default UniFrogPage;