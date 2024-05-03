import React, { useEffect, useState } from "react";
import axios from "../axios";
import Navbar from "../../component/Navbar/Navbar";

const NewClass = () => {
    const username = sessionStorage.getItem("username");
    const refresh = localStorage.getItem("refresh");
    const token = localStorage.getItem("token");

    const [isLoading, setIsLoading] = useState(true);
    const [courseTA, setCourseTA] = useState([]);
    const [userEmail, setUserEmail] = useState("");
    const [TaEmail, setTaEmail] = useState("");
    const [professorEmail, setProfessorEmail] = useState("");
    const [courseName, setCourseName] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/authentication/profile/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserEmail(response.data.email);
                setIsLoading(false);
            } catch (error) {
                Promise.reject(error);
                // navigate("/error404");
            }
        }
        fetchData();
    }, []);
    const AddNewCourse = (event) => {
        event.preventDefault();
        const date = new Date().toISOString().slice(0, 10);
        console.log(courseTA)
        console.log(professorEmail)
        console.log([...courseTA, userEmail, TaEmail])
        axios
            .post(
                "/courses/addCourse/",
                { courseName, date, professor: professorEmail, Ta: [...courseTA, userEmail, TaEmail] },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then(() => {
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <Navbar />
            <div className="lg:px-8 w-full mt-4 m-auto">
                <h3 className="mr-8 text-2xl font-bold leading-9 tracking-tight text-raisin-black mb-6 text-center">
                    ایجاد کلاس جدید
                </h3>
                <div className="w-1/3 sm:w-full mx-8">
                    <form className="flex flex-col">
                        <div className="">
                            <input
                                id="name"
                                type="text"
                                placeholder="نام درس را وارد کنید"
                                value={courseName}
                                className="rounded-l border-b-2  border-raisin-black/50 py-1 pr-2 placeholder:text-raisin-black-25 text-raisin-black focus:border-blue-yonder sm:text-sm sm:leading-6"
                                onChange={(event) => setCourseName(event.target.value)}
                            />
                        </div>
                        <div className="mt-8">
                            <input
                                id="name"
                                type="email"
                                placeholder="ایمیل استاد درس را وارد کنید"
                                value={professorEmail}
                                className="rounded-l border-b-2 border-raisin-black/50 py-1 pr-2 placeholder:text-raisin-black-25 text-raisin-black focus:border-blue-yonder sm:text-sm sm:leading-6"
                                onChange={(event) => setProfessorEmail(event.target.value)}
                            />
                        </div>
                        <div className="mt-8">
                            <input
                                id="name"
                                type="email"
                                placeholder="ایمیل دستیار آموزشی درس را وارد کنید"
                                value={userEmail}
                                className="block rounded-l border-b-2 mt-2 border-raisin-black/50 py-1 pr-2 placeholder:text-raisin-black-25 text-raisin-black focus:border-blue-yonder sm:text-sm sm:leading-6"
                                onChange={(event) => setUserEmail(event.target.value)}
                            />
                        </div>
                        <div className="mt-8">
                            <input
                                id="name"
                                type="email"
                                placeholder="ایمیل دستیار آموزشی درس را وارد کنید"
                                value={TaEmail}
                                className="block rounded-l border-b-2 mt-2 border-raisin-black/50 py-1 pr-2 placeholder:text-raisin-black-25 text-raisin-black focus:border-blue-yonder sm:text-sm sm:leading-6"
                                onChange={(event) => {
                                    setTaEmail(event.target.value);
                                }}
                            />
                        </div>
                        <button
                            onClick={AddNewCourse}
                            className="flex w-32 justify-center rounded-md bg-queen-blue mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-yonder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-yonder"
                        >
                            ایجاد کلاس جدید
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NewClass;
