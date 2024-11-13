import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function RegisterWindow({ onClose }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
                return;
            }

            console.log('User registered:', user);
            onClose(); // Zamknij formularz po rejestracji
        } catch (err) {
            setError('Coś poszło nie tak, spróbuj ponownie.');
            setLoading(false);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-4">Zarejestruj się</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Hasło</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-green-500 text-white px-6 py-2 rounded-md text-xl font-semibold transition-all duration-300 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-green-600"
                        >
                            {loading ? 'Rejestracja...' : 'Zarejestruj się'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-sm text-gray-500 hover:text-gray-700"
                        >
                            Anuluj
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
