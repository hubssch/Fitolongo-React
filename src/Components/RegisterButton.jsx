import React, { useState } from 'react';
import RegisterWindow from './RegisterWindow';

export default function RegisterButton() {
    const [isRegisterWindowOpen, setIsRegisterWindowOpen] = useState(false);

    const openRegisterWindow = () => {
        setIsRegisterWindowOpen(true);
    };

    const closeRegisterWindow = () => {
        setIsRegisterWindowOpen(false);
    };

    return (
        <div>
            <button
                onClick={openRegisterWindow}
                className="bg-yellow-500 text-white hover:scale-105 cursor-pointer	 px-6 py-2 rounded-md text-xl font-semibold transition-all duration-300 hover:bg-yellow-400 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50"
            >
                Zarejestruj się
            </button>
            {isRegisterWindowOpen && <RegisterWindow onClose={closeRegisterWindow} />}
        </div>
    );
}
