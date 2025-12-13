import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Dashboard/Sidebar';
import Stats from '../components/Dashboard/Stats';
import WordGraph from '../components/Dashboard/WordGraph';
import HistoryList from '../components/Dashboard/HistoryList';
import DictionaryManager from '../components/Dashboard/DictionaryManager';
import OfficialDictionary from '../components/Dashboard/OfficialDictionary';
import AlgerianLexicon from '../components/Dashboard/AlgerianLexicon';
import { Search, Bell, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    return (
        <div className="min-h-screen bg-slate-50/50">
            {/* Sidebar for Desktop */}
            <Sidebar />

            {/* Mobile Navbar (preserved) */}
            <div className="lg:hidden">
                <Navbar />
            </div>

            {/* Main Content */}
            <main className="lg:ml-64 min-h-screen p-4 md:p-6 lg:p-10 pt-24 md:pt-28 lg:pt-10">
                <div className="max-w-7xl mx-auto">

                    {/* Header */}
                    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <div>
                            <h1 className="text-3xl font-display font-bold text-slate-900">Tableau de Bord</h1>
                            <p className="text-slate-500 mt-1">Gérez vos analyses linguistiques et surveillez les tendances.</p>
                        </div>

                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="relative hidden lg:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 w-48 xl:w-64"
                                />
                            </div>
                            <button className="p-2 md:p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:text-brand-600 hover:border-brand-200 transition-colors relative">
                                <Bell size={18} className="md:w-5 md:h-5" />
                                <span className="absolute top-1 right-1 md:top-2 md:right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                            </button>
                            <Link to="/analyse" className="btn-primary flex items-center gap-1 md:gap-2 py-2 md:py-2.5 px-3 md:px-4 shadow-brand-500/25 text-sm">
                                <Plus size={16} className="md:w-[18px] md:h-[18px]" />
                                <span className="hidden sm:inline">Nouvelle Analyse</span>
                                <span className="sm:hidden">Nouveau</span>
                            </Link>
                        </div>
                    </header>

                    {/* KPI Stats */}
                    <Stats />

                    {/* Dictionaries Section - Always Visible */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                        <OfficialDictionary />
                        <AlgerianLexicon />
                    </div>

                    {/* All Conversations Section */}
                    <div className="mb-8">
                        <HistoryList />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        {/* Main Analysis Section */}
                        <div className="xl:col-span-2 space-y-8">
                            {/* Graph Component */}
                            <WordGraph />
                        </div>

                        {/* Sidebar / Secondary Info */}
                        <div className="xl:col-span-1 space-y-6">

                            {/* Pro Tip Card */}
                            <div className="bg-gradient-to-br from-brand-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-brand-500/20 relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="font-bold text-lg mb-2">Astuce Pro 💡</h3>
                                    <p className="text-brand-100 text-sm mb-4 leading-relaxed">
                                        Utilisez le mode "Contexte" pour analyser des paragraphes entiers et détecter le code-switching.
                                    </p>
                                    <button className="text-sm font-medium bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                                        En savoir plus
                                    </button>
                                </div>
                                {/* Decor */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Dashboard;
