import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
    {
        name: "Découverte",
        price: "Gratuit",
        period: "",
        desc: "Pour les curieux et les étudiants.",
        features: ["5 analyses gratuites", "Accès partiel au lexique", "Pubs discrètes"]
    },
    {
        name: "Chercheur",
        price: "2000 DA",
        period: "/ mois",
        desc: "Pour les académiciens et linguistes.",
        features: ["Analyses illimitées", "Export CSV/JSON", "API access", "Support prioritaire"],
        popular: true
    },
    {
        name: "Institution",
        price: "5000 DA",
        period: "",
        desc: "Pour les universités et laboratoires.",
        features: ["Licence multi-utilisateurs", "Intégration sur mesure", "Formation incluse"]
    }
];

const Pricing = () => {
    const [yearly, setYearly] = useState(false);

    return (
        <section className="py-20 px-6 overflow-hidden">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Tarification Simple</h2>
                    <p className="text-slate-600 mb-8">Choisissez le plan qui correspond à vos besoins.</p>

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <span className={`text-sm font-medium ${!yearly ? 'text-slate-900' : 'text-slate-400'}`}>Mensuel</span>
                        <button
                            onClick={() => setYearly(!yearly)}
                            className="w-14 h-8 bg-brand-100 rounded-full p-1 relative transition-colors duration-300"
                        >
                            <div className={`w-6 h-6 bg-brand-600 rounded-full shadow-md transform transition-transform duration-300 ${yearly ? 'translate-x-6' : 'translate-x-0'}`}></div>
                        </button>
                        <span className={`text-sm font-medium ${yearly ? 'text-slate-900' : 'text-slate-400'}`}>Annuel <span className="text-brand-600 text-xs ml-1 font-bold">-20%</span></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative p-8 rounded-3xl backdrop-blur-md border ${plan.popular ? 'bg-white/90 border-brand-200 shadow-xl scale-105 z-10' : 'bg-white/60 border-white/40 shadow-glass'}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                                    POPULAIRE
                                </div>
                            )}
                            <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.name}</h3>
                            <div className="mb-4">
                                <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                                <span className="text-slate-500 text-sm">{plan.period}</span>
                            </div>
                            <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100">{plan.desc}</p>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feat, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm text-slate-700">
                                        <div className="w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                                            <Check size={12} />
                                        </div>
                                        {feat}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-3 rounded-xl font-medium transition-all ${plan.popular ? 'bg-brand-600 text-white hover:bg-brand-700 shadow-lg hover:shadow-brand-500/25' : 'bg-white border border-slate-200 text-slate-700 hover:border-brand-500 hover:text-brand-600'}`}>
                                Commencer
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
