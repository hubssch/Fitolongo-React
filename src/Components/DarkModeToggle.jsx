import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
    // Sprawdzamy, czy użytkownik ma już zapisany tryb w localStorage
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedMode = localStorage.getItem('darkMode');
            return savedMode ? JSON.parse(savedMode) : false;
        }
        return false;
    });

    // Funkcja do przełączania trybu dark
    const toggleDarkMode = () => {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    };

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 text-black dark:bg-gray-800 dark:text-white transition-all duration-300"
        >
            {isDarkMode ? '🌞 Jasny' : '🌙 Ciemny'}
        </button>
    );
}
