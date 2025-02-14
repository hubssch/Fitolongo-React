import React, { useState } from 'react';
import TrainerLogin from './TrainerLogin';
import UserLogin from './UserLogin';
export default function Login({ onBack }) {
    const [activeView, setActiveView] = useState(null);

    const showTrainerLogin = () => setActiveView('trainer');
    const showUserLogin = () => setActiveView('user');

    return (
        <>
            {activeView === null && (
                <>
                    <button
                        className="text-green-500 dark:text-green-300 mb-4"
                        onClick={onBack}
                    >
                        Powrót
                    </button>
                    <div className="flex flex-col items-center space-y-4">
                    <button onClick={showUserLogin}
                     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800">
                        Zaloguj się jako użytkownik
                    </button>
                    <button onClick={showTrainerLogin}
                     className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-800">
                        Zaloguj się jako trener
                    </button>
                    </div>
                </>
            )}
            {activeView === 'user' && <UserLogin onBack={onBack} />}
            {activeView === 'trainer' && <TrainerLogin onBack={onBack} />}
        </>
    );
}
