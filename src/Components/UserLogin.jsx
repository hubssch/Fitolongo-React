import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function UserLogin({ onBack, onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Logowanie w Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            const userId = authData.user.id;

            // Sprawdzenie, czy użytkownik jest trenerem
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('id')
                .eq('id', userId)
                .single();

            if (userError) throw userError;

            // Przekazanie identyfikatora zalogowanego trenera
            onLogin(userId);
        } catch (err) {
            setError(err.message || 'Nie udało się zalogować.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow-md">
            <button onClick={onBack} className="text-green-500 mb-4">Powrót</button>
            <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Logowanie Trenera</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full p-3 border rounded"
                    required
                />
                <input
                    type="password"
                    placeholder="Hasło"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full p-3 border rounded"
                    required
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600"
                >
                    {isLoading ? 'Logowanie...' : 'Zaloguj się'}
                </button>
            </form>
        </div>
    );
}
