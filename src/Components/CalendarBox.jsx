import foodImage from '../images/undraw_breakfast_psiw.svg';

export default function CalendarBox() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center dark:bg-gray-900 dark:text-white transition-all duration-300">
            <h1 className="text-2xl font-semibold mb-2 text-green-800 dark:text-green-400">
                Kalendarz łasucha
            </h1>
            <p className="text-gray-700 mb-4 dark:text-gray-300">
                Licz kalorie i kontroluj nawodnienie,
                <br />
                aby masa nie spadła
            </p>
            <img src={foodImage} alt="Food" className="w-32 h-32 object-cover" />
        </div>
    );
}
