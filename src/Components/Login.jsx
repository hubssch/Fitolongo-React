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
                    <button onClick={showUserLogin}>
                        Zaloguj się jako użytkownik
                    </button>
                    <button onClick={showTrainerLogin}>
                        Zaloguj się jako trener
                    </button>
                </>
            )}
            {activeView === 'user' && <UserLogin onBack={onBack} />}
            {activeView === 'trainer' && <TrainerLogin onBack={onBack} />}
        </>
    );
}
