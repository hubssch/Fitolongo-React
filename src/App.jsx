// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import ExerciseBox from './Components/ExerciseBox';
import TrainersBox from './Components/TrainersBox';
import DarkModeToggle from './Components/DarkModeToggle';
import ExerciseJournal from './Components/ExerciseJournal';
import TrainersList from './Components/TrainerList';
import TrainerProfile from './Components/TrainerProfile';
import RegisterButton from './Components/RegisterButton';
import UserProfile from './Components/UserProfile';
import UserProfileButton from './Components/UserProfileButton';
import UserSearch from './Components/UserSearch';
import { supabase } from './supabaseClient';

function App() {
  const [activeView, setActiveView] = useState('home');
  const [activeUserId, setActiveUserId] = useState(null); // ID zalogowanego lub wyszukiwanego użytkownika
  const [loggedInUserId, setLoggedInUserId] = useState(null); // ID zalogowanego użytkownika

  // Pobieranie danych zalogowanego użytkownika przy uruchomieniu aplikacji
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (user) {
        setLoggedInUserId(user.id);
      }
      if (error) {
        console.error('Błąd podczas pobierania użytkownika:', error);
      }
    };

    fetchLoggedInUser();
  }, []);

  // Funkcje do zmiany widoków
  const showExerciseJournal = () => setActiveView('exercise');
  const showTrainersList = () => setActiveView('trainers');
  const showTrainerProfile = (id) => {
    setActiveUserId(id);
    setActiveView('trainerProfile');
  };
  const showUserProfile = () => {
    setActiveUserId(loggedInUserId); // Wyświetlanie profilu zalogowanego użytkownika
    setActiveView('userProfile');
  };
  const showUserSearch = () => setActiveView('search'); // Widok wyszukiwania użytkowników
  const showSelectedUserProfile = (id) => {
    setActiveUserId(id); // Wyświetlanie profilu wybranego użytkownika
    setActiveView('userProfile');
  };
  const goHome = () => setActiveView('home');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      <Header />
      <RegisterButton />
      <DarkModeToggle />

      {activeView === 'home' && (
        <div className="container mx-auto p-4">
          <UserProfileButton onClick={showUserProfile} />
          <button
            onClick={showUserSearch}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-4"
          >
            Wyszukaj użytkownika
          </button>
          <ExerciseBox onClick={showExerciseJournal} />
          <TrainersBox onClick={showTrainersList} />
        </div>
      )}

      {activeView === 'exercise' && <ExerciseJournal onBack={goHome} />}
      {activeView === 'trainers' && (
        <TrainersList onBack={goHome} onTrainerClick={showTrainerProfile} />
      )}
      {activeView === 'userProfile' && (
        <UserProfile id={activeUserId} onBack={goHome} />
      )}
      {activeView === 'trainerProfile' && (
        <TrainerProfile id={activeUserId} onBack={() => setActiveView('trainers')} />
      )}
      {activeView === 'search' && (
        <UserSearch onUserSelect={showSelectedUserProfile} onBack={goHome} />
      )}
    </div>
  );
}

export default App;
