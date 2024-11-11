import React, { useState } from 'react';
import { supabase } from '../supabaseClient.js';

export default function WorkoutForm({ selectedDate, onWorkoutAdded }) {
    const [exerciseName, setExerciseName] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [personalRecord, setPersonalRecord] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Zapisz dane w Supabase
        const { data, error } = await supabase.from('workouts').insert([
            {
                date: selectedDate,
                exercise_name: exerciseName,
                sets: parseInt(sets),
                reps: parseInt(reps),
                weight: parseFloat(weight),
                personal_record: personalRecord,
            },
        ]);

        if (error) {
            console.error('Błąd przy dodawaniu treningu:', error);
        } else {
            console.log('Dodano trening:', data);
            onWorkoutAdded();
        }

        // Wyczyść formularz
        setExerciseName('');
        setSets('');
        setReps('');
        setWeight('');
        setPersonalRecord(false);
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-semibold mb-4">Dodaj szczegóły treningu dla {selectedDate.toDateString()}</h3>
            <div className="mb-2">
                <label className="block">Nazwa ćwiczenia</label>
                <input
                    type="text"
                    value={exerciseName}
                    onChange={(e) => setExerciseName(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block">Serie</label>
                <input
                    type="number"
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block">Powtórzenia</label>
                <input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block">Waga (kg)</label>
                <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block">Rekord osobisty</label>
                <input
                    type="checkbox"
                    checked={personalRecord}
                    onChange={(e) => setPersonalRecord(e.target.checked)}
                    className="mr-2"
                />
                Tak
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Dodaj ćwiczenie
            </button>
        </form>
    );
}
