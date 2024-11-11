import React, { useState } from 'react';

// Dni tygodnia i nazwy miesięcy dla wyświetlania w kalendarzu
const daysOfWeek = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];
const months = [
    'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
    'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
];

export default function Calendar({ onDayClick }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Funkcja do generowania dni w kalendarzu dla aktualnego miesiąca
    const generateCalendarDays = () => {
        const days = [];
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

        // Wypełnij puste dni przed pierwszym dniem miesiąca
        for (let i = 0; i < startOfMonth.getDay(); i++) {
            days.push(null);
        }

        // Dodaj dni miesiąca
        for (let i = 1; i <= endOfMonth.getDate(); i++) {
            days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
        }

        return days;
    };

    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const days = generateCalendarDays();

    return (
        <div className="calendar-container bg-white p-4 rounded-lg shadow-md dark:bg-gray-900 dark:text-white">
            <div className="calendar-header flex justify-between items-center">
                <button onClick={handlePreviousMonth}>&lt;</button>
                <h2>{`${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}</h2>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="calendar-grid grid grid-cols-7 gap-2 mt-4">
                {daysOfWeek.map((day) => (
                    <div key={day} className="font-bold text-center">{day}</div>
                ))}
                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg text-center ${day ? 'cursor-pointer hover:bg-green-200 dark:hover:bg-green-800' : ''
                            }`}
                        onClick={() => day && onDayClick(day)}
                    >
                        {day ? day.getDate() : ''}
                    </div>
                ))}
            </div>
        </div>
    );
}
