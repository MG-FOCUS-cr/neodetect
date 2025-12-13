import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Plus, Edit2, Trash2, MapPin } from 'lucide-react';

const AlgerianLexicon = () => {
    const [words, setWords] = useState([]);
    const [newWord, setNewWord] = useState({ term: '', definition: '', origin: '', type: '' });
    const [showAddForm, setShowAddForm] = useState(false);
    
    console.log('AlgerianLexicon component rendered');

    const loadWords = async () => {
        try {
            const { data } = await API.get('/dictionary/algerian');
            setWords(data);
        } catch (err) {
            console.error('Error loading Algerian lexicon:', err);
            setWords([]); // Set empty array on error
        }
    };

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const { data } = await API.get('/dictionary/algerian');
                setWords(data);
            } catch (err) {
                console.error('Error loading Algerian lexicon:', err);
                setWords([]);
            }
        };
        fetchWords();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/dictionary/algerian', newWord);
            setWords([data, ...words]);
            setNewWord({ term: '', definition: '', origin: '', type: '' });
            setShowAddForm(false);
        } catch (error) {
            console.error('Error saving word:', error);
            alert('Erreur enregistrement');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Supprimer ce mot ?')) {
            try {
                await API.delete(`/dictionary/algerian/${id}`);
                setWords(words.filter(w => w._id !== id));
            } catch (error) {
                console.error('Error deleting word:', error);
                alert('Erreur suppression');
            }
        }
    };

    return (
        <div style={{backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <div className="flex justify-between items-center mb-6">
                <h3 style={{fontWeight: 'bold', fontSize: '20px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <MapPin style={{color: '#16a34a'}} />
                    Lexique Algérien
                </h3>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="btn-primary flex items-center gap-2 px-4 py-2 text-sm rounded-lg"
                >
                    <Plus size={16} /> Ajouter
                </button>
            </div>

            {showAddForm && (
                <form onSubmit={handleSave} className="bg-slate-50 p-4 rounded-xl mb-6 border border-slate-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            placeholder="Terme algérien"
                            className="input-field"
                            value={newWord.term}
                            onChange={e => setNewWord({ ...newWord, term: e.target.value })}
                            required
                        />
                        <select
                            className="input-field"
                            value={newWord.type}
                            onChange={e => setNewWord({ ...newWord, type: e.target.value })}
                        >
                            <option value="">Type de néologisme</option>
                            <option value="hybridation">Hybridation</option>
                            <option value="mot-valise">Mot-valise</option>
                            <option value="emprunt">Emprunt</option>
                            <option value="derivation">Dérivation</option>
                            <option value="composition">Composition</option>
                        </select>
                        <textarea
                            placeholder="Définition"
                            className="input-field min-h-20 md:col-span-2"
                            value={newWord.definition}
                            onChange={e => setNewWord({ ...newWord, definition: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Origine (arabe, tamazight, etc.)"
                            className="input-field md:col-span-2"
                            value={newWord.origin}
                            onChange={e => setNewWord({ ...newWord, origin: e.target.value })}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-slate-500 text-sm">Annuler</button>
                        <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                            Sauvegarder
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {words.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                        <MapPin size={48} className="mx-auto mb-4 text-slate-300" />
                        <p>Aucun mot dans le lexique algérien</p>
                        <p className="text-sm">Ajoutez des néologismes algériens</p>
                    </div>
                ) : (
                    words.map(word => (
                        <div key={word._id} className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-green-200 transition-all">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-slate-800">{word.term}</h4>
                                    {word.type && (
                                        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{word.type}</span>
                                    )}
                                </div>
                                <p className="text-sm text-slate-600 mt-1">{word.definition}</p>
                                {word.origin && (
                                    <p className="text-xs text-slate-500 mt-1">Origine: {word.origin}</p>
                                )}
                            </div>
                            <button onClick={() => handleDelete(word._id)} className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-600 rounded-lg">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AlgerianLexicon;