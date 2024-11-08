// src/App.js
import './App.css';
import Header from './Components/Header';
import CalendarBox from './Components/CalendarBox';
import ExerciseBox from './Components/ExerciseBox';
import TrainersBox from './Components/TrainersBox';
import DarkModeToggle from './Components/DarkModeToggle';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-300">
      <Header />
      <DarkModeToggle />
      <div className="container mx-auto p-4">
        {/* <CalendarBox /> */}
        <ExerciseBox />
        <TrainersBox />
      </div>
    </div>
  );
}

export default App;
