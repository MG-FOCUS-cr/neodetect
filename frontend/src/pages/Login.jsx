import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API from '../services/api';
import { ArrowRight, Loader } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { data } = await API.post('/auth/login', { email, password });
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
            <Navbar />

            <div className="glass-card p-8 w-full max-w-md">
                <h2 className="text-3xl font-bold mb-2 text-center">Bienvenue</h2>
                <p className="text-slate-500 text-center mb-8">Connectez-vous à AlgerLex</p>

                {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            placeholder="vous@exemple.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input-field"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary flex justify-center items-center gap-2 mt-6"
                    >
                        {loading ? <Loader className="animate-spin" size={20} /> : 'Se connecter'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Pas encore de compte ? <Link to="/register" className="text-brand-600 font-bold hover:underline">Créer un compte</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
