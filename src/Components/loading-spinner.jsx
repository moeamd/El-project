import ClipLoader from "react-spinners/ClipLoader";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/20  dark:bg-gray-900">
      <div className="w-12 h-12 border-4 border-[#0c8b74] rounded-full border-t-transparent animate-spin"></div>
    </div>
  );
}
