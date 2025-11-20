
import { useState, useCallback } from 'react';
import { ControlPanel } from './components/ControlPanel';
import { PoemDisplay } from './components/PoemDisplay';
import { generatePoem } from './services/geminiService';
import { PoemType } from './types';

export default function App() {
  const [subject, setSubject] = useState<string>('');
  const [poemType, setPoemType] = useState<PoemType>(PoemType.HAIKU);
  const [temperature, setTemperature] = useState<number>(0.7);
  const [maxTokens, setMaxTokens] = useState<number>(100);
  const [generatedPoem, setGeneratedPoem] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePoem = useCallback(async () => {
    if (!subject.trim()) {
      setError('Please enter a subject for the poem.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedPoem('');

    let prompt = '';
    if (poemType === PoemType.HAIKU) {
      prompt = `Write a haiku (a Japanese poem of seventeen syllables, in three phrases of five, seven, and five) about the following subject: "${subject}".`;
    } else {
      prompt = `Write a sonnet (a poem of fourteen lines using any of a number of formal rhyme schemes, in English typically having ten syllables per line) about the following subject: "${subject}".`;
    }

    try {
      const poem = await generatePoem(prompt, temperature, maxTokens);
      setGeneratedPoem(poem);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [subject, poemType, temperature, maxTokens]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-pink-100 font-sans text-slate-800">
      <main className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
            AI Poet
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 border border-pink-100">
            <ControlPanel
              subject={subject}
              setSubject={setSubject}
              poemType={poemType}
              setPoemType={setPoemType}
              temperature={temperature}
              setTemperature={setTemperature}
              maxTokens={maxTokens}
              setMaxTokens={setMaxTokens}
              isLoading={isLoading}
              onGenerate={handleGeneratePoem}
            />
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100">
            <PoemDisplay
              poem={generatedPoem}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
