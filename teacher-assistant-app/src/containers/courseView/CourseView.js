import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Card from "../../component/Card/Card";
import CardItem from "../../component/CardItem/CardItem";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import { Loader } from "../../ui/loader/Loader";

const CourseView = (props) => {
    const { id } = useParams();

    const token = localStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    const [course, setCourse] = useState([]);
    const [exercise, setExercise] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [user_id, setUser_id] = useState();
    const [isStudent, setIsStudent] = useState(false);
    const [isTA, setIsTA] = useState(false);
    const [isProfessor, setIsProfessor] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await axios.get(`/students/joinOrNot/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setIsTA(response.data.isTA);
                setIsProfessor(response.data.isProfessor);
                setIsStudent(response.data.isStudent);
                setUser_id(response.data.user_id);
            } catch (error) {
                navigate("/error", { state: error.response.status });
            }

            try {
                setIsLoading(true);
                const response = await axios.get(`/courses/courseData/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCourse(response.data.course_data);
                setIsLoading(false);
            } catch (error) {
                navigate("/error", { state: error.response.status });
            }

            try {
                setIsLoading(true);
                const response = await axios.get(`/courses/courseExercise/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setExercise(response.data.course_exercises);
                setIsLoading(false);
            } catch (error) {
                navigate("/error", { state: error.response.status });
            }
        }
        fetchData();
    }, []);

    const deleteCourseHandler = () => {
        axios
            .delete(`/courses/updateCourse/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                alert(response.data.msg);
                navigate("/");
            })
            .catch((error) => {
                console.log(error);
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
        const practice = (
            <>
                {exercise.map((item) => {
                    return (
                        <CardItem
                            title={item.exerciseName}
                            teacherName=""
                            date={new Date(item.endDate).toLocaleString().split(",")[0]}
                            id={item.id}
                            linkURL="practice"
                        />
                    );
                })}
            </>
        );
        const classDetail = (
            <div className="text-center text-raisin-black mt-2">
                <h1 className="font-bold text-xl mb-2">{course[0].courseName}</h1>
                <h2 className=" text-sm">{course[0].professor}</h2>

                <div class="flex items-center px-4 my-2">
                    <div class="flex-1 border-t-2 border-independece/15"></div>
                    <span class="px-3 font-bold">دستیاران آموزشی</span>
                    <div class="flex-1 border-t-2 border-independece/15"></div>
                </div>

                <div className="text-sm">
                    {course[0].Ta.map((items) => {
                        return <p className="mb-2">{items}</p>;
                    })}
                </div>
            </div>
        );

        // can edit class settings and add exercise
        if (isProfessor || isTA) {
            const classDetail = (
                <div className="text-center text-raisin-black mt-2">
                    <h1 className="font-bold text-xl mb-2">{course[0].courseName}</h1>
                    <h2 className=" text-sm">{course[0].professor}</h2>

                    <div class="flex items-center px-4 my-2">
                        <div class="flex-1 border-t-2 border-independece/15"></div>
                        <span class="px-3 font-bold">دستیاران آموزشی</span>
                        <div class="flex-1 border-t-2 border-independece/15"></div>
                    </div>

                    <div className="text-sm">
                        {course[0].Ta.map((items) => {
                            return <p className="mb-2">{items}</p>;
                        })}
                    </div>

                    <div class="flex items-center px-4 my-2">
                        <div class="flex-1 border-t-2 border-independece/15"></div>
                        <span class="px-3 font-bold">تنظیمات کلاس</span>
                        <div class="flex-1 border-t-2 border-independece/15"></div>
                    </div>
                    <div className="text-sm font-semibold flex flex-col mb-2">
                        <button onClick={deleteCourseHandler} className="text-right mr-4">
                            <i className="fa-solid fa-trash text-blue-yonder ml-2"></i>
                            حذف کلاس
                        </button>
                    </div>
                </div>
            );
            if (isLoading) {
                return (
                    <>
                        <Navbar />
                        <Loader />
                    </>
                );
            } else {
                return (
                    <>
                        <Navbar />
                        <div className="flex justify-evenly flex-wrap max-md:flex-nowrap mt-10 max-md:flex-col max-md:items-center">
                            <div className="w-3/12  max-md:w-10/12">
                                <Card title="درس در یک نگاه" items={classDetail} cardType="class" />
                            </div>
                            <div className="w-3/12  max-md:w-10/12">
                                {isProfessor ? (
                                    <Card
                                        title="ارزشیابی"
                                        items={
                                            <>
                                                <CardItem
                                                    title="نمره دهی به دانشجویان درس"
                                                    teacherName=""
                                                    date=""
                                                    id={id}
                                                    linkURL="grading"
                                                />
                                            </>
                                        }
                                        cardType="evaluation"
                                    />
                                ) : (
                                    <Card
                                        title="ارزشیابی"
                                        items={
                                            <>
                                                <CardItem
                                                    title="مشاهده نتیجه ارزشیابی دستیاران آموزشی"
                                                    teacherName=""
                                                    date=""
                                                    id=""
                                                    linkURL="evalResult"
                                                />
                                            </>
                                        }
                                        cardType="evaluation"
                                    />
                                )}
                            </div>
                            <div className="w-4/12  max-md:w-10/12">
                                <div className="flex flex-col">
                                    <div className="flex flex-row justify-between">
                                        <p className="font-bold text-raisin-black text-lg pr-3 mb-2">
                                            تمرین ها
                                            <i className="fa fa-pencil pr-2 text-blue-yonder" aria-hidden="true"></i>
                                        </p>
                                        <button
                                            className="mb-2"
                                            onClick={() => navigate("/addExercise", { state: id })}
                                        >
                                            <i className="fa fa-plus rounded-full px-2 py-1 text-sm bg-blue-yonder hover:bg-tufts-blue text-cultured"></i>
                                        </button>
                                    </div>
                                    {practice.props.children.length > 0 ? (
                                        <div className="border-solid border border-rich-black-fogra-29/10 shadow rounded-md max-md:mb-8">
                                            {practice}
                                        </div>
                                    ) : (
                                        <div className="border-solid border border-rich-black-fogra-29/10 py-2 text-center shadow rounded-md max-md:mb-8">
                                            چیزی برای نمایش وجود ندارد
                                        </div>
                                    )}
                                </div>
                                {/* <Card title="تمرین ها" items={practice} cardType="practice" /> */}
                            </div>
                        </div>
                    </>
                );
            }
        }

        // just see exercise and upload answer and see class detail
        if (isStudent) {
            if (isLoading) {
                return (
                    <>
                        <Navbar />
                        <Loader />
                    </>
                );
            } else {
                return (
                    <>
                        <Navbar />
                        <div className="flex justify-evenly flex-wrap max-md:flex-nowrap mt-10 max-md:flex-col max-md:items-center">
                            <div className="w-3/12  max-md:w-10/12">
                                <Card title="درس در یک نگاه" items={classDetail} cardType="class" />
                            </div>
                            <div className="w-3/12  max-md:w-10/12">
                                <Card
                                    title="ارزشیابی"
                                    items={
                                        <Link to="/evaluation" state={{ Ta: course[0].Ta, course_id: id }}>
                                            <div className="h-16 mx-auto px-4 flex items-center shadow shadow-independence/15 justify-between flex-wrap md:flex-nowrap hover:bg-cultured/30">
                                                <div className="flex flex-col">
                                                    <p className="font-semibold text-raisin-black">
                                                        ارزشیابی دستیاران آموزشی
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    }
                                    cardType="evaluation"
                                />
                            </div>
                            <div className="w-4/12  max-md:w-10/12">
                                <Card title="تمرین ها" items={practice} cardType="practice" />
                            </div>
                        </div>
                    </>
                );
            }
        }

        // should join the class
        else {
            navigate(`/joinClass/${id}`, { state: { user_id: user_id, course_pass: course[0].password } });
        }
    }
};

export default CourseView;
