import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function TrainerProfile({ id, onBack }) {
    const [trainer, setTrainer] = useState(null); // Dane trenera
    const [formData, setFormData] = useState(null); // Dane do edycji
    const [isEditing, setIsEditing] = useState(false); // Stan edycji
    const [isLoading, setIsLoading] = useState(true); // Stan ładowania

    useEffect(() => {
        const fetchTrainer = async () => {
            const { data, error } = await supabase
                .from('trainers')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Błąd podczas pobierania danych trenera:', error);
            } else {
                setTrainer(data);
                setFormData(data);
            }
            setIsLoading(false);
        };

        fetchTrainer();
    }, [id]);

    const handleSave = async () => {
        const { data, error } = await supabase
            .from('trainers')
            .update({
                first_name: formData.first_name,
                last_name: formData.last_name,
                profile_image_url: formData.profile_image_url,
                location: formData.location,
                gym_location: formData.gym_location,
                specialization: formData.specialization,
                experience: formData.experience,
                ratings: formData.ratings
            })
            .eq('id', id);

        if (error) {
            console.error('Błąd podczas zapisywania danych:', error);
        } else {
            setTrainer(data[0]);
            setIsEditing(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    if (isLoading) return <div>Ładowanie danych trenera...</div>;
    if (!trainer) return <div>Nie znaleziono danych trenera.</div>;

    return (
        <>
        <button
                className="text-green-500 dark:text-green-300 mb-4 flex justify-center"
                onClick={onBack}
            >
                Powrót
            </button>
        <div className="p-6 max-w-4xl mx-auto rounded-xl shadow-md space-y-6 bg-white dark:bg-gray-800">
            

            <div className="flex items-center space-x-4">
                <img
                    src={trainer.profile_image_url || 'https://via.placeholder.com/150'}
                    alt="Zdjęcie profilowe"
                    className="w-32 h-32 rounded-full object-cover border"
                />
                <div>
                    <h1 className="text-3xl font-bold text-left dark:text-white">
                        {trainer.first_name} {trainer.last_name}
                    </h1>
                    <p className="text-gray-700 dark:text-white text-left">{trainer.specialization}</p>
                </div>
            </div>

            {isEditing ? (
                <div className="space-y-4">
                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleInputChange}
                        placeholder="Imię"
                        className="block w-full p-3 border rounded"
                    />
                    <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleInputChange}
                        placeholder="Nazwisko"
                        className="block w-full p-3 border rounded"
                    />
                    <input
                        type="text"
                        name="profile_image_url"
                        value={formData.profile_image_url}
                        onChange={handleInputChange}
                        placeholder="URL zdjęcia profilowego"
                        className="block w-full p-3 border rounded"
                    />
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Lokalizacja"
                        className="block w-full p-3 border rounded"
                    />
                    <input
                        type="text"
                        name="gym_location"
                        value={formData.gym_location}
                        onChange={handleInputChange}
                        placeholder="Siłownia"
                        className="block w-full p-3 border rounded"
                    />
                    <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleInputChange}
                        placeholder="Specjalizacja"
                        className="block w-full p-3 border rounded"
                    />
                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="Doświadczenie (lata)"
                        className="block w-full p-3 border rounded"
                    />
                    <input
                        type="number"
                        name="ratings"
                        value={formData.ratings}
                        onChange={handleInputChange}
                        placeholder="Ocena"
                        className="block w-full p-3 border rounded"
                    />
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600"
                    >
                        Zapisz
                    </button>
                </div>
            ) : (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-left dark:text-white">
                            Lokalizacja:
                        </h2>
                        <p className="text-gray-700 dark:text-white text-left">{trainer.location}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-left dark:text-white">
                            Siłownia:
                        </h2>
                        <p className="text-gray-700 dark:text-white text-left">{trainer.gym_location}</p>
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold text-left dark:text-white">
                            Doświadczenie:
                        </h2>
                        <p className="text-gray-700 dark:text-white text-left">{trainer.experience} lata</p>
                    </div>

                    <button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600"
                    >
                        Edytuj Profil
                    </button>
                </div>
            )}
        </div>

        </>    );
}
