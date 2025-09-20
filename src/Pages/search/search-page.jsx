import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../features/courses/coursesSlice";
import CourseCard from "../../Components/CourseCard";
import SearchBar from "../../Components/search_bar";
import FilterTabs from "../../Components/FilterTabs";
import "./search-page.css";
import Pagination from "../../Components/pagination";


const categories = [
  "All",
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  return (
    <div className="px-4 sm:px-6 md:px-12 py-10">
      {/* Hero Section */}
<section className="searchHero relative bg-[#F4D876] px-4 sm:px-6 md:px-12 py-16 mt-10 flex flex-col items-center justify-center text-center rounded-2xl shadow-md">
          <h1 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800">
          Find Your Next Course
        </h1>
        <SearchBar onSearch={setSearchQuery} />
      </section>
      <div className="mt-12">
        {/* Filter */}
        <FilterTabs
          categories={categories}
          activeCategory={activeCategory}
          onChange={(cat) => {
            setActiveCategory(cat);
            setCurrentPage(1);
          }}
        />

        {/* Results */}
        {isLoading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {filteredCourses.length === 0 && (
          <p className="text-center">No results found.</p>
        )}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {currentCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
