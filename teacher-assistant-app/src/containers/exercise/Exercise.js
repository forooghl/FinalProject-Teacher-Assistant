import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
const Exercise = (props) => {
    const { id } = useParams();

    const token = localStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    const [exercise, setExercise] = useState([]);
    const [course_id, setCourse_id] = useState("");
    const [ansWindow, setAnsWindow] = useState(false);
    const [std_course_id, setStd_course_id] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [file, setFile] = useState();

    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await axios.get(`/courses/exerciseData/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setExercise(response.data.exercise_data);
                setCourse_id(response.data.exercise_data[0].courseExercise);
                setIsLoading(false);
            } catch (error) {
                navigate("/error", { state: error.response.status });
            }
        }
        fetchData();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios
            .get(`/students/stdCourseID/${course_id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                const formData = new FormData();
                formData.append("exercise_id", id);
                formData.append("std_course_id", response.data.data[0].id);
                formData.append("file", file);

                axios
                    .post("/students/uploadExercise/", formData, {
                        "Content-Type": "multipart/form-data",
                        headers: { Authorization: `Bearer ${token}` },
                    })
                    .then((response) => {
                        // TODO
                        navigate(`/course/${course_id}`);
                    })

                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    };

    const downloadFile = () => {
        axios
            .get(`${exercise[0].file}`)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => console.log(err));
    };

    if (isLoading) {
        return <Navbar />;
    } else {
        return (
            <>
                <Navbar />
                <main className="flex flex-row h-screen no-wrap">
                    <div className="basis-1/6 h-full ">
                        <div className="flex flex-row items-center shadow shadow-independence/15 py-3 pr-4">
                            <button onClick={() => setAnsWindow(false)}>
                                <i className="fa-solid fa-question text-blue-yonder"></i>
                                <span className="mr-2 max-md:hidden">تمرین</span>
                                {exercise[0].file ? (
                                    <button title="دانلود فایل تمرین" onClick={downloadFile}>
                                        <i className="fa-solid fa-file-circle-question text-red-500 mr-2"></i>
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </button>
                        </div>
                        {/* TODO */}
                        <div className="py-3 pr-4 shadow shadow-independence/15 hover:bg-cultured/30">
                            <button onClick={() => setAnsWindow(true)}>
                                <i className="fa-solid fa-file-import text-blue-yonder"></i>
                                <span className="mr-2 max-md:hidden">پاسخ های من</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row-reverse basis-5/6 justify-center max-md:flex-col max-md:justify-start">
                        <div className="basis-1/10">
                            <button
                                onClick={() => {
                                    navigate(`/course/${course_id}`);
                                }}
                                className="mt-4 max-md:float-left"
                            >
                                <i
                                    className="fa fa-arrow-left ml-16 border solid border-black rounded-full p-2"
                                    aria-hidden="true"
                                ></i>
                            </button>
                        </div>
                        <div className="flex basis-9/10 w-5/12 max-md:w-4/5 mx-auto my-10 py-4 px-4 h-fit shadow shadow-independence/15 flex-wrap md:flex-nowrap ">
                            {ansWindow ? (
                                <div className="flex flex-col w-full">
                                    <p> در دست ساخت است ...</p>
                                </div>
                            ) : (
                                <div className="flex flex-col w-full">
                                    <h1 className="font-bold text-raisin-black text-lg self-center mb-2">
                                        {exercise[0].exerciseName}
                                    </h1>
                                    <p>{exercise[0].body}</p>
                                    <div class="flex items-center px-4 my-4">
                                        <div class="flex-1 border-t-2 border-independece/15"></div>
                                        <span class="px-3 font-bold">بارگذاری پاسخ تمرین</span>
                                        <div class="flex-1 border-t-2 border-independece/15"></div>
                                    </div>

                                    <form onSubmit={handleSubmit}>
                                        <label htmlFor="uploadFile" className="block">
                                            فایل <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            id="uploadFile"
                                            name="uploadFile"
                                            type="file"
                                            className="text-raisin-black/50 cursor-pointer file:cursor-pointer file:border-none file:py-1 file:px-3 file:hover:bg-blue-yonder file:hover:text-cultured file:rounded"
                                            onChange={(event) => setFile(event.target.files[0])}
                                        />
                                        <button
                                            className="flex w-32 justify-center rounded-md bg-queen-blue mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-yonder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-yonder"
                                            type="submit"
                                        >
                                            ارسال
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </>
        );
    }
};

export default Exercise;
