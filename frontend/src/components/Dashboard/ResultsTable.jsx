import React, { useEffect, useState } from 'react';
import { Trash2, Check, X, Search, Filter } from 'lucide-react';
import { getWords, updateStatus, deleteWord } from '../../services/api';

const ResultsTable = () => {
    const [words, setWords] = useState([]);
    const [filter, setFilter] = useState('all');

    const fetchWords = async () => {
        try {
            const { data } = await getWords();
            setWords(data);
        } catch (error) {
            console.error("Failed to fetch words", error);
        }
    };

    useEffect(() => {
        fetchWords();
        // Listen for updates from Analyzer
        window.addEventListener('neologismAdded', fetchWords);
        return () => window.removeEventListener('neologismAdded', fetchWords);
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            await updateStatus(id, newStatus);
            fetchWords();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this word?")) return;
        try {
            await deleteWord(id);
            fetchWords();
        } catch (error) {
            console.error("Failed to delete word", error);
        }
    };

    const filteredWords = words.filter(w => filter === 'all' || w.status === filter);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
            <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="font-bold text-gray-800">Detected Neologisms</h3>

                <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                    {['all', 'detected', 'approved', 'rejected'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${filter === f ? 'bg-white shadow-sm text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-4 font-medium">Word</th>
                            <th className="px-6 py-4 font-medium">Type</th>
                            <th className="px-6 py-4 font-medium">Context</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredWords.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-8 text-center text-gray-400 text-sm">
                                    No words found. Try analyzing some text!
                                </td>
                            </tr>
                        ) : (
                            filteredWords.map((word) => (
                                <tr key={word._id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-primary">{word.word}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                                            {word.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={word.context}>
                                        {word.context}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={word.status} />
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        {word.status !== 'approved' && (
                                            <button onClick={() => handleStatusUpdate(word._id, 'approved')} className="p-1.5 rounded-full hover:bg-green-100 text-green-500 transition-colors" title="Approve">
                                                <Check className="w-4 h-4" />
                                            </button>
                                        )}
                                        {word.status !== 'rejected' && (
                                            <button onClick={() => handleStatusUpdate(word._id, 'rejected')} className="p-1.5 rounded-full hover:bg-red-100 text-red-500 transition-colors" title="Reject">
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(word._id)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors" title="Delete">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        detected: "bg-blue-100 text-blue-700",
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700"
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
            {status}
        </span>
    );
};

export default ResultsTable;
