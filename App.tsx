
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptForm } from './components/PromptForm';
import { ModelViewer } from './components/ModelViewer';
import { LoadingIndicator } from './components/LoadingIndicator';
import { generate3dModel } from './services/geminiService';
import type { GeneratedModel } from './types';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [generatedModel, setGeneratedModel] = useState<GeneratedModel | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Please enter a description for the 3D model.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedModel(null);

    try {
      const result = await generate3dModel(prompt);
      setGeneratedModel(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to generate model. ${errorMessage}`);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans antialiased">
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-lg text-gray-400 mb-8">
            Describe any object you can imagine, and our AI will generate a beautiful 3D model render for you.
          </p>
          <PromptForm
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          {error && (
            <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p>{error}</p>
            </div>
          )}
          <div className="mt-10">
            {isLoading && <LoadingIndicator />}
            {generatedModel && !isLoading && (
              <ModelViewer
                imageUrl={generatedModel.imageUrl}
                title={generatedModel.title}
              />
            )}
            {!isLoading && !generatedModel && (
                 <div className="text-center py-16 px-6 border-2 border-dashed border-gray-700 rounded-xl">
                    <div className="text-5xl mb-4 text-gray-600">
                        &#128444;&#65039;
                    </div>
                    <h3 className="text-xl font-semibold text-gray-400">Your 3D Model Awaits</h3>
                    <p className="text-gray-500 mt-2">Enter a description above to begin generating.</p>
                </div>
            )}
          </div>
        </div>
      </main>
       <footer className="text-center py-6 text-gray-600 text-sm">
        <p>Powered by Gemini API</p>
      </footer>
    </div>
  );
};

export default App;
