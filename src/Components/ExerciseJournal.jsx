// src/Components/ExerciseJournal.js

export default function ExerciseJournal({ onBack }) {
    return (
        <div className="p-6">
            <button
                onClick={onBack}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
                Powrót do strony głównej
            </button>
            {/* Zawartość Dziennik Ćwiczeń */}
            <h1 className="text-3xl font-semibold mt-4">Dziennik Ćwiczeń</h1>
            {/* Dodaj tutaj resztę zawartości dziennika ćwiczeń */}
        </div>
    );
}
