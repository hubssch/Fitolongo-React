// src/Components/ProfileSettings.jsx
import React, { useState } from 'react';
import { uploadTrainerPhoto, updateTrainerPhotoUrl } from '../supabaseClient';

export default function ProfileSettings({ trainerId }) {
    const [photo, setPhoto] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) setPhoto(file);
    };

    const handleUpload = async () => {
        if (photo) {
            const photoUrl = await uploadTrainerPhoto(photo, trainerId);
            if (photoUrl) {
                await updateTrainerPhotoUrl(trainerId, photoUrl);
                alert('Zdjęcie zostało zaktualizowane.');
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center dark:bg-gray-900 dark:text-white">
            <h2 className="text-2xl font-semibold mb-4 text-green-800 dark:text-green-400">Ustawienia profilu</h2>
            <input type="file" onChange={handleFileChange} className="mb-4" />
            <button onClick={handleUpload} className="bg-green-500 text-white py-2 px-4 rounded">
                Prześlij zdjęcie
            </button>
        </div>
    );
}
