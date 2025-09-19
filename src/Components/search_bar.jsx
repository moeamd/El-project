import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search your favourite course"
        className="w-full border border-gray-300 py-3 px-6 pr-32 focus:border-[#49BBBD] bg-white focus:outline-none"
      />
      <button
        type="button"
        onClick={handleSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#49BBBD] text-white font-semibold px-6 py-2 transition"
      >
        Search
      </button>
    </div>
  );
}
