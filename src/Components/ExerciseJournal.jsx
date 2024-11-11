import React, { useState } from 'react';
import Calendar from './Calendar';
import WorkoutForm from './WorkoutForm';
import { supabase } from '../supabaseClient.js';
import { format } from 'date-fns'; // Import biblioteki do formatowania daty

export default function ExerciseJournal() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [workouts, setWorkouts] = useState([]);

    const handleDayClick = (date) => {
        setSelectedDate(date);
        fetchWorkouts(date);
    };

    const fetchWorkouts = async (date) => {
        // Formatowanie daty do formatu 'YYYY-MM-DD'
        const formattedDate = format(date, 'yyyy-MM-dd');

        const { data, error } = await supabase
            .from('workouts')
            .select('*')
            .eq('date', formattedDate); // Używamy sformatowanej daty

        if (error) {
            console.error('Błąd przy pobieraniu treningów:', error);
        } else {
            setWorkouts(data);
        }
    };

    const handleWorkoutAdded = () => {
        fetchWorkouts(selectedDate);
    };

    return (
        <div className="exercise-journal p-4 bg-gray-100 dark:bg-gray-800 dark:text-white">
            <button
                className="text-green-500 dark:text-green-300 mb-4"
                onClick={() => window.location.reload()}
            >
                Powrót do strony głównej
            </button>

            <h2 className="text-2xl font-semibold mb-4">Dziennik Ćwiczeń</h2>
            <Calendar onDayClick={handleDayClick} />

            {selectedDate && (
                <div className="mt-4">
                    <WorkoutForm selectedDate={selectedDate} onWorkoutAdded={handleWorkoutAdded} />
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold">Lista ćwiczeń:</h3>
                        {workouts.map((workout) => (
                            <div key={workout.id} className="p-2 bg-white dark:bg-gray-700 rounded-lg mb-2 shadow-md">
                                <p><strong>Ćwiczenie:</strong> {workout.exercise_name}</p>
                                <p><strong>Serie:</strong> {workout.sets}</p>
                                <p><strong>Powtórzenia:</strong> {workout.reps}</p>
                                <p><strong>Waga:</strong> {workout.weight} kg</p>
                                <p><strong>Rekord osobisty:</strong> {workout.personal_record ? 'Tak' : 'Nie'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
