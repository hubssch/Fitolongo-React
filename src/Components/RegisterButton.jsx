// src/Components/RegisterButton.js
import React from 'react';

export default function RegisterButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      Zarejestruj Trenera
    </button>
  );
}
