// src/Components/TrainersList.jsx
export default function TrainersList() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md text-center dark:bg-gray-900 dark:text-white">
            <h2 className="text-2xl font-semibold mb-4 text-green-800 dark:text-green-400">
                Lista Trenerów
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
                Znajdź trenera, który pomoże Ci osiągnąć cele!
            </p>
            {/* Możesz dodać listę trenerów, np. z ich zdjęciami i opisami */}
        </div>
    );
}
