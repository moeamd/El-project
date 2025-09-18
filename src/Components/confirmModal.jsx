
function ConfirmModal({ show, onConfirm, onCancel, message }) {
    if (!show) return null;
    
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-30 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <p className="mb-4">{message}</p>
                <div className="flex justify-center gap-2">
                    <button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>Cancel</button>
                    <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={onConfirm}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;