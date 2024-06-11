import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import { Loader } from "../../ui/loader/Loader";

const Evaluation = () => {
    const refresh = localStorage.getItem("refresh");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const location = useLocation();
    const { Ta, course_id } = location.state;
    const [selectedTa, setSelectedTa] = useState("");
    const [teaching_skill, setTeaching_skill] = useState();
    const [mastery_skill, setMastery_skill] = useState();
    const [manner_skill, setManner_skill] = useState();
    const [answeringQuestion_skill, setAnsweringQuestion_skill] = useState();
    const [error, setError] = useState({ status: false, msg: "" });

    const selectedTAHandler = (event) => {
        setSelectedTa(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedTa) {
            if (!teaching_skill || !mastery_skill || !manner_skill || !answeringQuestion_skill)
                setError({ status: true, msg: "skill" });
            else {
                setError(false);
                axios
                    .post(
                        "/students/evaluation/",
                        {
                            Ta: selectedTa,
                            teaching_skill,
                            mastery_skill,
                            manner_skill,
                            answeringQuestion_skill,
                            course_id,
                        },
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    )
                    .then((request) => {
                        navigate(`/course/${course_id}`);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        } else {
            setError({ status: true, msg: "Ta" });
        }
    };
    const Ta_list = (
        <>
            {Ta.map((items) => {
                return (
                    <label>
                        <input
                            type="radio"
                            name="Ta_selected"
                            value={items}
                            onClick={(event) => {
                                selectedTAHandler(event);
                            }}
                            className="mx-2 text-red"
                        />
                        {items}
                    </label>
                );
            })}
        </>
    );
    return (
        <>
            <Navbar />
            <main className="w-[50%] mx-auto px-4 mt-4 flex items-center justify-between flex-wrap md:flex-nowrap max-md:w-full">
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="flex items-center px-4 my-2 mt-4">
                        <div className="flex-1 border-t-2 border-independece/15"></div>
                        <legend className="px-3 font-bold">دستیار آموزشی را انتخاب کنید</legend>
                        <div className="flex-1 border-t-2 border-independece/15"></div>
                    </div>
                    <div className="flex flex-col mr-10 mb-8">
                        {Ta_list}
                        {error["status"] & (error["msg"] == "Ta") ? (
                            <p className="text-red-500 font-bold text-sm mt-2 mr-2">
                                لطفا یکی از دستیاران آموزشی را انتخاب کنید
                            </p>
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className="flex items-center px-4 my-2 mt-4">
                        <div className="flex-1 border-t-2 border-independece/15"></div>
                        <legend className="px-3 font-bold">توانایی تدریس دستیار آموزشی</legend>
                        <div className="flex-1 border-t-2 border-independece/15"></div>
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-evenly max-md:flex-col">
                            <label>
                                <input
                                    type="radio"
                                    name="teaching_skill"
                                    value="0"
                                    className="mx-2"
                                    onClick={(event) => setTeaching_skill(event.target.value)}
                                />
                                خیلی بد
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="teaching_skill"
                                    value="1"
                                    className="mx-2"
                                    onClick={(event) => setTeaching_skill(event.target.value)}
                                />
                                بد
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="teaching_skill"
                                    value="2"
                                    className="mx-2"
                                    onClick={(event) => setTeaching_skill(event.target.value)}
                                />
                                متوسط
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="teaching_skill"
                                    value="3"
                                    className="mx-2"
                                    onClick={(event) => setTeaching_skill(event.target.value)}
                                />
                                خوب
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="teaching_skill"
                                    value="4"
                                    className="mx-2"
                                    onClick={(event) => setTeaching_skill(event.target.value)}
                                />
                                خیلی خوب
                            </label>
                        </div>
                        {error["status"] & (error["msg"] == "skill") & !teaching_skill ? (
                            <p className="text-red-500 font-bold text-sm mt-2 mr-12">لطفا یک مورد را انتخاب کنید</p>
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className="flex items-center px-4 my-2 mt-4">
                        <div className="flex-1 border-t-2 border-independece/15"></div>
                        <legend className="px-3 font-bold">تسلط بر درس دستیار آموزشی</legend>
                        <div className="flex-1 border-t-2 border-independece/15"></div>
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-evenly max-md:flex-col">
                            <label>
                                <input
                                    type="radio"
                                    name="mastery_skill"
                                    value="0"
                                    className="mx-2"
                                    onClick={(event) => setMastery_skill(event.target.value)}
                                />
                                خیلی بد
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="mastery_skill"
                                    value="1"
                                    className="mx-2"
                                    onClick={(event) => setMastery_skill(event.target.value)}
                                />
                                بد
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="mastery_skill"
                                    value="2"
                                    className="mx-2"
                                    onClick={(event) => setMastery_skill(event.target.value)}
                                />
                                متوسط
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="mastery_skill"
                                    value="3"
                                    className="mx-2"
                                    onClick={(event) => setMastery_skill(event.target.value)}
                                />
                                خوب
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="mastery_skill"
                                    value="4"
                                    className="mx-2"
                                    onClick={(event) => setMastery_skill(event.target.value)}
                                />
                                خیلی خوب
                            </label>
                        </div>
                        {error["status"] & (error["msg"] == "skill") & !mastery_skill ? (
                            <p className="text-red-500 font-bold text-sm mt-2 mr-12">لطفا یک مورد را انتخاب کنید</p>
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className="flex items-center px-4 my-2 mt-4">
                        <div className="flex-1 border-t-2 border-independece/15"></div>
                        <legend className="px-3 font-bold">نحوه برخورد دستیار آموزشی با دانشجو</legend>
                        <div className="flex-1 border-t-2 border-independece/15"></div>
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-evenly max-md:flex-col">
                            <label>
                                <input
                                    type="radio"
                                    name="manner_skill"
                                    value="0"
                                    className="mx-2"
                                    onClick={(event) => setManner_skill(event.target.value)}
                                />
                                خیلی بد
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="manner_skill"
                                    value="1"
                                    className="mx-2"
                                    onClick={(event) => setManner_skill(event.target.value)}
                                />
                                بد
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="manner_skill"
                                    value="2"
                                    className="mx-2"
                                    onClick={(event) => setManner_skill(event.target.value)}
                                />
                                متوسط
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="manner_skill"
                                    value="3"
                                    className="mx-2"
                                    onClick={(event) => setManner_skill(event.target.value)}
                                />
                                خوب
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="manner_skill"
                                    value="4"
                                    className="mx-2"
                                    onClick={(event) => setManner_skill(event.target.value)}
                                />
                                خیلی خوب
                            </label>
                        </div>
                        {error["status"] & (error["msg"] == "skill") & !manner_skill ? (
                            <p className="text-red-500 font-bold text-sm mt-2 mr-12">لطفا یک مورد را انتخاب کنید</p>
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className="flex items-center px-4 my-2 mt-4">
                        <div className="flex-1 border-t-2 border-independece/15"></div>
                        <legend className="px-3 font-bold">پاسخگویی به سوالات دستیار آموزشی</legend>
                        <div className="flex-1 border-t-2 border-independece/15"></div>
                    </div>
                    <div className="mb-6">
                        <div className="flex justify-evenly max-md:flex-col">
                            <label>
                                <input
                                    type="radio"
                                    name="answeringQuestion_skill"
                                    value="0"
                                    className="mx-2"
                                    onClick={(event) => setAnsweringQuestion_skill(event.target.value)}
                                />
                                خیلی بد
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="answeringQuestion_skill"
                                    value="1"
                                    className="mx-2"
                                    onClick={(event) => setAnsweringQuestion_skill(event.target.value)}
                                />
                                بد
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="answeringQuestion_skill"
                                    value="2"
                                    className="mx-2"
                                    onClick={(event) => setAnsweringQuestion_skill(event.target.value)}
                                />
                                متوسط
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="answeringQuestion_skill"
                                    value="3"
                                    className="mx-2"
                                    onClick={(event) => setAnsweringQuestion_skill(event.target.value)}
                                />
                                خوب
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="answeringQuestion_skill"
                                    value="4"
                                    className="mx-2"
                                    onClick={(event) => setAnsweringQuestion_skill(event.target.value)}
                                />
                                خیلی خوب
                            </label>
                        </div>
                        {error["status"] & (error["msg"] == "skill") & !answeringQuestion_skill ? (
                            <p className="text-red-500 font-bold text-sm mt-2 mr-12">لطفا یک مورد را انتخاب کنید</p>
                        ) : (
                            <></>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-32 flex justify-evenly mx-auto rounded-md bg-queen-blue mt-8 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-yonder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-yonder"
                    >
                        ارسال ارزشیابی
                    </button>
                </form>
            </main>
        </>
    );
};

export default Evaluation;
