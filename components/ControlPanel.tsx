
import React from 'react';
import { PoemType } from '../types';
import { Slider } from './Slider';

interface ControlPanelProps {
  subject: string;
  setSubject: (subject: string) => void;
  poemType: PoemType;
  setPoemType: (type: PoemType) => void;
  temperature: number;
  setTemperature: (temp: number) => void;
  maxTokens: number;
  setMaxTokens: (tokens: number) => void;
  isLoading: boolean;
  onGenerate: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  subject,
  setSubject,
  poemType,
  setPoemType,
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  isLoading,
  onGenerate,
}) => {
  return (
    <div className="flex flex-col space-y-6 h-full">
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g., a quiet morning rain"
          className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Poem Type</label>
        <div className="flex space-x-4">
          {/* FIX: Correctly iterate over PoemType enum values. The previous method caused a type error by incorrectly casting enum values to keys. */}
          {Object.values(PoemType).map((typeValue) => (
             <button
                key={typeValue}
                onClick={() => setPoemType(typeValue)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 ${
                    poemType === typeValue
                    ? 'bg-pink-500 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-pink-100'
                }`}
                >
                {typeValue}
            </button>
          ))}
        </div>
      </div>

      <Slider
        label="Creativity (Temperature)"
        min={0}
        max={1}
        step={0.1}
        value={temperature}
        onChange={(e) => setTemperature(parseFloat(e.target.value))}
      />

      <Slider
        label="Maximum Length (Tokens)"
        min={50}
        max={500}
        step={10}
        value={maxTokens}
        onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
      />

      <div className="flex-grow"></div>
      
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-md"
      >
        {isLoading ? 'Crafting...' : 'Generate Poem'}
      </button>
    </div>
  );
};
