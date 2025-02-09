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
                    <div className="flex flex-col items-center space-y-4">
                        <button
                            onClick={showUserRegistration}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Zarejestruj się jako użytkownik
                        </button>
                        <button
                            onClick={showTrainerRegistration}
                            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                        >
                            Zarejestruj się jako trener
                        </button>
                    </div>
                </>
            )}
            {activeView === 'user' && <UserRegistration onBack={onBack} />}
            {activeView === 'trainer' && <TrainerRegistration onBack={onBack} />}
        </>
    );
}
