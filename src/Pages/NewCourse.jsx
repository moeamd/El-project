    import { Formik } from "formik";
    import { useState } from "react";
    import { addCourse } from "../features/courses/addCourse";

    export const NewCourse = () => {
    const [data, setData] = useState({
        name: "",
        price: "",
        hours: "",
        category: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        addCourse(data);
        setData({
        name: "",
        price: "",
        hours: "",
        category: "",
        video: "",
        });
        console.log(data);
    };

    return (
        <>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
            <input
            className="border-2 border-amber-500 p-1"
            name="name"
            type="text"
            placeholder="Course name"
            value={data.name}
            onChange={handleChange}
            />
            <input
            className="border-2 border-amber-500 p-1"
            name="price"
            type="text"
            placeholder="Course price"
            value={data.price}
            onChange={handleChange}
            />
            <input
            className="border-2 border-amber-500 p-1"
            name="hours"
            type="text"
            placeholder="Course hours"
            value={data.hours}
            onChange={handleChange}
            />
            <input
            className="border-2 border-amber-500 p-1"
            name="category"
            type="text"
            placeholder="Course category"
            value={data.category}
            onChange={handleChange}
            />
            <input
            type="file"
            id="input"
            name="video"
            value={data.video}
            onChange={handleChange}
            accept="video/mp4, video/mov"
            />
            <button
            type="submit"
            className="bg-amber-500 text-white font-semibold py-1 rounded"
            >
            Add Course
            </button>
        </form>
        </>
    );
    };
