import React, { useEffect, useState, useRef } from 'react';

const StatItem = ({ end, label, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let start = 0;
                    const duration = 2000;
                    const increment = end / (duration / 16);

                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 16);

                    // Unobserve after start
                    if (ref.current) observer.unobserve(ref.current);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, [end]);

    return (
        <div ref={ref} className="text-center group">
            <div className="text-5xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-brand-600 to-brand-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                {count}{suffix}
            </div>
            <div className="text-slate-500 font-medium uppercase tracking-widest text-sm">
                {label}
            </div>
        </div>
    );
};

const Stats = () => {
    const stats = [
        { value: 1000, label: 'Utilisateurs', suffix: '+' },
        { value: 50, label: 'Études Réalisées', suffix: '' },
        { value: 7, label: 'Années de R&D', suffix: '' },
        { value: 9, label: 'Partenaires', suffix: '' },
    ];

    return (
        <section className="py-20 relative border-t border-slate-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {stats.map((stat, index) => (
                        <StatItem key={index} end={stat.value} label={stat.label} suffix={stat.suffix} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
