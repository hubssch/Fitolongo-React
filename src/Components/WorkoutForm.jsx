
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function WorkoutForm({ selectedDate, onWorkoutAdded, editingWorkout }) {
    const [exerciseName, setExerciseName] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [personalRecord, setPersonalRecord] = useState(false);

    useEffect(() => {
        if (editingWorkout) {
            setExerciseName(editingWorkout.exercise_name);
            setSets(editingWorkout.sets);
            setReps(editingWorkout.reps);
            setWeight(editingWorkout.weight);
            setPersonalRecord(editingWorkout.personal_record);
        } else {
            resetForm();
        }
    }, [editingWorkout]);

    const resetForm = () => {
        setExerciseName('');
        setSets('');
        setReps('');
        setWeight('');
        setPersonalRecord(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dateUTC = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));

        const payload = {
            exercise_name: exerciseName,
            sets: parseInt(sets),
            reps: parseInt(reps),
            weight: parseFloat(weight),
            personal_record: personalRecord,
            date: dateUTC,
            user_id: localStorage.getItem('user_id')
        };

        if (editingWorkout) {
            // Aktualizacja istniejącego ćwiczenia
            const { error } = await supabase.from('workouts').update(payload).match({ id: editingWorkout.id });

            if (!error) {
                onWorkoutAdded();
                setEditingWorkout(null); // Reset stanu edytowanego ćwiczenia i formularza
                resetForm();
            }
        } else {
            // Dodawanie nowego ćwiczenia
            const { error } = await supabase.from('workouts').insert([payload]);

            if (!error) {
                onWorkoutAdded();
                resetForm();
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-semibold mb-4">{editingWorkout ? 'Edytuj szczegóły treningu' : 'Dodaj szczegóły treningu'} dla {selectedDate.toDateString()}</h3>
            <div className="mb-2">
                <label className="block">Nazwa ćwiczenia</label>
                <input type="text" value={exerciseName} onChange={(e) => setExerciseName(e.target.value)} className="w-full p-2 border rounded text-black" required />
            </div>
            <div className="mb-2">
                <label className="block">Serie</label>
                <input type="number" value={sets} onChange={(e) => setSets(e.target.value)} className="w-full p-2 border rounded text-black" required />
            </div>
            <div className="mb-2">
                <label className="block">Powtórzenia</label>
                <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} className="w-full p-2 border rounded text-black" required />
            </div>
            <div className="mb-2">
                <label className="block">Waga (kg)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full p-2 border rounded text-black" required />
            </div>
            <div className="mb-4">
                <label className="block">Rekord osobisty</label>
                <input type="checkbox" checked={personalRecord} onChange={(e) => setPersonalRecord(e.target.checked)} className="mr-2" />
                Tak
            </div>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{editingWorkout ? 'Zaktualizuj ćwiczenie' : 'Dodaj ćwiczenie'}</button>
        </form>
    );
}
