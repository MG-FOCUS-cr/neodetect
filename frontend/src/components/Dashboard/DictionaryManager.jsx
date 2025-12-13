import React, { useState, useEffect } from 'react';
import API from '../../services/api';
import { Plus, Edit2, Trash2, Save, X, Book } from 'lucide-react';

const DictionaryManager = () => {
    const [words, setWords] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [newWord, setNewWord] = useState({ term: '', definition: '', origin: '', tags: '' });
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        loadWords();
    }, []);

    const loadWords = async () => {
        try {
            const { data } = await API.get('/words');
            setWords(data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Supprimer ce mot ?')) {
            try {
                await API.delete(`/words/${id}`);
                setWords(words.filter(w => w._id !== id));
            } catch (err) {
                alert('Erreur suppression');
            }
        }
    };

    const handleEdit = (word) => {
        setIsEditing(word._id);
        const tagsString = word.tags ? word.tags.join(', ') : '';
        setNewWord({ term: word.term, definition: word.definition, origin: word.origin, tags: tagsString });
        setShowAddForm(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const tagsArray = newWord.tags.split(',').map(t => t.trim());

            if (isEditing) {
                // Update existing
                const { data } = await API.put(`/words/${isEditing}`, { ...newWord, tags: tagsArray });
                setWords(words.map(w => w._id === isEditing ? data : w));
                setIsEditing(null);
            } else {
                // Add new
                const { data } = await API.post('/words', { ...newWord, tags: tagsArray });
                setWords([data, ...words]);
            }

            setNewWord({ term: '', definition: '', origin: '', tags: '' });
            setShowAddForm(false);
        } catch (err) {
            alert('Erreur enregistrement');
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-xl text-slate-900 flex items-center gap-2">
                    <Book className="text-brand-600" /> Dictionnaire (CRUD)
                </h3>
                <button
                    onClick={() => {
                        setIsEditing(null);
                        setNewWord({ term: '', definition: '', origin: '', tags: '' });
                        setShowAddForm(!showAddForm);
                    }}
                    className="btn-primary flex items-center gap-2 px-4 py-2 text-sm rounded-lg"
                >
                    <Plus size={16} /> {showAddForm ? 'Fermer' : 'Ajouter un mot'}
                </button>
            </div>

            {/* Form */}
            {showAddForm && (
                <form onSubmit={handleSave} className="bg-slate-50 p-4 rounded-xl mb-6 border border-slate-200 animate-in slide-in-from-top-2">
                    <h4 className="font-bold text-slate-700 mb-3">{isEditing ? 'Modifier le mot' : 'Nouveau Mot'}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input
                            placeholder="Terme (ex: Khobzist)"
                            className="input-field"
                            value={newWord.term}
                            onChange={e => setNewWord({ ...newWord, term: e.target.value })}
                            required
                        />
                        <input
                            placeholder="Origine (ex: Politique)"
                            className="input-field"
                            value={newWord.origin}
                            onChange={e => setNewWord({ ...newWord, origin: e.target.value })}
                        />
                        <div className="md:col-span-2">
                            <textarea
                                placeholder="Définition complète..."
                                className="input-field min-h-[80px]"
                                value={newWord.definition}
                                onChange={e => setNewWord({ ...newWord, definition: e.target.value })}
                                required
                            />
                        </div>
                        <input
                            placeholder="Tags (séparés par virgules)"
                            className="input-field md:col-span-2"
                            value={newWord.tags}
                            onChange={e => setNewWord({ ...newWord, tags: e.target.value })}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => { setShowAddForm(false); setIsEditing(null); }} className="px-4 py-2 text-slate-500 text-sm">Annuler</button>
                        <button type="submit" className="px-4 py-2 bg-brand-600 text-white rounded-lg text-sm hover:bg-brand-700">
                            {isEditing ? 'Mettre à jour' : 'Sauvegarder'}
                        </button>
                    </div>
                </form>
            )}

            {/* List */}
            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {words.map(word => (
                    <div key={word._id} className="group flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-brand-200 hover:shadow-sm transition-all">
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-bold text-slate-800">{word.term}</h4>
                                <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{word.origin}</span>
                            </div>
                            <p className="text-sm text-slate-600 mt-1 line-clamp-1">{word.definition}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(word)} className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg">
                                <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(word._id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DictionaryManager;
