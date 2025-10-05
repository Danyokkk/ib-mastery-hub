import React from 'react';
import Button from '../components/shared/Button';
import Input from '../components/shared/Input';
import { GraduationCapIcon } from '../components/IconComponents';

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  return (
    <div className="bg-background-light w-full min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto">
        <div className="flex flex-col items-center text-center mb-8">
            <GraduationCapIcon className="h-16 w-16 text-secondary" />
            <h1 className="text-4xl font-heading font-extrabold text-secondary mt-2">IB Mastery Hub</h1>
            <p className="text-slate-500 mt-1">Study. Reflect. Level Up.</p>
        </div>

        <div className="bg-white p-8 rounded-4xl shadow-soft-md space-y-6">
           <Input id="email" type="email" label="Email Address" placeholder="alex.chen@ibstudent.com" />
           <Input id="password" type="password" label="Password" placeholder="••••••••" />
           
           <div className="flex items-center justify-between">
            <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-secondary border-slate-300 rounded focus:ring-secondary"/>
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
            <div className="text-sm">
                <a href="#" className="font-semibold text-secondary hover:underline">Forgot password?</a>
            </div>
           </div>
           
           <Button onClick={onLogin} fullWidth size="lg">
               Sign In
           </Button>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
                <Button variant="secondary" fullWidth>Google</Button>
                <Button variant="secondary" fullWidth>Apple</Button>
            </div>
            
            <p className="text-center text-sm text-slate-500">
                Not a member? <a href="#" className="font-semibold text-secondary hover:underline">Start your journey</a>
            </p>

        </div>
      </div>
    </div>
  );
};

export default AuthPage;