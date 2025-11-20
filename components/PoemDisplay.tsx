
import React from 'react';
import { Loader } from './Loader';

interface PoemDisplayProps {
  poem: string;
  isLoading: boolean;
  error: string | null;
}

export const PoemDisplay: React.FC<PoemDisplayProps> = ({ poem, isLoading, error }) => {
  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center p-4 bg-blue-50/50 rounded-lg border-2 border-dashed border-blue-200">
      {isLoading && <Loader />}
      {!isLoading && error && (
        <div className="text-center text-red-600">
          <p className="font-semibold">Oh no, a writer's block!</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
      {!isLoading && !error && !poem && (
        <div className="text-center text-slate-500">
          <p className="font-semibold">The canvas is ready.</p>
          <p className="text-sm">Your generated poem will appear here.</p>
        </div>
      )}
      {!isLoading && !error && poem && (
        <div className="w-full h-full overflow-y-auto">
          <p className="text-slate-700 whitespace-pre-wrap font-serif leading-relaxed">
            {poem}
          </p>
        </div>
      )}
    </div>
  );
};
