import React, { useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../axios";

const NewExercise = () => {
    const username = sessionStorage.getItem("username");
    const refresh = localStorage.getItem("refresh");
    const token = localStorage.getItem("token");

    const navigate = useNavigate();
    const location = useLocation();

    const course_id = location.state;

    const [isLoading, setIsLoading] = useState(true);
    const [exerciseName, setExerciseName] = useState("");
    const [body, setBody] = useState("");
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [file, setFile] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (file) {
            const formData = new FormData();
            formData.append("exerciseName", exerciseName);
            formData.append("body", body);
            formData.append("startDate", startDate);
            formData.append("endDate", endDate);
            formData.append("courseExercise", course_id);
            formData.append("file", file);

            axios
                .post("/courses/addExercise/", formData, {
                    "Content-Type": "multipart/form-data",
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    navigate(`/practice/${response.data.id}`);
                })

                .catch((err) => console.log(err));
        } else {
            axios
                .post(
                    "/courses/addExercise/",
                    {
                        exerciseName: exerciseName,
                        body: body,
                        startDate: startDate,
                        endDate: endDate,
                        courseExercise: course_id,
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then((response) => {
                    navigate(`/practice/${response.data.id}`);
                })

                .catch((err) => console.log(err));
        }
    };
    return (
        <>
            <Navbar />
            <button
                onClick={() => {
                    navigate("/");
                }}
                className="float-left mt-4"
            >
                <i className="fa fa-arrow-left ml-16 border solid border-black rounded-full p-2" aria-hidden="true"></i>
            </button>
            <div className="lg:px-8 w-full mt-4 m-auto">
                <h3 className="mr-8 text-2xl font-bold leading-9 tracking-tight text-raisin-black mb-6 text-center">
                    افزودن تمرین جدید
                </h3>
                <div className="sm:w-full px-8 overflow-hidden">
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <input
                                id="name"
                                type="text"
                                placeholder="نام تمرین را وارد کنید"
                                value={exerciseName}
                                className="rounded-l border-b-2 border-raisin-black/50 py-1 pr-2 placeholder:text-raisin-black-25 text-raisin-black focus:border-blue-yonder sm:text-sm sm:leading-6"
                                onChange={(event) => setExerciseName(event.target.value)}
                            />
                        </div>

                        <div className="mt-8">
                            <div>
                                <label>زمان شروع تمرین</label>
                                <input
                                    type="datetime-local"
                                    value={startDate}
                                    onChange={(event) => setStartDate(event.target.value)}
                                />
                            </div>
                            <div className="mt-4">
                                <label className="">زمان پایان تمرین</label>
                                <input
                                    type="datetime-local"
                                    value={endDate}
                                    onChange={(event) => setEndDate(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="mt-8">
                            <label htmlFor="uploadFile" className="block font-semibold mb-4">
                                در صورت نیاز فایل مربوط به تمرین را بارگذاری کنید:
                            </label>
                            <input
                                id="uploadFile"
                                name="uploadFile"
                                type="file"
                                accept="application/pdf"
                                className="text-raisin-black/50 cursor-pointer file:cursor-pointer file:border-none file:py-1 file:px-3 file:hover:bg-blue-yonder file:hover:text-cultured file:rounded"
                                onChange={(event) => setFile(event.target.files[0])}
                            />
                        </div>
                        <div className="mt-8 ">
                            <textarea
                                placeholder="توضیحات خود را درباره تمرین بنویسید"
                                value={body}
                                rows="4"
                                className="w-96 resize-none rounded border-2 border-raisin-black/50 py-1 pr-2 placeholder:text-raisin-black-25 text-raisin-black focus:border-blue-yonder sm:text-sm sm:leading-6"
                                onChange={(event) => setBody(event.target.value)}
                            />
                        </div>

                        <button
                            className="flex w-32 justify-center rounded-md bg-queen-blue mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-yonder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-yonder"
                            type="submit"
                        >
                            ایجاد تمرین جدید
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewExercise;
