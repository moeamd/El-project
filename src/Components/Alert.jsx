import { useState } from "react";

function Alert({ message, type = "info" }) {
    const [isVisible, setIsVisible] = useState(true);

    const baseStyles = "container fixed top-5 left-1/2 -translate-x-1/2 max-w-xl px-4 py-3 rounded shadow-lg flex items-start justify-between space-x-4";
    const typeStyles = {
        success: "bg-green-100 text-green-800 border border-green-300",
        error: "bg-red-100 text-red-800 border border-red-300",
        warning: "bg-yellow-100 text-yellow-800 border border-yellow-300",
        info: "bg-blue-100 text-blue-800 border border-blue-300",
    };

    if (!isVisible) return null;

    return (
        <div className={`${baseStyles} ${typeStyles[type] || typeStyles.info}`} role="alert">
            <p className="flex-1">{message}</p>
            <button
                onClick={() => setIsVisible(false)}
                className="text-xl font-bold leading-none text-gray-500 hover:text-black focus:outline-none"
            >
                &times;
            </button>
        </div>
    );
}

export default Alert;
