import React from 'react';
import { Database, Zap, Globe, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <Zap size={24} />,
        title: "Analyse Instantanée",
        desc: "Notre modèle IA détecte les néologismes algériens en quelques millisecondes.",
        col: "md:col-span-2",
        bg: "bg-white/80"
    },
    {
        icon: <Database size={24} />,
        title: "Base de Données",
        desc: "Accédez à des milliers de termes vérifiés.",
        col: "md:col-span-1",
        bg: "bg-brand-50/80"
    },
    {
        icon: <Users size={24} />,
        title: "Communauté",
        desc: "Les linguistes et chercheurs valident le contenu.",
        col: "md:col-span-1",
        bg: "bg-white/80"
    },
    {
        icon: <Globe size={24} />,
        title: "Multilingue",
        desc: "Support du Darija, Kabyle, Chaoui et des mélanges (Code-switching).",
        col: "md:col-span-2",
        bg: "bg-white/80"
    }
];

const Features = () => {
    return (
        <section id="features" className="py-20 px-6">
            <div className="container mx-auto max-w-5xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold mb-4">Une intelligence linguistique</h2>
                    <p className="text-slate-600 max-w-xl mx-auto">
                        AlgerLex combine la puissance des LLMs modernes avec l'expertise des chercheurs locaux.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`${feature.col} ${feature.bg} backdrop-blur-md rounded-3xl p-8 border border-white/40 shadow-glass hover:shadow-glass-hover transition-all duration-300`}
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-600 mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
