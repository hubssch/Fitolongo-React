import DarkModeToggle from "./DarkModeToggle";

export default function Header({ showRegistration, showLogin }) {
    return (
        <div className="w-full h-36 bg-green-800 flex items-center justify-between px-4 transition-transform duration-300 ease-in-out dark:bg-green-800">
            <DarkModeToggle />
            <div className="flex-grow flex justify-center">
                <h1 className="text-white text-7xl font-bold just-another-hand-regular" id="app-name">
                    Fitolongo
                </h1>
            </div>
            <div className="flex space-x-4">
                <button
                    onClick={showLogin}
                    className="bg-white text-green-800 py-2 px-4 rounded hover:bg-gray-200"
                >
                    Zaloguj się
                </button>
                <button
                    onClick={showRegistration}
                    className="bg-white text-green-800 py-2 px-4 rounded hover:bg-gray-200"
                >
                    Zarejestruj się
                </button>
            </div>
        </div>
    );
}
