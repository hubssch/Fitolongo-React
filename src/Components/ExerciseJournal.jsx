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
        const user_id = localStorage.getItem('user_id')
        const { data, error } = await supabase
            .from('workouts')
            .select('*')
            .eq('date', formattedDate)
            .eq('user_id', user_id)
            .order('id', { ascending: true });
        if (!error) setWorkouts(data);
    };

    const handleWorkoutAdded = () => {
        fetchWorkouts(selectedDate);
        setEditingWorkout(null);
    };

    const handleDelete = async (id) => {
        const { error } = await supabase.from('workouts').delete().match({ id });
        if (!error) {
            setWorkouts(workouts.filter(w => w.id !== id));
        }
    };

    const handleEdit = (workout) => {
        setEditingWorkout(workout);
    };

    const handleToggleCompleted = async (workout) => {
        const newIsCompleted = !workout.is_completed;
        const { error } = await supabase
            .from('workouts')
            .update({ is_completed: newIsCompleted })
            .match({ id: workout.id });
        if (!error) {
            setWorkouts(workouts.map(w => w.id === workout.id ? { ...w, is_completed: newIsCompleted } : w));
        }
    };

    return (
        <div className="exercise-journal p-4 bg-gray-100 dark:bg-gray-800 dark:text-white">
            <button className="text-green-500 dark:text-green-300 mb-4" onClick={onBack}>Powrót</button>
            <Calendar onDayClick={handleDayClick} />
            <WorkoutForm selectedDate={selectedDate} onWorkoutAdded={handleWorkoutAdded} editingWorkout={editingWorkout} />
            <div className="mt-4">
                <h3 className="text-xl font-semibold">Lista ćwiczeń:</h3>
                {workouts.map((workout) => (
                    <div key={workout.id} className={`p-2 bg-white dark:bg-gray-700 rounded-lg mb-2 shadow-md relative ${workout.is_completed ? 'border-green-500 border-2' : ''}`}>
                        <div>
                            <p><strong>Ćwiczenie:</strong> {workout.exercise_name}</p>
                            <p><strong>Serie:</strong> {workout.sets}</p>
                            <p><strong>Powtórzenia:</strong> {workout.reps}</p>
                            <p><strong>Waga:</strong> {workout.weight} kg</p>
                            <p><strong>Rekord osobisty:</strong> {workout.personal_record ? 'Tak' : 'Nie'}</p>
                            <button onClick={() => handleEdit(workout)} className="bg-blue-500 text-white px-2 py-1 rounded mr-2">Edytuj</button>
                            <button onClick={() => handleDelete(workout.id)} className="bg-red-500 text-white px-2 py-1 rounded">Usuń</button>
                        </div>
                        <button onClick={() => handleToggleCompleted(workout)} style={{ position: 'absolute', top: '10px', right: '10px' }} className={`px-4 py-2 rounded text-white ${workout.is_completed ? 'bg-red-500' : 'bg-green-500'}`}>{workout.is_completed ? 'Anuluj' : 'Zrobione'}</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
