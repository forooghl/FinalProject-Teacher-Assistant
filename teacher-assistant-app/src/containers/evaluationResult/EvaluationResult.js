import React, { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import { Loader } from "../../ui/loader/Loader";

const EvaluationResult = () => {
    const { id } = useParams();
    const token = localStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    const [isLoading, setIsLoading] = useState(true);
    const [evaluation, setEvaluation] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("students/evaluationResult/", {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { course_id: id },
                });
                setEvaluation(response.data);
                setIsLoading(false);
            } catch (error) {
                navigate("/error", { state: error.response.status });
            }
        }
        fetchData();
    }, []);
    if (isLoading)
        return (
            <>
                <Navbar />
                <Loader />
            </>
        );
    else
        return (
            <>
                <Navbar />
                <main className="w-3/4 mt-8 mx-auto max-md:w-full max-md:pr-2">
                    <h2 className="font-bold text-xl mb-4">ارزشیابی شما {username}</h2>
                    <div className="pr-4">
                        <p className="font-semibold mb-1.5">
                            مهارت تدریس شما
                            <span className="mx-1 font-bold">{evaluation.teaching_skill}</span>
                            از 4 است.
                            {evaluation.teaching_skill > 2.5 ? (
                                <span className="text-green-700 mr-4 text-sm">عملکرد شما عالی بوده است.</span>
                            ) : evaluation.teaching_skill < 1.5 ? (
                                <span className="text-red-700 mr-4 text-sm">
                                    شما عملکرد خوبی نداشته اید برای ترم های بعد خودتان را در این بخش تقویت کنید تا
                                    دستیار آموزشی بهتری باشید.
                                </span>
                            ) : (
                                <span className="text-yellow-500 mr-4 text-sm">
                                    شما عملکرد قابل قبولی داشته اید اما سعی کنید بهتر عمل کنید.
                                </span>
                            )}
                        </p>
                        <p className="font-semibold mb-1.5">
                            دانش شما در این درس
                            <span className="mx-1 font-bold">{evaluation.mastery_skill}</span>
                            از 4 است.
                            {evaluation.mastery_skill > 2.5 ? (
                                <span className="text-green-700 mr-4 text-sm">عملکرد شما عالی بوده است.</span>
                            ) : evaluation.mastery_skill < 1.5 ? (
                                <span className="text-red-700 mr-4 text-sm">
                                    شما عملکرد خوبی نداشته اید برای ترم های بعد خودتان را در این بخش تقویت کنید تا
                                    دستیار آموزشی بهتری باشید.
                                </span>
                            ) : (
                                <span className="text-yellow-500 mr-4 text-sm">
                                    شما عملکرد قابل قبولی داشته اید اما سعی کنید بهتر عمل کنید.
                                </span>
                            )}
                        </p>
                        <p className="font-semibold mb-1.5">
                            اخلاق و رفتار شما
                            <span className="mx-1 font-bold">{evaluation.manner_skill}</span>
                            از 4 است.
                            {evaluation.manner_skill > 2.5 ? (
                                <span className="text-green-700 mr-4 text-sm">عملکرد شما عالی بوده است.</span>
                            ) : evaluation.manner_skill < 1.5 ? (
                                <span className="text-red-700 mr-4 text-sm">
                                    شما عملکرد خوبی نداشته اید برای ترم های بعد خودتان را در این بخش تقویت کنید تا
                                    دستیار آموزشی بهتری باشید.
                                </span>
                            ) : (
                                <span className="text-yellow-500 mr-4 text-sm">
                                    شما عملکرد قابل قبولی داشته اید اما سعی کنید بهتر عمل کنید.
                                </span>
                            )}
                        </p>
                        <p className="font-semibold mb-1.5">
                            مهارت پاسخ دهی شما به پرسش دانشجویان
                            <span className="mx-1 font-bold">{evaluation.answeringQuestion_skill}</span>
                            از 4 است.
                            {evaluation.answeringQuestion_skill > 2.5 ? (
                                <span className="text-green-700 mr-4 text-sm">عملکرد شما عالی بوده است.</span>
                            ) : evaluation.answeringQuestion_skill < 1.5 ? (
                                <span className="text-red-700 mr-4 text-sm">
                                    شما عملکرد خوبی نداشته اید برای ترم های بعد خودتان را در این بخش تقویت کنید تا
                                    دستیار آموزشی بهتری باشید.
                                </span>
                            ) : (
                                <span className="text-yellow-500 mr-4 text-sm">
                                    شما عملکرد قابل قبولی داشته اید اما سعی کنید بهتر عمل کنید.
                                </span>
                            )}
                        </p>
                    </div>
                </main>
            </>
        );
};

export default EvaluationResult;
