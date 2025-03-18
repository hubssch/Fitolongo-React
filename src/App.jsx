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
import TrainerLogin from './Components/TrainerLogin';
import TrainerRegistration from './Components/TrainerRegistration';
import EditTrainerProfile from './Components/EditTrainerProfile';
import Registration from './Components/Registration';
import Login from './Components/Login';

function App() {
  const [activeView, setActiveView] = useState('home');
  const [activeTrainerId, setActiveTrainerId] = useState(null);
  const [user, setUser] = useState(null);

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
    setActiveTrainerId(loggedInUser.id);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('user_id');
    setUser(null);
    setActiveView('home');
  };

  const showExerciseJournal = () => setActiveView('exercise');
  const showTrainersList = () => setActiveView('trainers');
  const showTrainerProfile = (id) => {
    setActiveTrainerId(id);
    setActiveView('trainerProfile');
  };
  const showLogin = () => setActiveView('login');
  const showTrainerLogin = () => setActiveView('trainerLogin');
  const showTrainerRegistration = () => setActiveView('trainerRegistration');
  const showRegistration = () => setActiveView('registration');
  const goHome = () => setActiveView('home');
  const showEditTrainerProfile = () => setActiveView('editTrainerProfile');

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      <Header showRegistration={showRegistration} showLogin={showLogin} />
      {user ? (
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mb-4"
          >
            Wyloguj się
          </button>
        </div>
      ) : null}

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
      {activeView === 'login' && <Login onBack={goHome} />}
      {activeView === 'registration' && <Registration onBack={goHome} />}
    </div>
  );
}

export default App;