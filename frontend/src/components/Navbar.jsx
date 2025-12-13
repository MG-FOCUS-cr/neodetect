import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sparkles, Activity, FileText, Home } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Accueil', path: '/', icon: <Home size={18} /> },
        { name: 'Analyse', path: '/analyse', icon: <Activity size={18} /> },
        { name: 'À propos', path: '/apropos', icon: <FileText size={18} /> },
    ];

    return (
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-sm shadow-sm border-b border-slate-100 transition-all duration-300">
            <div className="container mx-auto px-6 h-20 flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-brand-500 text-white p-2 rounded-lg transform group-hover:rotate-12 transition-transform duration-300 shadow-md">
                        <Sparkles size={22} />
                    </div>
                    <span className="text-xl font-display font-bold text-slate-800 tracking-tight">Néo<span className="text-brand-600">Détect</span></span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        link.path.startsWith('#') ? (
                            <a
                                key={link.name}
                                href={link.path}
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50/50 rounded-full transition-all duration-200"
                            >
                                {link.icon}
                                {link.name}
                            </a>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-slate-600 hover:text-brand-600 hover:bg-brand-50/50 rounded-full transition-all duration-200"
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        )
                    ))}

                    <Link to="/dashboard" className="ml-4 btn-primary text-sm px-6 py-2.5 rounded-full shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30">
                        Tableau de Bord
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:text-brand-600 hover:bg-slate-50 rounded-full transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl overflow-hidden animate-in slide-in-from-top-2">
                    <div className="p-4 flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path.startsWith('#') ? '/' + link.path : link.path}
                                className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-brand-50 hover:text-brand-700 rounded-xl transition-colors font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            to="/dashboard"
                            className="mt-2 w-full btn-primary text-center justify-center flex items-center gap-2"
                            onClick={() => setIsOpen(false)}
                        >
                            Tableau de Bord
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
