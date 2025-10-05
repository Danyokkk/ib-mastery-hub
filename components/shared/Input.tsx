import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, id, className, error, ...props }) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-bold font-heading text-slate-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`block w-full px-4 py-3 text-base font-sans bg-[#F3F4F6] border border-[rgba(55,65,81,0.1)] rounded-xl shadow-inset-soft placeholder-[#9CA3AF] text-[#111827] transition-all duration-200 ease-in-out input-glow-focus ${error ? 'border-danger focus:ring-danger' : 'border-slate-300'} ${className}`}
        {...props}
      />
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
};

export default Input;
