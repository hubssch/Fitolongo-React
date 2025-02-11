import React, { useState, useEffect } from "react";
import { supabase } from '../supabaseClient';

const UserProfile = ({ onBack }) => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState(""); // Nowy stan na komunikat

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", 1)
        .single();

      if (error) {
        console.error("Błąd podczas pobierania danych:", error);
      } else {
        setUser(data);
        setFormData(data);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    const { error } = await supabase
      .from("user_profiles")
      .update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        profile_picture: formData.profile_picture,
        personal_records: formData.personal_records,
        description: formData.description,
        favorite_sports: formData.favorite_sports,
        gallery: formData.gallery,
      })
      .eq("id", 1);

    if (error) {
      console.error("Błąd podczas zapisywania danych:", error);
    } else {
      setUser(formData); // Zaktualizuj stan użytkownika
      setIsEditing(false);
      setSuccessMessage("Twój profil został zmieniony! ✅"); // Ustawienie komunikatu sukcesu
      setTimeout(() => setSuccessMessage(""), 3000); // Ukrycie po 3 sekundach
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (!user) {
    return <div>Nie znaleziono użytkownika.</div>;
  }

  return (
    <div className="p-3 max-w-2xl mx-auto rounded-xl shadow-md space-y-6">
      <button
        className="text-green-500 dark:text-green-300 mb-4"
        onClick={onBack}
      >
        Powrót
      </button>

      {/* Komunikat o sukcesie */}
      {successMessage && (
        <div className="p-3 bg-green-500 text-white text-center rounded">
          {successMessage}
        </div>
      )}

      <div className="flex items-center space-x-4">
        <div>
          <h1 className="text-2xl font-bold text-left dark:text-white">
            {user.first_name} {user.last_name}
          </h1>
          <p className="text-gray-700 dark:text-white text-left">{user.description}</p>
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
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            placeholder="Nazwisko"
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="profile_picture"
            value={formData.profile_picture}
            onChange={handleInputChange}
            placeholder="URL zdjęcia profilowego"
            className="block w-full p-2 border rounded"
          />
          <textarea
            name="personal_records"
            value={formData.personal_records}
            onChange={handleInputChange}
            placeholder="Personal Records"
            className="block w-full p-2 border rounded"
          ></textarea>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Opis"
            className="block w-full p-2 border rounded"
          ></textarea>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Zapisz
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-left dark:text-white">
              Personal Records:
            </h2>
            <p className="text-gray-700 dark:text-white text-left">{user.personal_records}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-left dark:text-white">
              Ulubione Dyscypliny:
            </h2>
            <ul className="list-disc list-inside text-left dark:text-white">
              {user.favorite_sports.map((sport, index) => (
                <li key={index}>{sport}</li>
              ))}
            </ul>
          </div>
          
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Edytuj Profil
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;