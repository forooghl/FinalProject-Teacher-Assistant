import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
const Exercise = (props) => {
    const { id } = useParams();

    const token = localStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    const [exercise, setExercise] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                setIsLoading(true);
                const response = await axios.get(`http://127.0.0.1:8000/courses/exerciseData/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setExercise(response.data.exercise_data);
                setIsLoading(false);
            } catch (error) {
                Promise.reject(error);
                // navigate("/error404");
            }
        }
        fetchData();
    }, []);

    // exercise file is not displayed
    if (isLoading) {
        return <Navbar />;
    } else {
        return (
            <>
                <Navbar />
                <div className="flex w-5/12 max-md:w-4/5 mx-auto my-10 py-4 px-4 shadow shadow-independence/15 flex-wrap md:flex-nowrap ">
                    <div className="flex flex-col w-full">
                        <h1 className="font-bold text-raisin-black text-lg self-center mb-2">{exercise[0].exerciseName}</h1>
                        <p>
                            {exercise[0].body}
                        </p>
                        <div class="flex items-center px-4 my-4">
                            <div class="flex-1 border-t-2 border-independece/15"></div>
                            <span class="px-3 font-bold">بارگذاری پاسخ تمرین</span>
                            <div class="flex-1 border-t-2 border-independece/15"></div>
                        </div>

                        <form>
                            <label htmlFor="uploadFile" className="block">
                                فایل <span className="text-red-500">*</span>
                            </label>
                            {/* upload is not working :) */}
                            <input
                                id="uploadFile"
                                name="uploadFile"
                                type="file"
                                className="text-raisin-black/50 cursor-pointer file:cursor-pointer file:border-none file:py-1 file:px-3 file:bg-queen-blue file:hover:bg-blue-yonder file:text-cultured file:rounded"
                            />
                        </form>
                    </div>
                </div>
            </>
        );
    }
};

export default Exercise;
