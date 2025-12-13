import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle } from 'lucide-react';
import API from '../../services/api';

const WordList = () => {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const { data } = await API.get('/words');
                setWords(data);
            } catch (error) {
                console.error("Failed to fetch words", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWords();
    }, []);

    if (loading) return <div className="text-center py-6 text-slate-400">Chargement du lexique...</div>;

    return (
        <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock size={20} className="text-brand-500" />
                Derniers ajouts
            </h2>

            <div className="space-y-4">
                {words.length === 0 ? (
                    <p className="text-slate-500 italic">Aucun mot dans le lexique pour l'instant.</p>
                ) : (
                    words.map((word) => (
                        <div key={word._id} className="p-4 rounded-xl bg-white/50 border border-slate-100 hover:border-brand-200 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-bold text-slate-800">{word.term}</h3>
                                {word.status === 'approved' && (
                                    <CheckCircle size={16} className="text-green-500" />
                                )}
                            </div>
                            <p className="text-sm text-slate-600 mb-2 line-clamp-2">{word.definition}</p>
                            <div className="flex gap-2">
                                <span className="text-xs bg-brand-50 text-brand-700 px-2 py-1 rounded-md">{word.origin}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default WordList;
