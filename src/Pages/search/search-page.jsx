import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../features/courses/coursesSlice";
import CourseCard from "../../Components/CourseCard";
import SearchBar from "../../Components/search_bar";
import FilterTabs from "../../Components/FilterTabs";
import "./search-page.css";

const categories = [
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "UI/UX Design",
    "Digital Marketing",
    "Business",
    "Photography",
    "Music",
    "Other",
  ];

export default function SearchPage() {
  const dispatch = useDispatch();
  const { course, isLoading, error } = useSelector((state) => state.course);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const filteredCourses = useMemo(() => {
    let result =
      activeCategory === "All"
        ? course
        : course.filter((course) => course.category === activeCategory);

    if (searchQuery) {
      result = result.filter((course) =>
        course.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [course, activeCategory, searchQuery]);

  return (
    <div className="px-6 py-10">
      {/* Search */}
        <section className="relative bg-[#F4D876] px-6 md:px-12 py-16 flex flex-col items-center justify-center h-screen searchHero">

      <SearchBar onSearch={setSearchQuery} />
</section>

      {/* Filter */}
      <FilterTabs
        categories={categories}
        activeCategory={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Results */}
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
