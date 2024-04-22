import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Card from "../../component/Card/Card";
import CardItem from "../../component/CardItem/CardItem";
import { useParams } from "react-router-dom";
import axios from "axios";

const CourseView = (props) => {
    const { id } = useParams();

    const token = localStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    const [course, setCourse] = useState([]);
    const [exercise, setExercise] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/courses/courseData/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCourse(response.data.course_data);
                setIsLoading(false);
            } catch (error) {
                Promise.reject(error);
                // navigate("/error404");
            }

            try {
                setIsLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/courses/courseExercise/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setExercise(response.data.course_exercises);
                setIsLoading(false);
            } catch (error) {
                Promise.reject(error);
                // navigate("/error404");
            }
        }
        fetchData();
    }, []);

    if (isLoading) {
        return <Navbar />;
    } else {
        const practice = (
            <>
                {exercise.map((item) => {
                    return (
                        <CardItem
                            title={item.exerciseName}
                            teacherName=""
                            date={new Date(item.endDate).toLocaleString().split(',')[0]}
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
        return (
            <>
                <Navbar />
                <div className="flex justify-evenly flex-wrap max-md:flex-nowrap mt-10 max-md:flex-col max-md:items-center">
                    <div className="w-3/12  max-md:w-10/12">
                        <Card title="🏛️درس در یک نگاه" items={classDetail} />
                    </div>
                    <div className="w-3/12  max-md:w-10/12">
                        <Card title="📰 اطلاع رسانی" items={practice} />
                    </div>
                    <div className="w-4/12  max-md:w-10/12">
                        <Card title="📑تمرین‌ها" items={practice} />
                    </div>
                </div>
            </>
        );
    }
};

export default CourseView;
