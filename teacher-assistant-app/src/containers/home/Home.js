import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import CardItem from "../../component/CardItem/CardItem";
import Card from "../../component/Card/Card";
import axios from "axios";

const Home = () => {
    const username = sessionStorage.getItem("username");
    const refresh = localStorage.getItem("refresh");
    const token = localStorage.getItem("token");

    const [myClasses, setMyClasses] = useState([]);
    const [myTAClasses, setMyTAClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function fetchData() {
            if (username) {
                try {
                    setIsLoading(true);
                    const response = await axios.get("http://127.0.0.1:8000/students/myClasses/", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setMyClasses(response.data.course_data);
                    setIsLoading(false);
                } catch (error) {
                    Promise.reject(error);
                    // navigate("/error404");
                }
                try {
                    setIsLoading(true);
                    const response = await axios.get("http://127.0.0.1:8000/courses/taCourse/", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setMyTAClasses(response.data.classes);
                    setIsLoading(false);
                } catch (error) {
                    Promise.reject(error);
                    // navigate("/error404");
                }
            }
            else{
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    if (!isLoading) {
        const course = (
            <>
                {myClasses.map((item) => {
                    return (
                        <CardItem
                            date={new Date(item.date).toLocaleString().split(",")[0]}
                            teacherName={item.professor}
                            title={item.courseName}
                            id={item.id}
                            linkURL="course"
                        />
                    );
                })}
            </>
        );
        const TaCourse = (
            <>
                {myTAClasses.map((item) => {
                    return (
                        <CardItem
                            date={item.date}
                            teacherName={item.professor}
                            title={item.courseName}
                            id={item.id}
                            linkURL="course"
                        />
                    );
                })}
            </>
        );
        return (
            <>
                <Navbar />
                <div className="flex justify-evenly flex-wrap max-md:flex-nowrap mt-10 max-md:flex-col max-md:items-center ">
                    <div className="w-2/5  max-md:w-10/12">
                        <Card title="کلاس های من" items={course} />
                    </div>
                    <div className="w-2/5  max-md:w-10/12">
                        <Card title="کلاس های درس" items={TaCourse} />
                    </div>
                </div>
            </>
        );
    } else {
        return <Navbar />;
    }
};
export default Home;
