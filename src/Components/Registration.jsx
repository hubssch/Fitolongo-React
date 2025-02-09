import React, { useState } from 'react';
import TrainerRegistration from './TrainerRegistration';
import UserRegistration from './UserRegistration';

export default function Registration({ onBack }) {
    const [activeView, setActiveView] = useState(null);

    const showTrainerRegistration = () => setActiveView('trainer');
    const showUserRegistration = () => setActiveView('user');

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
                    <button onClick={showUserRegistration}>
                        Zarejestruj się jako użytkownik
                    </button>
                    <button onClick={showTrainerRegistration}>
                        Zarejestruj się jako trener
                    </button>
                </>
            )}
            {activeView === 'user' && <UserRegistration onBack={onBack} />}
            {activeView === 'trainer' && <TrainerRegistration onBack={onBack} />}
        </>
    );
}
