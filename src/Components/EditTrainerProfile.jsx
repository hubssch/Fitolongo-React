import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function EditTrainerProfile({ trainerId, onBack }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        location: '',
        gym_location: '',
        specialization: '',
        experience: '',
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTrainerData = async () => {
            const { data, error } = await supabase
                .from('trainers')
                .select('*')
                .eq('id', trainerId)
                .single();

            if (error) {
                console.error('Błąd podczas pobierania danych trenera:', error);
            } else {
                setFormData(data);
            }
        };

        fetchTrainerData();
    }, [trainerId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { error } = await supabase
            .from('trainers')
            .update(formData)
            .eq('id', trainerId);

        if (error) {
            console.error('Błąd podczas aktualizacji danych trenera:', error);
        } else {
            alert('Dane zostały zaktualizowane!');
        }

        setLoading(false);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center dark:bg-gray-900 dark:text-white">
            <button onClick={onBack} className="text-green-500 dark:text-green-300 mb-4">
                Powrót
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-green-800 dark:text-green-400">
                Edytuj Profil
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <input
                    type="text"
                    name="first_name"
                    placeholder="Imię"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md"
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Nazwisko"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Lokalizacja"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md"
                />
                <input
                    type="text"
                    name="gym_location"
                    placeholder="Siłownia"
                    value={formData.gym_location}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md"
                />
                <input
                    type="text"
                    name="specialization"
                    placeholder="Specjalizacja"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md"
                />
                <input
                    type="number"
                    name="experience"
                    placeholder="Doświadczenie (lata)"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md"
                />

                <button
                    type="submit"
                    className={`${
                        loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white py-2 px-4 rounded`}
                    disabled={loading}
                >
                    {loading ? 'Aktualizowanie...' : 'Zapisz zmiany'}
                </button>
            </form>
        </div>
    );
}
