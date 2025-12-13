import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp } from 'lucide-react';

const WordGraph = () => {
    // Mock data for visualization - in a real app, this would come from a specific aggregation endpoint
    const data = [
        { label: 'Hittiste', value: 85, color: 'bg-brand-500' },
        { label: 'Chkoupi', value: 65, color: 'bg-purple-500' },
        { label: 'Garantita', value: 45, color: 'bg-pink-500' },
        { label: 'Walou', value: 30, color: 'bg-indigo-500' },
        { label: 'Sahit', value: 20, color: 'bg-sky-500' },
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 flex flex-col h-full min-h-[400px]">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <BarChart2 className="text-brand-600" size={24} />
                        Tendances Lexicales
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">Termes les plus analysés cette semaine</p>
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <TrendingUp size={14} /> +24% trafic
                </div>
            </div>

            <div className="flex-1 flex items-end justify-between gap-4 h-64 border-b border-slate-100 pb-4 relative">
                {/* Y-Axis Lines (Decorative) */}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between pointer-events-none opacity-50 z-0">
                    <div className="w-full h-px border-t border-dashed border-slate-100"></div>
                    <div className="w-full h-px border-t border-dashed border-slate-100"></div>
                    <div className="w-full h-px border-t border-dashed border-slate-100"></div>
                    <div className="w-full h-px border-t border-dashed border-slate-100"></div>
                </div>

                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center justify-end w-full h-full group z-10 relative">
                        {/* Tooltip */}
                        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs py-1 px-2 rounded mb-2 whitespace-nowrap z-20 pointer-events-none">
                            {item.value} recherches
                        </div>

                        {/* Bar */}
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${item.value}%` }}
                            transition={{ duration: 1, delay: index * 0.1, type: "spring" }}
                            className={`w-full max-w-[60px] rounded-t-xl ${item.color} opacity-80 group-hover:opacity-100 transition-all relative overflow-hidden`}
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/10 to-transparent"></div>
                        </motion.div>

                        {/* Label */}
                        <span className="mt-4 text-xs font-medium text-slate-500 uppercase tracking-wide truncate w-full text-center">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WordGraph;
