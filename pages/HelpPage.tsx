import React from 'react';
import Card from '../components/shared/Card';
import { IBO_LINKS } from '../constants';
import { ExternalLinkIcon } from '../components/IconComponents';

const ResourceLink: React.FC<{ href: string, title: string, description: string }> = ({ href, title, description }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
        <div className="flex justify-between items-center">
            <div>
                <h3 className="font-bold text-secondary">{title}</h3>
                <p className="text-sm text-slate-500 mt-1">{description}</p>
            </div>
            <ExternalLinkIcon className="w-5 h-5 text-slate-400" />
        </div>
    </a>
)

const HelpPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-heading font-extrabold text-text-neutral">Help & Resources</h1>
        <p className="text-slate-500 mt-1">Access official IB guides and learn more about IBPolina.</p>
      </header>

      <Card>
        <h2 className="text-xl font-heading font-bold mb-4">Official IB Websites</h2>
        <div className="space-y-4">
            <ResourceLink href={IBO_LINKS.DP_HOME} title="Diploma Programme (DP)" description="Official curriculum, core requirements, and assessment information." />
            <ResourceLink href={IBO_LINKS.CP_HOME} title="Career-related Programme (CP)" description="Learn about the CP framework, core, and career-related studies." />
            <ResourceLink href={IBO_LINKS.MYP_HOME} title="Middle Years Programme (MYP)" description="Information for MYP students and programme structure." />
            <ResourceLink href={IBO_LINKS.HOME} title="IBO Homepage" description="The main portal for the International Baccalaureate organization." />
        </div>
      </Card>
       <Card>
        <h2 className="text-xl font-heading font-bold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2 text-sm">
            <details className="p-2 border-b">
                <summary className="font-semibold cursor-pointer">How does the Smart Planner work?</summary>
                <p className="mt-2 text-slate-600">The Smart Planner uses your deadlines and subject weaknesses to suggest an optimal study schedule. This is an AI-assisted feature designed to help you organize your time effectively.</p>
            </details>
             <details className="p-2 border-b">
                <summary className="font-semibold cursor-pointer">Is my data private?</summary>
                <p className="mt-2 text-slate-600">Yes. We are committed to student privacy and follow strict data protection policies. Social features are opt-in, and your personal progress is not shared without your consent.</p>
            </details>
        </div>
      </Card>
    </div>
  );
};

export default HelpPage;
