import React from 'react';
import { Home, BarChart2, BookOpen, Settings, LogOut, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="hidden lg:flex flex-col w-64 h-screen bg-white border-r border-slate-100 fixed top-0 left-0 z-40">
            <div className="p-6 flex items-center gap-2 border-b border-slate-50">
                <div className="bg-brand-500 text-white p-1.5 rounded-lg shadow-sm">
                    <Sparkles size={20} />
                </div>
                <span className="text-lg font-display font-bold text-slate-800">Alger<span className="text-brand-600">Lex</span></span>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-brand-700 bg-brand-50 rounded-xl font-medium transition-colors">
                    <BarChart2 size={20} />
                    Tableau de bord
                </Link>

            </nav>

            <div className="p-4 border-t border-slate-50">
                <Link to="/" className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors">
                    <LogOut size={20} />
                    Quitter
                </Link>
            </div>
        </aside>
    );
};

export default Sidebar;
