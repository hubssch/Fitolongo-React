import exerciseImage from '../images/undraw_healthy_habit_kwe6.svg';

export default function ExerciseBox() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 ease-in-out mt-6 dark:bg-gray-900 dark:text-white">
            <h1 className="text-2xl font-semibold mb-2 text-green-800 dark:text-green-400">
                Co zrobić, żeby <br /> chude szczury były w strachu
            </h1>
            <p className="text-gray-700 mb-4 dark:text-gray-300">
                Sprawdź jakie ćwiczenia wykonywać,
                <br />
                aby na dyskotece wygrać każdą cepeliadę.
            </p>
            <img src={exerciseImage} alt="Big boy training" className="w-32 h-32 object-cover" />
        </div>
    );
}
