import React, { useState } from 'react';
import Calendar from './Calendar';
import WorkoutForm from './WorkoutForm';
import { supabase } from '../supabaseClient';
import { format } from 'date-fns';

export default function ExerciseJournal({ onBack }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [workouts, setWorkouts] = useState([]);
    const [editingWorkout, setEditingWorkout] = useState(null);

    const handleDayClick = (date) => {
        setSelectedDate(date);
        fetchWorkouts(date);
    };

    const fetchWorkouts = async (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        const { data, error } = await supabase.from('workouts').select('*').eq('date', formattedDate);
        if (!error) setWorkouts(data);
    };

    const handleWorkoutAdded = () => {
        fetchWorkouts(selectedDate);
        setEditingWorkout(null);  // Reset stanu edytowanego ćwiczenia
    };

    const handleDelete = async (id) => {
        const { error } = await supabase.from('workouts').delete().match({ id });
        if (!error) fetchWorkouts(selectedDate);
    };

    const handleEdit = (workout) => {
        setEditingWorkout(workout);  // Ustaw stan na edytowane ćwiczenie
    };

    return (
        <div className="exercise-journal p-4 bg-gray-100 dark:bg-gray-800 dark:text-white">
            <button
                className="text-green-500 dark:text-green-300 mb-4"
                onClick={onBack}
            >
                Powrót
            </button>
            <Calendar onDayClick={handleDayClick} />
            <WorkoutForm selectedDate={selectedDate} onWorkoutAdded={handleWorkoutAdded} editingWorkout={editingWorkout} />
            <div className="mt-4">
                <h3 className="text-xl font-semibold">Lista ćwiczeń:</h3>
                {workouts.map((workout) => (
                    <div key={workout.id} className="p-2 bg-white dark:bg-gray-700 rounded-lg mb-2 shadow-md">
                        <p><strong>Ćwiczenie:</strong> {workout.exercise_name}</p>
                        <p><strong>Serie:</strong> {workout.sets}</p>
                        <p><strong>Powtórzenia:</strong> {workout.reps}</p>
                        <p><strong>Waga:</strong> {workout.weight} kg</p>
                        <p><strong>Rekord osobisty:</strong> {workout.personal_record ? 'Tak' : 'Nie'}</p>
                        <button onClick={() => handleEdit(workout)} className="bg-blue-500 text-white px-2 py-1 rounded">Edytuj</button>
                        <button onClick={() => handleDelete(workout.id)} className="bg-red-500 text-white px-2 py-1 rounded">Usuń</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
