// src/Components/TrainersList.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function TrainersList() {
    const [trainers, setTrainers] = useState([]);

    // Funkcja do pobrania listy trenerów
    useEffect(() => {
        const fetchTrainers = async () => {
            const { data, error } = await supabase
                .from('trainers')
                .select('*'); // Pobieranie wszystkich danych, w tym URL zdjęcia profilowego

            if (error) {
                console.error('Błąd przy pobieraniu trenerów:', error);
            } else {
                setTrainers(data);
            }
        };

        fetchTrainers();
    }, []);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center dark:bg-gray-900 dark:text-white">
            <button
                className="text-green-500 dark:text-green-300 mb-4"
                onClick={() => window.location.reload()}
            >
                Powrót do strony głównej
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-green-800 dark:text-green-400">
                Lista Trenerów
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
                Znajdź trenera, który pomoże Ci osiągnąć cele!
            </p>

            <div className="trainer-list mt-4">
                {trainers.map((trainer) => (
                    <div key={trainer.id} className="trainer-card p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 shadow">
                        {trainer.profile_image_url ? (
                            <img
                                src={trainer.profile_image_url}
                                alt="Zdjęcie profilowe"
                                className="w-20 h-20 rounded-full mx-auto mb-2"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full mx-auto mb-2 bg-gray-300 dark:bg-gray-600" />
                        )}
                        <p className="font-bold">{trainer.first_name} {trainer.last_name}</p>
                        <p>{trainer.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
