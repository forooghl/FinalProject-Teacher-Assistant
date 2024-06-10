import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import collage from "../../assets/img/collage.jpg";
import axios from "../axios";

const JoinNewClass = (props) => {
    const { id } = useParams();
    const refresh = localStorage.getItem("refresh");
    const token = localStorage.getItem("token");

    const [stdNumber, setStdNumber] = useState();
    const [course_pass, setCourse_pass] = useState();
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const user_id = location.state.user_id;
    const password = location.state.course_pass;

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password === course_pass || password == "") {
            axios
                .post(
                    "/students/addNewClass/",
                    { std_number: stdNumber, user_id: user_id, course_id: id},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                )
                .then((request) => {
                    navigate(`/course/${id}`);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setError(true);
        }
    };
    return (
        <>
            <Navbar />
            <div className="flex flex-row justify-center w-9/12  shadow shadow-independence/15 mx-auto mt-16 py-4 max-md:flex-col max-md:py-0">
                <div className="basis-2/5 pr-4 max-md:pr-0 max-md:mb-4">
                    <img src={collage} className="rounded w-3/4 max-md:w-full" />
                </div>
                <div className="basis-3/5 max-md:px-4 max-md:py-4">
                    <p className="font-bold text-xl mb-4">عضویت در کلاس ...</p>
                    <form onSubmit={handleSubmit} className="flex flex-col max-md:justify-center">
                        <div>
                            <input
                                type="number"
                                placeholder="شماره دانشجویی خود را وارد کنید"
                                value={stdNumber}
                                className="w-1/2 rounded-l border-b-2 border-raisin-black/50 py-1 pr-2 placeholder:text-raisin-black-25 text-raisin-black focus:border-blue-yonder sm:text-sm sm:leading-6 max-md:w-3/4"
                                onChange={(event) => setStdNumber(event.target.value)}
                            />
                        </div>
                        {password ? (
                            <div>
                                <input
                                    type="text"
                                    placeholder="رمز عبور را وارد کنید"
                                    value={course_pass}
                                    className="w-1/2 rounded-l border-b-2 border-raisin-black/50 py-1 pr-2 mt-4 placeholder:text-raisin-black-25 text-raisin-black focus:border-blue-yonder sm:text-sm sm:leading-6 max-md:w-3/4"
                                    onChange={(event) => setCourse_pass(event.target.value)}
                                />
                                {error ? (
                                    <p className="text-red-500 font-bold text-sm mt-2 mr-2">
                                        رمز عبور را اشتباه وارد کرده‌اید
                                    </p>
                                ) : (
                                    <></>
                                )}
                            </div>
                        ) : (
                            <></>
                        )}
                        <button
                            className="w-32 rounded-md bg-queen-blue mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-yonder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-yonder"
                            type="submit"
                        >
                            عضویت در کلاس
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default JoinNewClass;
