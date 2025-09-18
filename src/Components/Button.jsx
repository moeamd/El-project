
export default function Button({ label = "Enroll Now", onClick }) {
    return (
      <button
        onClick={onClick}
        className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition"
      >
        {label}
      </button>
    );
  }
  