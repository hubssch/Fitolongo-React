import React, { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabaseClient';
import Header from './Components/Header';
import ExerciseBox from './Components/ExerciseBox';
import TrainersBox from './Components/TrainersBox';
import DarkModeToggle from './Components/DarkModeToggle';
import ExerciseJournal from './Components/ExerciseJournal';
import TrainersList from './Components/TrainerList';
import TrainerProfile from './Components/TrainerProfile';
import UserProfile from './Components/UserProfile';
import UserProfileButton from './Components/UserProfileButton';
import TrainerLogin from './Components/TrainerLogin'; // Import nowego komponentu
import TrainerRegistration from './Components/TrainerRegistration'; // Import komponentu rejestracji
import EditTrainerProfile from './Components/EditTrainerProfile';
import Registration from './Components/Registration';


function App() {
  const [activeView, setActiveView] = useState('home');
  const [activeTrainerId, setActiveTrainerId] = useState(null);
  const [user, setUser] = useState(null); // Przechowywanie zalogowanego użytkownika

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setActiveView('trainerProfile');
    setActiveTrainerId(loggedInUser.id); // Ustawienie ID użytkownika
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setActiveView('home');
  };

  const showExerciseJournal = () => setActiveView('exercise');
  const showTrainersList = () => setActiveView('trainers');
  const showTrainerProfile = (id) => {
    setActiveTrainerId(id);
    setActiveView('trainerProfile');
  };
  const showTrainerLogin = () => setActiveView('trainerLogin');
  const showTrainerRegistration = () => setActiveView('trainerRegistration'); // Dodano widok rejestracji
  const showRegistration = () => setActiveView('registration'); // Dodano widok rejestracji
  const goHome = () => setActiveView('home');
  const showEditTrainerProfile = () => setActiveView('editTrainerProfile');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      <Header />
      <DarkModeToggle />
      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mb-4"
        >
          Wyloguj się
        </button>
      ) : (
        <div className="flex space-x-4 mb-4">
          <button
            onClick={showTrainerLogin}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Zaloguj się
          </button>
          {/* <button
            onClick={showTrainerRegistration}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Zarejestruj się
          </button> */}
          <button
            onClick={showRegistration}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Zarejestruj się
          </button>
        </div>
      )}

      {activeView === 'home' && (
        <div className="container mx-auto p-4">
          <UserProfileButton onClick={() => setActiveView('userProfile')} />
          <ExerciseBox onClick={showExerciseJournal} />
          <TrainersBox onClick={showTrainersList} />
        </div>
      )}

      {activeView === 'exercise' && <ExerciseJournal onBack={goHome} />}
      {activeView === 'trainers' && (
        <TrainersList onBack={goHome} onTrainerClick={showTrainerProfile} />
      )}
      {activeView === 'userProfile' && <UserProfile onBack={goHome} />}
      {activeView === 'trainerProfile' && (
        <TrainerProfile id={activeTrainerId} onBack={() => setActiveView('trainers')} />
      )}
      {activeView === 'trainerLogin' && (
        <TrainerLogin onLogin={handleLogin} onBack={goHome} />
      )}
      {activeView === 'trainerRegistration' && (
        <TrainerRegistration onBack={goHome} />
      )}
      {activeView === 'registration' && (
        <Registration onBack={goHome} />
      )}
    </div>
  );
}

export default App;
