import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Hash, FileText, Lightbulb } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import API from '../services/api';
import Navbar from '../components/Navbar';

const AnalysisDetail = () => {
    const { id } = useParams();
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                const { data } = await API.get(`/analyze/${id}`);
                setAnalysis(data);
            } catch (error) {
                console.error('Error fetching analysis:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalysis();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600 mx-auto mb-4"></div>
                    <p className="text-slate-600">Chargement de l'analyse...</p>
                </div>
            </div>
        );
    }

    if (!analysis) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <div className="pt-32 pb-20 px-6 text-center">
                    <h1 className="text-2xl font-bold text-slate-900 mb-4">Analyse introuvable</h1>
                    <Link to="/dashboard" className="btn-primary">Retour au tableau de bord</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl">
                    
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Link to="/dashboard" className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 mb-6">
                            <ArrowLeft size={20} />
                            Retour au tableau de bord
                        </Link>
                        
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-3xl font-bold text-slate-900">Détails de l'analyse</h1>
                            <span className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-sm font-medium">
                                {analysis.neologismsFound?.length || 0} néologismes
                            </span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-slate-500">
                            <span className="flex items-center gap-1">
                                <Clock size={16} />
                                {format(new Date(analysis.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                            </span>
                            <span className="flex items-center gap-1">
                                <Hash size={16} />
                                ID: {analysis._id}
                            </span>
                        </div>
                    </motion.div>

                    {/* Original Text */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-6 mb-8"
                    >
                        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <FileText className="text-brand-600" size={24} />
                            Texte original
                        </h2>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <p className="text-slate-700 leading-relaxed">{analysis.originalText}</p>
                        </div>
                    </motion.section>

                    {/* Resume */}
                    {analysis.resume && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="glass-card p-6 mb-8"
                        >
                            <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Lightbulb className="text-brand-600" size={24} />
                                Résumé de l'analyse
                            </h2>
                            <div className="bg-brand-50 p-4 rounded-xl border border-brand-200">
                                <p className="text-slate-700 leading-relaxed">{analysis.resume}</p>
                            </div>
                        </motion.section>
                    )}

                    {/* Neologisms Found */}
                    {analysis.neologismsFound && analysis.neologismsFound.length > 0 && (
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="glass-card p-6"
                        >
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Néologismes détectés</h2>
                            <div className="grid gap-4">
                                {analysis.neologismsFound.map((neologism, index) => (
                                    <div key={index} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                        <div className="flex items-start justify-between mb-3">
                                            <h3 className="text-lg font-bold text-brand-700">{neologism.word}</h3>
                                            {neologism.type && (
                                                <span className="bg-accent-100 text-accent-700 px-2 py-1 rounded-full text-xs font-medium">
                                                    {neologism.type}
                                                </span>
                                            )}
                                        </div>
                                        
                                        {neologism.definition && (
                                            <p className="text-slate-700 mb-3">{neologism.definition}</p>
                                        )}
                                        
                                        {neologism.context && (
                                            <div className="bg-slate-50 p-3 rounded-lg mb-3">
                                                <p className="text-sm text-slate-600">
                                                    <strong>Contexte:</strong> {neologism.context}
                                                </p>
                                            </div>
                                        )}
                                        
                                        {neologism.origin && (
                                            <p className="text-sm text-slate-500">
                                                <strong>Origine:</strong> {neologism.origin}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    )}

                </div>
            </div>
        </div>
    );
};

export default AnalysisDetail;