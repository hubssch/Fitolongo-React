import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function WorkoutForm({ selectedDate, onWorkoutAdded, editingWorkout }) {
    const [exerciseName, setExerciseName] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [personalRecord, setPersonalRecord] = useState(false);
    const [user, setUser] = useState(null);
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem('user_id');
            if (userId) {
                const { data: userData, error } = await supabase
                    .from('users')
                    .select(`id`)
                    .eq('id', userId)
                    .single();

                if (userData && !error) {
                    setUser(userData);

                    // Sprawdzenie, czy jest trenerem
                    const { data: trainerData } = await supabase
                        .from('trainers')
                        .select(`id`)
                        .eq('id', userId)
                        .single();

                    setIsUser(!trainerData); // Jeśli nie znajduje się w trenerach, to jest zwykłym użytkownikiem
                }
            }
        };
        fetchUser();

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
        if (!isUser) {
            alert('Aby używać dziennika ćwiczeń musisz być zalogowany jako użytkownik.');
            return;
        }

        const dateUTC = new Date(Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate()));
        const payload = {
            exercise_name: exerciseName,
            sets: parseInt(sets),
            reps: parseInt(reps),
            weight: parseFloat(weight),
            personal_record: personalRecord,
            date: dateUTC,
            user_id: user.id
        };

        if (editingWorkout) {
            const { error } = await supabase.from('workouts').update(payload).match({ id: editingWorkout.id });
            if (!error) {
                onWorkoutAdded();
                setEditingWorkout(null);
                resetForm();
            }
        } else {
            const { error } = await supabase.from('workouts').insert([payload]);
            if (!error) {
                onWorkoutAdded();
                resetForm();
            }
        }
    };

    if (!isUser) return (
    <div className="text-center p-4 max-w-md mx-auto mt-10 rounded-lg border border-red-300 bg-red-200 text-red-700">
        <h2 className="font-bold text-xl mb-2">Ograniczony dostęp:</h2>
        <p className="text-lg">Aby używać dziennika ćwiczeń musisz być zalogowany jako użytkownik.</p>
    </div>)

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
