import RegisterButton from "./RegisterButton";

export default function Header() {
    return (
        <div>
            <div className="w-full h-36 bg-green-800 flex items-center justify-between px-4 transition-transform duration-300 ease-in-out dark:bg-green-800">
                <div className="flex-grow flex justify-center">
                    <h1 className="text-white text-7xl font-bold just-another-hand-regular" id="app-name">
                        Fitolongo
                    </h1>
                </div>
                {/* <RegisterButton /> */}
            </div></div>

    );
}
