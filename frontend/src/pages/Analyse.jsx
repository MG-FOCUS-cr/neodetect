import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import API from '../services/api';
import { Sparkles, Loader, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Analyse = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        if (!text.trim()) return;
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const { data } = await API.post('/analyze', { text });
            setResult(data);
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Impossible d'analyser le texte. Veuillez réessayer plus tard.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50">
            <Navbar />

            <main className="container mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-12 md:pb-20 max-w-5xl">
                <div className="text-center mb-12">
                    <h1 className="text-2xl md:text-4xl font-display font-bold text-slate-900 mb-4">
                        Analyse <span className="text-brand-600">Sociolinguistique</span>
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto text-base md:text-lg">
                        Décodez les néologismes dans le discours algérien d'expression française.
                    </p>
                </div>

                {/* Input Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 mb-12 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
                    <div className="relative">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Collez votre texte ici (ex: 'C’est un délire internet, les jeunes tesharji l’idée...')"
                            className="w-full min-h-[160px] p-6 text-lg text-slate-800 placeholder:text-slate-400 focus:outline-hidden resize-y rounded-xl"
                        />
                        <div className="absolute bottom-4 right-4 flex gap-3">
                            <button
                                onClick={() => setText('')}
                                className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                Effacer
                            </button>
                            <button
                                onClick={handleAnalyze}
                                disabled={loading || !text}
                                className={`btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl shadow-lg shadow-brand-500/20 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
                            >
                                {loading ? <Loader className="animate-spin" size={20} /> : <Sparkles size={20} />}
                                {loading ? 'Analyse en cours...' : 'Lancer l\'analyse'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results Section */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-12"
                        >
                            {/* Summary Card */}
                            <section className="bg-white rounded-2xl border-l-4 border-brand-500 shadow-sm p-8">
                                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                                    <Info size={24} className="text-brand-500" />
                                    Résumé Sociolinguistique
                                </h2>
                                <div className="bg-slate-50 p-4 rounded-xl mb-4 border border-slate-200">
                                    <h3 className="text-sm font-semibold text-slate-600 mb-2">Texte analysé :</h3>
                                    <p className="text-slate-700 italic text-sm leading-relaxed">"{text}"</p>
                                </div>
                                <p className="text-slate-700 leading-relaxed text-lg">
                                    {result.resume}
                                </p>
                            </section>

                            {/* Cards Grid */}
                            <section>
                                <h2 className="text-2xl font-bold text-slate-900 mb-6 px-2">Détails des Néologismes</h2>
                                {(!result.neologismsFound || result.neologismsFound.length === 0) ? (
                                    <p className="text-center text-slate-500 italic">Aucun néologisme ou expression spécifique détecté.</p>
                                ) : (
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                                        {result.neologismsFound.map((item, idx) => (
                                            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h3 className="text-2xl font-bold text-brand-600 font-display">{item.term}</h3>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                                                        {item.origin}
                                                    </span>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <p className="text-slate-500 text-xs uppercase font-bold mb-1">Définition</p>
                                                        <p className="text-slate-800 font-medium">{item.definition}</p>
                                                    </div>

                                                    {item.culturalExplanation && (
                                                        <div className="bg-slate-50 rounded-xl p-3">
                                                            <p className="text-slate-500 text-xs uppercase font-bold mb-1">Contexte Culturel</p>
                                                            <p className="text-slate-600 text-sm italic">"{item.culturalExplanation}"</p>
                                                        </div>
                                                    )}

                                                    {item.morphology && (
                                                        <div>
                                                            <p className="text-slate-500 text-xs uppercase font-bold mb-1">Morphologie</p>
                                                            <p className="text-slate-600 text-sm font-mono bg-yellow-50/50 p-2 rounded border border-yellow-100/50">{item.morphology}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && (
                    <div className="mt-8 p-4 bg-red-50 text-red-700 border border-red-100 rounded-xl text-center">
                        {error}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Analyse;
