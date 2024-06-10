import React, { useEffect, useState } from "react";
import axios from "../axios";
import Navbar from "../../component/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

const NewClass = () => {
    const username = sessionStorage.getItem("username");
    const refresh = localStorage.getItem("refresh");
    const token = localStorage.getItem("token");

    const [isLoading, setIsLoading] = useState(true);
    const [TA_list, setTA_list] = useState([{ email: "" }]);
    const [userEmail, setUserEmail] = useState("");
    const [professorEmail, setProfessorEmail] = useState("");
    const [courseName, setCourseName] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
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

    const handleChange = (i, e) => {
        const newTA_list = [...TA_list];
        newTA_list[i][e.target.name] = e.target.value;
        setTA_list(newTA_list);
    };

    const addFormFields = () => {
        setTA_list([...TA_list, { email: "" }]);
    };

    const removeFormFields = (i) => {
        const newTA_list = [...TA_list];
        newTA_list.splice(i, 1);
        setTA_list(newTA_list);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const date = new Date().toISOString().slice(0, 10);
        let Ta_list = [];
        TA_list.forEach((element) => {
            if (element["email"] != "") {
                Ta_list = [...Ta_list, element["email"]];
            }
        });

        Ta_list = [...Ta_list, userEmail];
        axios
            .post(
                "/courses/addCourse/",
                { courseName, password, date, professor: professorEmail, Ta: Ta_list },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((request) => {
                navigate('/')
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <Navbar />
            <button
                onClick={() => {
                    navigate('/');
                }}
                className="float-left mt-4"
            >
                <i className="fa fa-arrow-left ml-16 border solid border-black rounded-full p-2" aria-hidden="true"></i>
            </button>
            <div className="lg:px-8 w-full mt-4 m-auto">
                <h3 className="mr-8 text-2xl font-bold leading-9 tracking-tight text-raisin-black mb-6 text-center">
                    ایجاد کلاس جدید
                </h3>
                <div className="w-1/3 sm:w-full mx-8">
                    <form onSubmit={handleSubmit}>
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
                                id="password"
                                type="text"
                                placeholder="اگر مایل هستید برای درس رمز عبور تعریف کنید"
                                value={password}
                                className="rounded-l border-b-2  border-raisin-black/50 py-1 pr-2 placeholder:text-raisin-black-25 text-raisin-black focus:border-blue-yonder sm:text-sm sm:leading-6"
                                onChange={(event) => setPassword(event.target.value)}
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
                        <h3 className="mt-8 inline-block w-1/3 border-b-2 border-raisin-black/20 ml-4 pb-2 pr-2">
                            {" "}
                            دستیاران آموزشی درس
                        </h3>
                        <button
                            className="w-fit justify-center rounded-full bg-queen-blue mt-4 font-semibold leading-6 text-white shadow-sm hover:bg-blue-yonder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-yonder"
                            type="button"
                            onClick={() => addFormFields()}
                        >
                            <i className="fa fa-plus rounded-full px-2 py-1 text-sm "></i>
                        </button>
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
                        {TA_list.map((element, index) => (
                            <div className="mt-8" key={index}>
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="ایمیل دستیار آموزشی درس را وارد کنید"
                                    value={element.email || ""}
                                    className="rounded-l border-b-2 mt-2 border-raisin-black/50 py-1 pr-2 ml-4 placeholder:text-raisin-black-25 text-raisin-black focus:border-blue-yonder sm:text-sm sm:leading-6"
                                    onChange={(e) => handleChange(index, e)}
                                />
                                {index ? (
                                    <button
                                        type="button"
                                        className="w-fit justify-center rounded-full bg-queen-blue mt-4 font-semibold leading-6 text-white shadow-sm hover:bg-blue-yonder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-yonder"
                                        onClick={() => removeFormFields(index)}
                                    >
                                        <i className="fa fa-times rounded-full px-2 py-1 text-sm "></i>
                                    </button>
                                ) : null}
                            </div>
                        ))}

                        <button
                            className="flex w-32 justify-center rounded-md bg-queen-blue mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-yonder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-yonder"
                            type="submit"
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
