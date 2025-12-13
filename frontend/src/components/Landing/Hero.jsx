import React from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 px-6">
            <div className="container mx-auto text-center max-w-4xl relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-100/50 border border-brand-200 text-brand-700 text-sm font-medium mb-6 backdrop-blur-sm">
                        🚀 Plateforme IA avancée pour l'analyse néologique
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
                        Explorez la richesse du <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500">Lexique Algérien</span>
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Une plateforme intelligente pour détecter, analyser et archiver les néologismes, l'argot et les expressions culturelles de l'Algérie.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
                >
                    <Link to="/analyse" className="btn-primary flex items-center gap-2 group text-lg px-8">
                        Essayer l'analyse
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/apropos" className="btn-secondary text-lg px-8">
                        Qui sommes-nous ?
                    </Link>
                </motion.div>

                {/* Mockup / Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="glass-card p-2 rounded-2xl mx-auto max-w-3xl transform rotate-1 hover:rotate-0 transition-transform duration-500"
                >
                    <div className="bg-white/80 rounded-xl overflow-hidden border border-slate-100 shadow-inner">
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="flex-1 text-center text-xs text-slate-400 font-mono">analyser_texte.exe</div>
                        </div>
                        <div className="p-8 text-left">
                            <div className="flex gap-4 items-start mb-6">
                                <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0"></div>
                                <div className="bg-slate-100 rounded-2xl p-4 rounded-tl-none max-w-md">
                                    <p className="text-slate-700">"Hier j'ai vu un <span className="text-brand-600 font-bold bg-brand-100 px-1 rounded-sm">hittiste</span> qui attendait le bus..."</p>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start flex-row-reverse">
                                <div className="w-10 h-10 rounded-full bg-brand-100 shrink-0 flex items-center justify-center text-brand-600">
                                    <Search size={20} />
                                </div>
                                <div className="bg-white border border-brand-100 rounded-2xl p-4 rounded-tr-none max-w-md shadow-sm">
                                    <p className="text-brand-800 font-medium text-sm uppercase mb-1">Néologisme détecté</p>
                                    <h4 className="font-bold text-lg text-slate-900">Hittiste</h4>
                                    <p className="text-slate-600 text-sm mt-1">Personne désœuvrée qui passe son temps adossée aux murs. (De l'arabe "hit" = mur).</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
