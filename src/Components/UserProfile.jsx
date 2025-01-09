import React, { useState } from "react";

const UserProfile = ({ onBack }) => {
  // Przykładowe dane użytkownika
  const [user, setUser] = useState({
    firstName: "Jan",
    lastName: "Kowalski",
    profilePicture: "https://via.placeholder.com/150", // Zdjęcie profilowe
    personalRecords: "Martwy ciąg: 200kg, Bieg na 5km: 20min",
    favoriteSports: ["Bieganie", "Podnoszenie ciężarów", "Pływanie"],
    gallery: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150"
    ],
    description: "Trener personalny z 10-letnim doświadczeniem, specjalizujący się w treningu siłowym i wytrzymałościowym.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="p-3 max-w-2xl mx-auto rounded-xl shadow-md space-y-6">
      <button
        className="text-green-500 dark:text-green-300 mb-4"
        onClick={onBack}
      >
        Powrót
      </button>

      <div className="flex items-center space-x-4">
        <img
          src={user.profilePicture}
          alt="Zdjęcie profilowe"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold text-left">{user.firstName} {user.lastName}</h1>
          <p className="text-gray-700 text-left">{user.description}</p>
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder="Imię"
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder="Nazwisko"
            className="block w-full p-2 border rounded"
          />
          <input
            type="text"
            name="profilePicture"
            value={formData.profilePicture}
            onChange={handleInputChange}
            placeholder="URL zdjęcia profilowego"
            className="block w-full p-2 border rounded"
          />
          <textarea
            name="personalRecords"
            value={formData.personalRecords}
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
            <h2 className="text-xl font-semibold text-left">Personal Records:</h2>
            <p className="text-gray-700 text-left">{user.personalRecords}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-left">Ulubione Dyscypliny:</h2>
            <ul className="list-disc list-inside text-left">
              {user.favoriteSports.map((sport, index) => (
                <li key={index}>{sport}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Galeria Zdjęć:</h2>
            <div className="grid grid-cols-3 gap-4">
              {user.gallery.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt={`Zdjęcie ${index + 1}`}
                  className="w-full h-auto rounded shadow"
                />
              ))}
            </div>
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
