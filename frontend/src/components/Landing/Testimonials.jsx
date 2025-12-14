import React from 'react';

const testimonials = [
    {
        quote: "NéoDétect révolutionne nos recherches sur les néologismes algériens. Un outil précis et scientifiquement rigoureux.",
        author: "Dr. Amira Khelifi",
        role: "Professeure  ",
        avatar: "https://ui-avatars.com/api/?name=Amira+Khelifi&background=3b82f6&color=fff&size=150"
    },
    {
        quote: "Grâce à cette plateforme, je peux analyser et comprendre l'évolution du français algérien dans mes articles.",
        author: "Karim Benali",
        role: "Journaliste      ",
        avatar: "https://ui-avatars.com/api/?name=Karim+Benali&background=10b981&color=fff&size=150"
    },
    {
        quote: "L'analyse automatique des néologismes selon Sableyrolles est impressionnante. Un gain de temps considérable.",
        author: "Sarah Meziani",
        role: "Sociolinguiste",
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
        <section className="py-12 md:py-24 bg-slate-50 overflow-hidden relative">
            <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-center text-slate-900 mb-4">
                    La communauté en parle
                </h2>
                <div className="w-16 md:w-24 h-1 bg-brand-500 mx-auto rounded-full opacity-50"></div>
            </div>

            {/* Marquee Effect Container */}
            <div className="relative w-full">
                <div className="flex gap-3 md:gap-8 animate-scroll whitespace-nowrap py-6 md:py-8 hover:pause">
                    {/* Double the list for infinite scroll effect */}
                    {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
                        <div key={i} className="inline-block w-[260px] sm:w-[300px] md:w-[400px] glass-card p-4 md:p-8 rounded-xl md:rounded-2xl transform transition-transform hover:scale-105 cursor-pointer border border-white/40">
                            <div className="text-2xl md:text-5xl text-brand-200 font-serif leading-none mb-2 md:mb-4">"</div>
                            <p className="text-xs sm:text-sm md:text-lg text-slate-700 font-medium whitespace-normal mb-3 md:mb-6 relative z-10 line-clamp-3 md:line-clamp-4 leading-relaxed">
                                {t.quote}
                            </p>
                            <div className="flex items-center gap-2 md:gap-3 overflow-hidden">
                                <img 
                                    src={t.avatar} 
                                    alt={t.author}
                                    className="w-8 h-8 md:w-12 md:h-12 rounded-full object-cover border-2 border-white shadow-sm flex-shrink-0"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-brand-400 to-purple-400 items-center justify-center text-white font-bold flex-shrink-0 text-xs md:text-base" style={{display: 'none'}}>
                                    {t.author[0]}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="font-bold text-slate-900 text-xs md:text-sm truncate">{t.author}</p>
                                    <p className="text-brand-600 text-[9px] md:text-[10px] uppercase tracking-wider truncate">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 h-full w-16 md:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
                <div className="absolute top-0 right-0 h-full w-16 md:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
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
                    animation: scroll 30s linear infinite;
                }
                @media (max-width: 768px) {
                    .animate-scroll {
                        animation: scroll 18s linear infinite;
                    }
                }
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                .line-clamp-4 {
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </section>
    );
};

export default Testimonials;
