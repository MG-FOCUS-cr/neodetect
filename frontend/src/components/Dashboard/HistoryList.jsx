import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../services/api';
import { Clock, MessageSquare, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

const HistoryList = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const { data } = await API.get('/analyze/history');
                setHistory(data);
            } catch (err) {
                console.error("Failed to load history", err);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, []);

    if (loading) return <div className="p-4 text-center text-slate-400">Chargement de l'historique...</div>;
    if (history.length === 0) return <div className="p-4 text-center text-slate-400">Aucune conversation récente.</div>;

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                    <MessageSquare size={24} className="text-brand-500" />
                    Toutes les Conversations
                </h2>
                <span className="text-sm text-slate-500">{history.length} conversation(s)</span>
            </div>
            <div className="max-h-96 overflow-y-auto">
                <div className="divide-y divide-slate-50">
                    {history.map((item) => (
                        <Link key={item._id} to={`/analysis/${item._id}`} className="block p-4 hover:bg-slate-50 transition-colors group cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full">
                                    {item.neologismsFound?.length || 0} mots détectés
                                </span>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                    <Clock size={12} />
                                    {format(new Date(item.createdAt), 'dd MMMM, HH:mm', { locale: fr })}
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 line-clamp-2 mb-2 font-medium">"{item.originalText}"</p>
                            <p className="text-xs text-slate-400 line-clamp-1">{item.resume}</p>
                            <div className="flex items-center justify-end mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ChevronRight size={16} className="text-brand-500" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HistoryList;
