import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, Award, Lightbulb, Database, Search } from 'lucide-react';
import Navbar from '../components/Navbar';

const Apropos = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-brand-50/30">
            <Navbar />
            <div className="pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
                <div className="container mx-auto max-w-4xl px-2 md:px-0">
                    
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                            À propos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500">NéoDétect</span>
                        </h1>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            La première plateforme IA dédiée aux néologismes du français pratiqué en Algérie
                        </p>
                    </motion.div>

                    {/* Qui sommes-nous */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="glass-card p-8 mb-12"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <Users className="text-brand-600" size={28} />
                            Qui sommes-nous ?
                        </h2>
                        <div className="prose prose-slate max-w-none">
                            <p className="text-slate-700 leading-relaxed mb-4">
                                <strong>NéoDétect</strong> est une plateforme intelligente dédiée à la détection, l'analyse et la classification des néologismes et particularités du français pratiqué en Algérie.
                            </p>
                            <p className="text-slate-700 leading-relaxed mb-6">
                                Elle combine les avancées en linguistique, lexicologie, analyses néologiques et intelligence artificielle afin de documenter, comprendre et valoriser la créativité lexicale propre aux usages francophones algériens.
                            </p>
                            <div className="bg-brand-50/50 p-6 rounded-xl border border-brand-100">
                                <h4 className="font-semibold text-slate-900 mb-3">Notre objectif est de fournir un outil scientifique et technologique capable de :</h4>
                                <ul className="space-y-2 text-slate-700">
                                    <li>• repérer automatiquement les lexies néologiques dans un texte,</li>
                                    <li>• analyser chaque création lexicale selon la typologie complète de Jean-François Sableyrolles,</li>
                                    <li>• classer les néologismes à l'aide d'une grille détaillée (11–13 critères),</li>
                                    <li>• proposer des équivalents lexicaux ou interprétations pertinentes,</li>
                                    <li>• et alimenter une base évolutive du français pratiqué en Algérie.</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* Notre vision */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-card p-8 mb-12"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <Target className="text-brand-600" size={28} />
                            Notre vision
                        </h2>
                        <div className="prose prose-slate max-w-none">
                            <p className="text-slate-700 leading-relaxed mb-4">
                                Nous croyons que chaque langue évolue à travers ses locuteurs, leurs contextes sociaux, identitaires et culturels.
                                Le français en Algérie, façonné par le plurilinguisme, possède une dynamique néologique unique qui mérite d'être décrite, étudiée et valorisée.
                            </p>
                            <div className="bg-accent-50/50 p-6 rounded-xl border border-accent-100">
                                <h4 className="font-semibold text-slate-900 mb-3">NéoDétect vise à :</h4>
                                <ul className="space-y-2 text-slate-700">
                                    <li>• contribuer à la recherche sur les variétés francophones,</li>
                                    <li>• offrir un outil accessible aux chercheurs, enseignants, étudiants et institutions,</li>
                                    <li>• créer le premier répertoire intelligent des néologismes issus du français pratiqué en Algérie,</li>
                                    <li>• soutenir les approches modernes en didactique du FLE et en analyse du discours.</li>
                                </ul>
                            </div>
                        </div>
                    </motion.section>

                    {/* Notre expertise */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="glass-card p-8 mb-12"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <Award className="text-brand-600" size={28} />
                            Notre expertise
                        </h2>
                        <div className="prose prose-slate max-w-none">
                            <p className="text-slate-700 leading-relaxed mb-6">
                                <strong>NéoDétect</strong> est le fruit d'une collaboration entre des chercheurs en sciences du langage et en lexicologie, des spécialistes des phénomènes néologiques, des experts en traitement automatique du langage (TAL/NLP), et des développeurs d'applications IA.
                            </p>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-slate-50/50 p-6 rounded-xl border border-slate-100">
                                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                        <Database size={20} className="text-brand-600" />
                                        Le projet s'appuie sur :
                                    </h4>
                                    <ul className="space-y-2 text-slate-700 text-sm">
                                        <li>• un corpus authentique issu de travaux scientifiques</li>
                                        <li>• la typologie néologique de Sableyrolles</li>
                                        <li>• une architecture IA supervisée adaptée au français en contexte algérien</li>
                                        <li>• une base interne évolutive intégrant les nouvelles occurrences</li>
                                    </ul>
                                </div>
                                <div className="bg-brand-50/50 p-6 rounded-xl border border-brand-100">
                                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                        <Search size={20} className="text-brand-600" />
                                        Fonctionnalités clés :
                                    </h4>
                                    <ul className="space-y-2 text-slate-700 text-sm">
                                        <li>• Détection automatique des néologismes</li>
                                        <li>• Analyse selon les matrices de Sableyrolles</li>
                                        <li>• Classification détaillée (11-13 critères)</li>
                                        <li>• Base de données évolutive</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Notre engagement */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="glass-card p-8 mb-12"
                    >
                        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <Lightbulb className="text-brand-600" size={28} />
                            Notre engagement
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-slate-900 mb-3">Nous nous engageons à :</h4>
                                <ul className="space-y-2 text-slate-700">
                                    <li>• garantir une analyse linguistique fiable, rigoureuse et transparente,</li>
                                    <li>• respecter la richesse et la diversité des usages linguistiques algériens,</li>
                                    <li>• améliorer continuellement nos modèles grâce aux contributions des utilisateurs,</li>
                                    <li>• développer un outil qui allie scientificité, innovation et accessibilité.</li>
                                </ul>
                            </div>
                            <div className="bg-gradient-to-br from-brand-50 to-accent-50 p-6 rounded-xl border border-brand-100">
                                <h4 className="font-bold text-slate-900 mb-3">Notre ambition</h4>
                                <p className="text-slate-700 leading-relaxed">
                                    Faire de <strong>NéoDétect</strong> la référence numérique en matière d'analyse néologique en contexte francophone plurilingue, et une ressource incontournable pour les chercheurs, linguistes, enseignants, institutions et passionnés.
                                </p>
                            </div>
                        </div>
                    </motion.section>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                        className="text-center"
                    >
                        <div className="glass-card p-8">
                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                Prêt à explorer la richesse du français algérien ?
                            </h3>
                            <p className="text-slate-600 mb-6">
                                Découvrez notre outil d'analyse néologique et contribuez à la recherche linguistique.
                            </p>
                            <a href="/analyse" className="btn-primary inline-flex items-center gap-2">
                                Essayer NéoDétect
                                <Search size={18} />
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Apropos;