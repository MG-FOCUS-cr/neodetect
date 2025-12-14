import React from 'react';
import { TrendingUp, Eye } from 'lucide-react';

const trendingTerms = [
    { term: "hittiste", analyses: 127, trend: "+15%" },
    { term: "tchipa", analyses: 89, trend: "+8%" },
    { term: "baraka", analyses: 76, trend: "+12%" },
    { term: "wesh", analyses: 64, trend: "+5%" },
    { term: "khoya", analyses: 52, trend: "+18%" },
    { term: "bezef", analyses: 41, trend: "+7%" },
    { term: "chouf", analyses: 38, trend: "+22%" },
    { term: "wallah", analyses: 35, trend: "+3%" }
];

const LexicalTrends = () => {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <TrendingUp className="text-brand-600" size={20} />
                        Tendances Lexicales
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">Termes les plus analysés cette semaine</p>
                </div>
            </div>

            <div className="space-y-3">
                {trendingTerms.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-sm font-bold">
                                {index + 1}
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">{item.term}</p>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Eye size={12} />
                                    <span>{item.analyses} analyses</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                                {item.trend}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
                <button className="w-full text-sm text-brand-600 hover:text-brand-700 font-medium transition-colors">
                    Voir toutes les tendances →
                </button>
            </div>
        </div>
    );
};

export default LexicalTrends;