import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Messaging from './Messaging';

export default function TrainerProfile({ id, onBack }) {
    const [trainer, setTrainer] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pobieranie danych trenera i zdjęć
    useEffect(() => {
        const fetchTrainer = async () => {
            const { data: trainerData, error: trainerError } = await supabase
                .from('trainers')
                .select('*')
                .eq('id', id)
                .single();

            if (trainerError) {
                console.error('Błąd przy pobieraniu danych trenera:', trainerError);
            } else {
                setTrainer(trainerData);
            }

            const { data: photosData, error: photosError } = await supabase
                .from('trainer_photos')
                .select('*')
                .eq('trainer_id', id);

            if (photosError) {
                console.error('Błąd przy pobieraniu zdjęć:', photosError);
            } else {
                setPhotos(photosData);
            }

            setLoading(false);
        };

        fetchTrainer();
    }, [id]);

    if (loading) return <div className="text-center p-6">Ładowanie danych trenera...</div>;
    if (!trainer) return <div className="text-center p-6">Nie znaleziono danych trenera.</div>;

    return (
        <div className="trainer-profile bg-white p-6 rounded-lg shadow-md dark:bg-gray-900 dark:text-white">
            <button
                className="text-green-500 dark:text-green-300 mb-4"
                onClick={onBack}
            >
                Powrót
            </button>
            <Messaging />
            <div className="flex flex-col md:flex-row items-start md:items-start">
                {trainer.profile_image_url ? (
                    <img
                        src={trainer.profile_image_url}
                        alt="Zdjęcie profilowe"
                        className="w-40 h-40 md:w-60 md:h-60 mb-4 md:mb-0 border-4 border-blue-500 rounded-lg shadow-lg hover:scale-105 mr-4"
                    />
                ) : (
                    <div className="w-40 h-40 md:w-60 md:h-60 rounded-full bg-gray-300 dark:bg-gray-600 mr-4" />
                )}
                <div className="flex-2">
                    <h2 className="text-2xl font-semibold mb-4">{trainer.first_name} {trainer.last_name}</h2>
                    <p><strong>Pseudonim:</strong> {trainer.nickname}</p>
                    <p><strong>Lokalizacja:</strong> {trainer.location}</p>
                    <p><strong>Siłownia:</strong> {trainer.gym_location}</p>
                    <p><strong>Specjalizacja:</strong> {trainer.specialization}</p>
                    <p><strong>Doświadczenie:</strong> {trainer.experience} lata</p>
                    <p><strong>Ocena:</strong> {trainer.ratings}</p>
                </div>
            </div>
            <div className="mt-4">

            </div>

            <h3 className="text-xl font-semibold mt-6">Galeria zdjęć</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
                {photos.length > 0 ? (
                    photos.map((photo) => (
                        <img
                            key={photo.id}
                            src={photo.photo_url}
                            alt="Zdjęcie trenera"
                            className="rounded-lg shadow"
                        />
                    ))
                ) : (
                    <p>Brak zdjęć w galerii.</p>
                )}
            </div>
        </div>
    );
}
