// src/App.js
import React, { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import ExerciseBox from './Components/ExerciseBox';
import TrainersBox from './Components/TrainersBox';
import DarkModeToggle from './Components/DarkModeToggle';
import ExerciseJournal from './Components/ExerciseJournal';
import TrainersList from './Components/TrainerList';
import TrainerProfile from './Components/TrainerProfile';
import RegisterButton from './Components/RegisterButton';

function App() {
  const [activeView, setActiveView] = useState('home');
  const [activeTrainerId, setActiveTrainerId] = useState(null);

  const showExerciseJournal = () => setActiveView('exercise');
  const showTrainersList = () => setActiveView('trainers');
  const showTrainerProfile = (id) => {
    setActiveTrainerId(id);
    setActiveView('trainerProfile');
  };
  const goHome = () => setActiveView('home');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      <Header />
      <RegisterButton />
      <DarkModeToggle />

      {activeView === 'home' && (
        <div className="container mx-auto p-4">
          <ExerciseBox onClick={showExerciseJournal} />
          <TrainersBox onClick={showTrainersList} />
        </div>
      )}

      {activeView === 'exercise' && <ExerciseJournal onBack={goHome} />}
      {activeView === 'trainers' && (
        <TrainersList onBack={goHome} onTrainerClick={showTrainerProfile} />
      )}
      {activeView === 'trainerProfile' && (
        <TrainerProfile id={activeTrainerId} onBack={() => setActiveView('trainers')} />
      )}
    </div>
  );
}

export default App;
