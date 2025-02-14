import React from 'react';
import trainerImage from '../images/undraw_personal_trainer_re_cnua.svg';

export default function TrainersBox({ onClick }) {
    return (
        <div
            onClick={onClick} // Dodanie onClick jako obsługi kliknięcia
            className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out mt-6 dark:bg-gray-900 dark:text-white"
        >
            <h1 className="text-2xl font-semibold mb-2 text-green-800 dark:text-green-400">
                Oni zrobią z ciebie <br />
                Wielkiego Chłopa
            </h1>
            <p className="text-gray-700 mb-4 dark:text-gray-300">
                To tutaj zobaczysz kto może ci pomóc
                <br />
                w drodze po marzenia, aby stać na czele łańcucha pokarmowego!
            </p>
            <img src={trainerImage} alt="Personal trainer" className="w-32 h-32 object-cover" />
        </div>
    );
}
