export default function FilterTabs({ categories, activeCategory, onChange }) {
  return (
    <div className="mb-6 border-b border-gray-300">
      <div className="grid grid-cols-3 gap-2 sm:flex sm:justify-center sm:gap-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            className={`pb-2 px-4 pt-4 font-medium transition relative w-full text-center
              ${
                activeCategory === cat
                  ? "text-[#49BBBD] border-b-2 border-[#49BBBD]"
                  : "text-gray-500 hover:text-[#49BBBD]"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
