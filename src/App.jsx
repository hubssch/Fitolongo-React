// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import ExerciseBox from './Components/ExerciseBox';
import TrainersBox from './Components/TrainersBox';
import DarkModeToggle from './Components/DarkModeToggle';
import ExerciseJournal from './Components/ExerciseJournal';
import TrainersList from './Components/TrainerList';

function App() {
  const [activeView, setActiveView] = useState('home');

  const showExerciseJournal = () => setActiveView('exercise');
  const showTrainersList = () => setActiveView('trainers');
  const goHome = () => setActiveView('home');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      <Header />
      <DarkModeToggle />

      {activeView === 'home' && (
        <div className="container mx-auto p-4">
          <ExerciseBox onClick={showExerciseJournal} />
          <TrainersBox onClick={showTrainersList} />
        </div>
      )}

      {activeView === 'exercise' && <ExerciseJournal onBack={goHome} />}
      {activeView === 'trainers' && <TrainersList />}
    </div>
  );
}

export default App;
