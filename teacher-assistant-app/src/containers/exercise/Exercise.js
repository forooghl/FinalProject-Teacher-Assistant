import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axios";
import { Loader } from "../../ui/loader/Loader";
const Exercise = (props) => {
    const { id } = useParams();

    const token = localStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    const [exercise, setExercise] = useState([]);
    const [course_id, setCourse_id] = useState("");
    const [std_course_id, setStd_course_id] = useState("");
    const [ansWindow, setAnsWindow] = useState(false);
    const [myAnswer, setMyAnswer] = useState([]);
    const [studentAnswer, setStudentAnswer] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [endDeadline, setEndDeadline] = useState(false);
    const [file, setFile] = useState();
    const [countDown, setCountDown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const navigate = useNavigate();

    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await axios.get(`/courses/exerciseData/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStd_course_id(response.data.std_course);
                setExercise(response.data.exercise_data);
                setCourse_id(response.data.exercise_data[0].courseExercise);
                setIsLoading(false);
            } catch (error) {
                navigate("/error", { state: error.response });
            }
        }
        fetchData();
    }, []);

    // بررسی ددلاین تمرین و تغییر شمارش معکوس
    useEffect(() => {
        try {
            const endDate = new Date(exercise[0].endDate).getTime();
            const timeBetween = endDate - currentTime;
            if (timeBetween < 0) {
                setEndDeadline(true);
                setCountDown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                setEndDeadline(false);
                setCountDown({
                    days: Math.floor(timeBetween / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((timeBetween / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((timeBetween / 1000 / 60) % 60),
                    seconds: Math.floor((timeBetween / 1000) % 60),
                });
            }
        } catch {}
    }, [currentTime]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("exercise_id", id);
        formData.append("std_course_id", std_course_id[0].id);
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
    };

    const downloadFile = () => {
        axios
            .get(`${exercise[0].file}`)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => console.log(err));
    };

    const AnswerHandler = () => {
        setAnsWindow(true);
        setIsLoading(true);
        if (std_course_id[0]) {
            axios
                .get("/students/myAnswer/", {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { exercise_id: id, stdCourse_id: std_course_id[0].id },
                })
                .then((response) => {
                    setMyAnswer(response.data["my_answer"]);
                    setIsLoading(false);
                })
                .catch((error) => {
                    navigate("/error", { state: error.response.status });
                });
        } else {
            axios
                .get("/students/studentAnswer/", {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { exercise_id: id },
                })
                .then((response) => {
                    setStudentAnswer(response.data["student_answer"]);
                    setIsLoading(false);
                })
                .catch((error) => {
                    navigate("/error", { state: error.response.status });
                });
        }
    };

    const activeAnsHandler = (event) => {
        const ans_id = event.target.id;
        axios
            .get("/students/updateFinalAnswer/", {
                headers: { Authorization: `Bearer ${token}` },
                params: { exercise_id: id, std_course_id: std_course_id[0].id, id: ans_id },
            })
            .then((response) => {
                setMyAnswer(response.data["my_answer"]);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                navigate("/error", { state: error.response.status });
            });
    };
    if (isLoading) {
        return (
            <>
                <Navbar />
                <Loader />
            </>
        );
    } else {
        const myAnswerCard = (
            <>
                {myAnswer.map((item) => {
                    let file_name = item.file.replace(/media\/ExerciseAns\/|\.[^.]+$|\//gi, "");
                    if (file_name.length > 45) {
                        file_name = file_name.slice(0, 45) + " ...";
                    }
                    return (
                        <div
                            key={item.id}
                            className=" h-16 w-full mx-auto px-4 flex items-center shadow shadow-independence/15 justify-between flex-nowrap hover:bg-cultured/30"
                        >
                            <div className="flex flex-col justify-between">
                                <p className="font-semibold text-raisin-black line-clamp-2 overflow-hidden ">
                                    {endDeadline ? (
                                        <></>
                                    ) : item["is_active"] ? (
                                        <input
                                            className="hover:cursor-pointer ml-1"
                                            name="activeAns"
                                            onClick={activeAnsHandler}
                                            type="radio"
                                            id={item.id}
                                            defaultChecked
                                        />
                                    ) : (
                                        <input
                                            className="hover:cursor-pointer ml-1"
                                            name="activeAns"
                                            onClick={activeAnsHandler}
                                            type="radio"
                                            id={item.id}
                                        />
                                    )}
                                    نام فایل: <span className="text-independence text-sm ">{file_name}</span>
                                </p>
                                {item["is_active"] ? (
                                    <p className="text-raisin-black/75 text-sm ">فایل نهایی</p>
                                ) : (
                                    <p className="text-raisin-black/75 text-sm"></p>
                                )}
                            </div>
                            <p className="text-united-nations-blue text-sm font-semibold mr-2">
                                {item.grade}
                                <span className="text-queen-blue">/100</span>
                            </p>
                        </div>
                    );
                })}
            </>
        );
        const studentAnswerCard = (
            <>
                {studentAnswer.map((item) => {
                    let file_name = item.file.replace(/media\/ExerciseAns\/|\.[^.]+$|\//gi, "");
                    if (file_name.length > 45) {
                        file_name = file_name.slice(0, 45) + " ...";
                    }
                    return (
                        <div
                            key={item.id}
                            className=" h-16 w-full mx-auto px-4 flex items-center shadow shadow-independence/15 justify-between flex-nowrap hover:bg-cultured/30"
                        >
                            <div className="flex flex-col justify-between">
                                <p className="font-semibold text-raisin-black line-clamp-2 overflow-hidden ">
                                    نام فایل: <span className="text-independence text-sm ">{file_name}</span>
                                </p>

                                <p className="text-raisin-black/75 text-sm">
                                    شماره دانشجویی:{" "}
                                    <span className="text-independence">{item.std_course_id.std_number}</span>
                                </p>
                            </div>
                            <p className="text-united-nations-blue text-sm font-semibold mr-2">
                                {item.grade}
                                <span className="text-queen-blue">/100</span>
                            </p>
                        </div>
                    );
                })}
            </>
        );

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
                        <div className="py-3 pr-4 shadow shadow-independence/15 hover:bg-cultured/30">
                            <button onClick={AnswerHandler}>
                                <i className="fa-solid fa-file-import text-blue-yonder"></i>
                                {std_course_id[0] ? (
                                    <span className="mr-2 max-md:hidden">پاسخ های من</span>
                                ) : (
                                    <span className="mr-2 max-md:hidden">پاسخ دانشجویان</span>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row-reverse basis-5/6 justify-center max-md:flex-col ">
                        <div className="basis-1/12 self-start max-md:self-end">
                            <button
                                onClick={() => {
                                    navigate(`/course/${course_id}`);
                                }}
                                className="mt-4 "
                            >
                                <i
                                    className="fa fa-arrow-left ml-16 border solid border-black rounded-full p-2"
                                    aria-hidden="true"
                                ></i>
                            </button>
                        </div>
                        <div className="flex flex-col basis-11/12">
                            <div className="grid grid-flow-col gap-5 text-center h-fit self-end my-4 ml-8 max-lg:ml-5">
                                <div className="flex flex-col ">
                                    <span className="countdown text-xl">
                                        <span>{countDown.seconds}</span>
                                    </span>
                                    ثانیه
                                </div>
                                <div className="flex flex-col ">
                                    <span className="countdown text-xl">
                                        <span>{countDown.minutes}</span>
                                    </span>
                                    دقیقه
                                </div>
                                <div className="flex flex-col ">
                                    <span className="countdown text-xl">
                                        <span>{countDown.hours}</span>
                                    </span>
                                    ساعت
                                </div>
                                <div className="flex flex-col ">
                                    <span className="countdown text-xl">
                                        <span>{countDown.days}</span>
                                    </span>
                                    روز
                                </div>
                            </div>
                            {ansWindow ? (
                                myAnswer.length > 0 ? (
                                    <div className="flex flex-col w-7/12 max-lg:w-11/12 max-lg:mt-4 max-lg:my-0 mx-auto py-4 px-4 h-fit ">
                                        {myAnswerCard}
                                    </div>
                                ) : studentAnswer.length > 0 ? (
                                    <div className="flex flex-col w-7/12 max-lg:w-11/12 max-lg:mt-4 max-lg:my-0 mx-auto py-4 px-4 h-fit ">
                                        {studentAnswerCard}
                                    </div>
                                ) : (
                                    <div className="flex flex-col w-7/12 max-lg:w-11/12 max-lg:mt-4 max-lg:my-0 mx-auto py-4 px-4 h-fit ">
                                        چیزی برای نمایش وجود ندارد
                                    </div>
                                )
                            ) : (
                                <div className="flex w-1/2 max-lg:w-11/12 max-lg:mt-4 mx-auto py-4 px-4 h-fit shadow shadow-independence/15 flex-wrap md:flex-nowrap ">
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

                                        {endDeadline ? (
                                            <p className="text-center text-blue-yonder">
                                                زمان پاسخ دهی به اتمام رسیده است
                                            </p>
                                        ) : (
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
                                        )}
                                    </div>
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
