import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function TrainerRegistration({ onBack }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    location: '',
    gym_location: '',
    specialization: '',
    experience: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { email, password, ...trainerData } = formData;

    try {
      // Rejestracja w Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      const userId = authData.user.id;

      // Dodanie danych do tabeli `trainers`
      const { error: insertError } = await supabase.from('trainers').insert([
        { id: userId, email, ...trainerData },
      ]);

      if (insertError) throw insertError;

      alert('Rejestracja zakończona sukcesem!');
      onBack();
    } catch (err) {
      setError(err.message || 'Wystąpił błąd podczas rejestracji.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white dark:bg-gray-800 rounded shadow-md">
      <button onClick={onBack} className="text-green-500 mb-4">Powrót</button>
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Rejestracja Trenera</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleRegistration} className="space-y-4">
        <input
          type="text"
          name="first_name"
          placeholder="Imię"
          value={formData.first_name}
          onChange={handleChange}
          className="block w-full p-3 border rounded"
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Nazwisko"
          value={formData.last_name}
          onChange={handleChange}
          className="block w-full p-3 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          className="block w-full p-3 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Hasło"
          value={formData.password}
          onChange={handleChange}
          className="block w-full p-3 border rounded"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Miasto"
          value={formData.location}
          onChange={handleChange}
          className="block w-full p-3 border rounded"
        />
        <input
          type="text"
          name="gym_location"
          placeholder="Siłownia"
          value={formData.gym_location}
          onChange={handleChange}
          className="block w-full p-3 border rounded"
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specjalizacja"
          value={formData.specialization}
          onChange={handleChange}
          className="block w-full p-3 border rounded"
        />
        <input
          type="number"
          name="experience"
          placeholder="Doświadczenie (lata)"
          value={formData.experience}
          onChange={handleChange}
          className="block w-full p-3 border rounded"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600"
        >
          {isLoading ? 'Rejestracja...' : 'Zarejestruj się'}
        </button>
      </form>
    </div>
  );
}
