// src/Components/TrainersList.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function TrainersList() {
    const [trainers, setTrainers] = useState([]);
    const [filters, setFilters] = useState({
        location: '',
        gym_location: '',
        specialization: '',
        experience: '',
        rating: ''
    });

    // Predefiniowane wartości do filtrowania
    const locations = ['Warszawa', 'Kraków', 'Poznań', 'Wrocław'];
    const gymLocations = ['Gym XYZ', 'Fit Center', 'Body Gym', 'Power House'];
    const specializations = ['Trening siłowy', 'Fitness', 'Joga', 'Pilates'];

    // Funkcja do pobrania listy trenerów z filtrowaniem
    useEffect(() => {
        const fetchTrainers = async () => {
            let query = supabase.from('trainers').select('*');

            if (filters.location) {
                query = query.eq('location', filters.location);
            }
            if (filters.gym_location) {
                query = query.eq('gym_location', filters.gym_location);
            }
            if (filters.specialization) {
                query = query.ilike('specialization', `%${filters.specialization}%`);
            }
            if (filters.experience) {
                query = query.gte('experience', filters.experience);
            }
            if (filters.rating) {
                query = query.gte('ratings', filters.rating);
            }

            const { data, error } = await query;
            if (error) {
                console.error('Błąd przy pobieraniu trenerów:', error);
            } else {
                setTrainers(data);
            }
        };

        fetchTrainers();
    }, [filters]);

    // Aktualizacja wartości filtrów
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value
        }));
    };

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

            {/* Formularz filtrowania */}
            <div className="filter-form mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 shadow">
                <h3 className="text-lg font-semibold mb-2">Filtry:</h3>
                <div className="grid grid-cols-2 gap-4">
                    {/* Wybór lokalizacji */}
                    <select
                        name="location"
                        value={filters.location}
                        onChange={handleFilterChange}
                        className="p-2 rounded-md"
                    >
                        <option value="">Wybierz lokalizację</option>
                        {locations.map((loc) => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>

                    {/* Wybór siłowni */}
                    <select
                        name="gym_location"
                        value={filters.gym_location}
                        onChange={handleFilterChange}
                        className="p-2 rounded-md"
                    >
                        <option value="">Wybierz siłownię</option>
                        {gymLocations.map((gym) => (
                            <option key={gym} value={gym}>{gym}</option>
                        ))}
                    </select>

                    {/* Wybór specjalizacji */}
                    <select
                        name="specialization"
                        value={filters.specialization}
                        onChange={handleFilterChange}
                        className="p-2 rounded-md"
                    >
                        <option value="">Wybierz specjalizację</option>
                        {specializations.map((spec) => (
                            <option key={spec} value={spec}>{spec}</option>
                        ))}
                    </select>

                    {/* Doświadczenie */}
                    <input
                        type="number"
                        name="experience"
                        placeholder="Doświadczenie (lata)"
                        value={filters.experience}
                        onChange={handleFilterChange}
                        className="p-2 rounded-md"
                    />

                    {/* Ocena */}
                    <input
                        type="number"
                        step="0.1"
                        name="rating"
                        placeholder="Ocena minimalna"
                        value={filters.rating}
                        onChange={handleFilterChange}
                        className="p-2 rounded-md"
                    />
                </div>
            </div>

            {/* Lista trenerów */}
            <div className="trainer-list mt-4">
                {trainers.length ? (
                    trainers.map((trainer) => (
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
                            <p>{trainer.gym_location}</p>
                            <p>Specjalizacja: {trainer.specialization}</p>
                            <p>Doświadczenie: {trainer.experience} lata</p>
                            <p>Ocena: {trainer.ratings}</p>
                        </div>
                    ))
                ) : (
                    <p>Nie znaleziono trenerów spełniających kryteria.</p>
                )}
            </div>
        </div>
    );
}
