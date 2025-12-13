import React, { useState } from 'react';

const Analyze = () => {
    const [text, setText] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        if (!text.trim()) return;

        setLoading(true);
        setError(null);
        setAnalysisResult(null);

        try {
            const response = await fetch('http://localhost:5000/api/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Une erreur est survenue lors de l\'analyse.');
            }

            setAnalysisResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Analyse Linguistique</h1>

            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <label htmlFor="analysis-text" className="block text-sm font-medium text-gray-700 mb-2">
                    Texte à analyser
                </label>
                <textarea
                    id="analysis-text"
                    rows="6"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                    placeholder="Entrez votre texte ici (ex: Sahit khoya, wach rak ?)..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={handleAnalyze}
                        disabled={loading || !text.trim()}
                        className={`px-6 py-2.5 rounded-lg font-medium text-white transition-all
              ${loading || !text.trim()
                                ? 'bg-indigo-300 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg'}`}
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Analyse en cours...
                            </span>
                        ) : 'Analyser le texte'}
                    </button>
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">
                        {error}
                    </div>
                )}
            </div>

            {analysisResult && (
                <div className="animate-fade-in">
                    <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-8 rounded-r-lg">
                        <h3 className="text-lg font-semibold text-indigo-900 mb-1">Résumé de l'analyse</h3>
                        <p className="text-indigo-800">{analysisResult.resume}</p>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Néologismes et Expressions Identifiés</h2>

                    {analysisResult.neologismsFound.length === 0 ? (
                        <p className="text-gray-500 italic">Aucun néologisme détecté dans ce texte.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {analysisResult.neologismsFound.map((item, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 flex flex-col">
                                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3">
                                        <h3 className="text-xl font-bold text-white">{item.term}</h3>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-100 bg-white/20 px-2 py-0.5 rounded mt-1 inline-block">
                                            {item.origin}
                                        </span>
                                    </div>
                                    <div className="p-5 flex-grow">
                                        <div className="mb-4">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Définition</h4>
                                            <p className="text-gray-700">{item.definition}</p>
                                        </div>

                                        {item.culturalExplanation && (
                                            <div className="mb-4">
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Contexte Culturel</h4>
                                                <p className="text-gray-600 text-sm italic">"{item.culturalExplanation}"</p>
                                            </div>
                                        )}

                                        {item.morphology && (
                                            <div>
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Morphologie</h4>
                                                <p className="text-gray-600 text-sm font-mono bg-gray-50 p-2 rounded">{item.morphology}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Analyze;
