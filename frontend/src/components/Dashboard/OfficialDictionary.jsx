import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Plus, Edit2, Trash2, BookOpen } from 'lucide-react';

const OfficialDictionary = () => {
    const [words, setWords] = useState([]);
    const [newWord, setNewWord] = useState({ term: '', definition: '' });
    const [showAddForm, setShowAddForm] = useState(false);
    
    console.log('OfficialDictionary component rendered');

    useEffect(() => {
        loadWords();
    }, []);

    const loadWords = async () => {
        try {
            const { data } = await API.get('/dictionary/official');
            setWords(data);
        } catch (err) {
            console.error('Error loading official dictionary:', err);
            setWords([]); // Set empty array on error
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/dictionary/official', newWord);
            setWords([data, ...words]);
            setNewWord({ term: '', definition: '' });
            setShowAddForm(false);
        } catch (err) {
            alert('Erreur enregistrement');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Supprimer ce mot ?')) {
            try {
                await API.delete(`/dictionary/official/${id}`);
                setWords(words.filter(w => w._id !== id));
            } catch (err) {
                alert('Erreur suppression');
            }
        }
    };

    return (
        <div style={{backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}>
            <div className="flex justify-between items-center mb-6">
                <h3 style={{fontWeight: 'bold', fontSize: '20px', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <BookOpen style={{color: '#2563eb'}} />
                    Dictionnaire Officiel
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
                    <div className="grid gap-4 mb-4">
                        <input
                            placeholder="Terme français"
                            className="input-field"
                            value={newWord.term}
                            onChange={e => setNewWord({ ...newWord, term: e.target.value })}
                            required
                        />
                        <textarea
                            placeholder="Définition officielle"
                            className="input-field min-h-[80px]"
                            value={newWord.definition}
                            onChange={e => setNewWord({ ...newWord, definition: e.target.value })}
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 text-slate-500 text-sm">Annuler</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                            Sauvegarder
                        </button>
                    </div>
                </form>
            )}

            <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {words.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                        <BookOpen size={48} className="mx-auto mb-4 text-slate-300" />
                        <p>Aucun mot dans le dictionnaire officiel</p>
                        <p className="text-sm">Ajoutez des mots français standards</p>
                    </div>
                ) : (
                    words.map(word => (
                        <div key={word._id} className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-blue-200 transition-all">
                            <div>
                                <h4 className="font-bold text-slate-800">{word.term}</h4>
                                <p className="text-sm text-slate-600 mt-1">{word.definition}</p>
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

export default OfficialDictionary;