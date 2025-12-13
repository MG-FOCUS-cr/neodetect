import React from 'react';
import { TrendingUp, Database, Zap, Activity } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${color}`}>
                <Icon size={22} />
            </div>
            {trend && (
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp size={12} /> {trend}
                </span>
            )}
        </div>
        <div className="space-y-1">
            <h3 className="text-slate-500 text-sm font-medium">{label}</h3>
            <p className="text-3xl font-bold text-slate-800">{value}</p>
        </div>
    </div>
);

const Stats = () => {
    // TODO: fetch data from /api/dashboard
    const stats = [
        { label: 'Analyses Totales', value: '1,284', icon: Zap, color: 'bg-brand-50 text-brand-600', trend: '+12%' },
        { label: 'Mots Approuvés', value: '843', icon: Database, color: 'bg-indigo-50 text-indigo-600', trend: '+5%' },
        { label: 'Taux de Confiance', value: '94%', icon: Activity, color: 'bg-emerald-50 text-emerald-600', trend: '+2.4%' },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, i) => (
                <StatCard key={i} {...stat} />
            ))}
        </div>
    );
};

export default Stats;
