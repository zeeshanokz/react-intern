import React from 'react';

function Toast({ message }) {
  let content = null;

  if (message) {
    const icon = (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );

    content = (
      <div className="fixed bottom-6 right-6 z-50 animate-bounce">
        <div className="bg-zinc-900 text-zinc-50 border border-zinc-700 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
          {icon}
          <span className="font-medium text-sm">{message}</span>
        </div>
      </div>
    );
  }

  return content;
}

export default Toast;