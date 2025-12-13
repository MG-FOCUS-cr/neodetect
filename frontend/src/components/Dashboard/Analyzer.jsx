import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../../services/api';

const Analyzer = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const handleAnalyze = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setLoading(true);
        setError(null);
        setResults([]);

        try {
            const { data } = await API.post('/analyze', { text });
            // The backend returns the whole Analysis object. 
            // We need to pass the neologisms list to the results state map.
            // But wait, the map loop in JSX uses `results.map`. 
            // The component expects `results` to be an array of items.
            // The backend returns `savedAnalysis` which has `neologismsFound` (array).
            if (data && data.neologismsFound) {
                setResults(data.neologismsFound);
            } else if (Array.isArray(data)) {
                setResults(data);
            } else {
                setResults([]);
            }
        } catch (err) {
            setError("Erreur lors de l'analyse. Veuillez réessayer.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles className="text-brand-500" />
                    Analyseur de Néologismes
                </h2>

                <form onSubmit={handleAnalyze}>
                    <div className="relative mb-4">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Collez votre texte ici (Darija, Français, Mélange)... Ex: 'Le hittiste attendait le bus.'"
                            className="input-field min-h-[150px] resize-none text-lg"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || !text}
                            className={`btn-primary flex items-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? <Loader className="animate-spin" /> : <Sparkles size={18} />}
                            {loading ? 'Analyse en cours...' : 'Lancer l\'analyse'}
                        </button>
                    </div>
                </form>

                {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
                        {error}
                    </div>
                )}
            </div>

            <AnimatePresence>
                {results.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {results.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-6 border-l-4 border-l-brand-500"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-slate-900">{item.term}</h3>
                                    <span className="text-xs font-bold px-2 py-1 rounded-full bg-brand-100 text-brand-700">
                                        {item.grammarCategory || 'Néologisme'}
                                    </span>
                                </div>
                                <p className="text-slate-800 mb-4 font-medium">{item.definition}</p>

                                <div className="space-y-3 text-sm text-slate-600">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-slate-50 p-2 rounded">
                                            <span className="font-bold text-xs uppercase text-slate-400 block">Origine</span>
                                            {item.origin}
                                        </div>
                                        <div className="bg-slate-50 p-2 rounded">
                                            <span className="font-bold text-xs uppercase text-slate-400 block">Région</span>
                                            {item.region}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="font-bold text-xs uppercase text-slate-400 block mb-1">Contexte</span>
                                        <p>{item.context}</p>
                                    </div>

                                    {item.examples && item.examples.length > 0 && (
                                        <div>
                                            <span className="font-bold text-xs uppercase text-slate-400 block mb-1">Exemples</span>
                                            <ul className="list-disc pl-4 italic">
                                                {item.examples.map((ex, i) => (
                                                    <li key={i}>{ex}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {item.culturalNote && (
                                        <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100 mt-2">
                                            <span className="font-bold text-xs uppercase text-yellow-600 block mb-1">Note Culturelle</span>
                                            <p className="text-yellow-800">{item.culturalNote}</p>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-slate-100">
                                        {item.synonyms && item.synonyms.map((syn, i) => (
                                            <span key={i} className="text-xs bg-slate-200 px-2 py-1 rounded text-slate-600 flex items-center gap-1">
                                                = {syn}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <button className="mt-6 w-full py-2 bg-brand-50 text-brand-600 rounded-lg text-sm font-medium hover:bg-brand-100 transition-colors flex justify-center items-center gap-2">
                                    <ArrowRight size={16} /> Ajouter au dictionnaire
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Analyzer;
