export default function FilterTabs({ categories, activeCategory, onChange }) {
  return (
    <div className="flex gap-4 justify-center mb-6 border-b border-gray-300">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`pb-2 px-4 pt-4 font-medium transition relative
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
  );
}
