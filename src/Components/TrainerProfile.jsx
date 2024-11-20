import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function TrainerProfile({ id, onBack }) {
    const [trainer, setTrainer] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPhoto, setNewPhoto] = useState(null); // Do przechowywania przesłanego pliku

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

    // Obsługa przesyłania zdjęcia
    const handlePhotoUpload = async () => {
        if (!newPhoto) return;

        const fileName = `${id}-${Date.now()}.${newPhoto.name.split('.').pop()}`;
        const { data: storageData, error: storageError } = await supabase.storage
            .from('trainer-photos')
            .upload(fileName, newPhoto);

        if (storageError) {
            console.error('Błąd przy przesyłaniu pliku:', storageError);
            return;
        }

        const photoUrl = `${supabase.storage
            .from('trainer-photos')
            .getPublicUrl(fileName).data.publicUrl}`;

        const { error: insertError } = await supabase
            .from('trainer_photos')
            .insert({ trainer_id: id, photo_url: photoUrl });

        if (insertError) {
            console.error('Błąd przy zapisywaniu URL zdjęcia:', insertError);
        } else {
            setPhotos((prevPhotos) => [...prevPhotos, { photo_url: photoUrl }]);
            setNewPhoto(null);
        }
    };

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
            <h2 className="text-2xl font-semibold mb-4">{trainer.first_name} {trainer.last_name}</h2>
            {trainer.profile_image_url ? (
                <img
                    src={trainer.profile_image_url}
                    alt="Zdjęcie profilowe"
                    className="w-40 h-40 rounded-full mx-auto mb-4"
                />
            ) : (
                <div className="w-40 h-40 rounded-full mx-auto mb-4 bg-gray-300 dark:bg-gray-600" />
            )}

            <p><strong>Pseudonim:</strong> {trainer.nickname}</p>
            <p><strong>Lokalizacja:</strong> {trainer.location}</p>
            <p><strong>Siłownia:</strong> {trainer.gym_location}</p>
            <p><strong>Specjalizacja:</strong> {trainer.specialization}</p>
            <p><strong>Doświadczenie:</strong> {trainer.experience} lata</p>
            <p><strong>Ocena:</strong> {trainer.ratings}</p>

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

            <div className="mt-6">
                <h4 className="font-semibold">Dodaj nowe zdjęcie:</h4>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewPhoto(e.target.files[0])}
                    className="mt-2"
                />
                <button
                    onClick={handlePhotoUpload}
                    className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
                >
                    Prześlij zdjęcie
                </button>
            </div>
        </div>
    );
}
