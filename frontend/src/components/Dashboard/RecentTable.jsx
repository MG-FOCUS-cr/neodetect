import React from 'react';
import { MoreHorizontal, Calendar, CheckCircle, Clock } from 'lucide-react';

const RecentTable = ({ words, loading }) => {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-lg">Analyses Récentes</h3>
                <button className="text-sm text-slate-500 hover:text-brand-600 font-medium">Voir tout</button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50/50 text-left">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Terme</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Définition</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Statut</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-slate-400">Chargement...</td>
                            </tr>
                        ) : words.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-slate-400 italic">Aucune donnée récente</td>
                            </tr>
                        ) : (
                            words.slice(0, 5).map((word) => (
                                <tr key={word._id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-900">{word.term}</div>
                                        <div className="text-xs text-slate-500">{word.origin || 'Inconnu'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-600 line-clamp-1 max-w-xs">{word.definition}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        {word.status === 'approved' ? (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                <CheckCircle size={10} /> Validé
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
                                                <Clock size={10} /> En attente
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentTable;
