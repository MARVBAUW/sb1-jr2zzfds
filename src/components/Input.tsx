import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="relative space-y-1">
      <label 
        htmlFor={props.id} 
        className="block text-sm font-medium text-gray-300"
      >
        {label}
      </label>
      <input
        {...props}
        className={`block w-full px-4 py-2.5 text-base text-gray-200 
          bg-dark-700/50 border border-dark-400/30 rounded-lg
          placeholder:text-gray-500
          hover:border-dark-400/50
          focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500/50
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200
          ${error ? 'border-red-500/50 focus:ring-red-500/20 focus:border-red-500/50' : ''}
          ${className}`}
      />
      {error && (
        <p className="absolute -bottom-6 left-0 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}