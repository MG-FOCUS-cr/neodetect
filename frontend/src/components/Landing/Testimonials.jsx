import React from 'react';

const testimonials = [
    {
        quote: "NéoDétect révolutionne nos recherches sur les néologismes algériens. Un outil précis et scientifiquement rigoureux.",
        author: "Dr. Amira Khelifi",
        role: "Professeure en Linguistique",
        avatar: "https://ui-avatars.com/api/?name=Amira+Khelifi&background=3b82f6&color=fff&size=150"
    },
    {
        quote: "Grâce à cette plateforme, je peux analyser et comprendre l'évolution du français algérien dans mes articles.",
        author: "Karim Benali",
        role: "Journaliste culturel",
        avatar: "https://ui-avatars.com/api/?name=Karim+Benali&background=10b981&color=fff&size=150"
    },
    {
        quote: "L'analyse automatique des néologismes selon Sableyrolles est impressionnante. Un gain de temps considérable.",
        author: "Sarah Meziani",
        role: "Chercheuse en Sociolinguistique",
        avatar: "https://ui-avatars.com/api/?name=Sarah+Meziani&background=f59e0b&color=fff&size=150"
    },
    {
        quote: "Interface intuitive et résultats pertinents. NéoDétect facilite grandement l'étude des variétés francophones.",
        author: "Yacine Djebbar",
        role: "Étudiant en Master FLE",
        avatar: "https://ui-avatars.com/api/?name=Yacine+Djebbar&background=8b5cf6&color=fff&size=150"
    }
];

const Testimonials = () => {
    return (
        <section className="py-24 bg-slate-50 overflow-hidden relative">
            <div className="container mx-auto px-6 mb-12">
                <h2 className="text-3xl font-display font-bold text-center text-slate-900 mb-4">
                    La communauté en parle
                </h2>
                <div className="w-24 h-1 bg-brand-500 mx-auto rounded-full opacity-50"></div>
            </div>

            {/* Marquee Effect Container */}
            <div className="relative w-full">
                <div className="flex gap-8 animate-scroll whitespace-nowrap py-8 hover:pause">
                    {/* Double the list for infinite scroll effect */}
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <div key={i} className="inline-block w-[400px] glass-card p-8 rounded-2xl transform transition-transform hover:scale-105 cursor-pointer border border-white/40">
                            <div className="text-5xl text-brand-200 font-serif leading-none mb-4">“</div>
                            <p className="text-lg text-slate-700 font-medium whitespace-normal mb-6 relative z-10">
                                {t.quote}
                            </p>
                            <div className="flex items-center gap-3">
                                <img 
                                    src={t.avatar} 
                                    alt={t.author}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-400 to-purple-400 items-center justify-center text-white font-bold" style={{display: 'none'}}>
                                    {t.author[0]}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 text-sm">{t.author}</p>
                                    <p className="text-brand-600 text-xs uppercase tracking-wider">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
                <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
            </div>

            <style>{`
                .hover\\:pause:hover {
                    animation-play-state: paused;
                }
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
