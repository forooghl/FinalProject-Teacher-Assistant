import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import axios from "../axios";
import React, { useEffect, useState } from "react";
import { Loader } from "../../ui/loader/Loader";

const RecommenderSystem = () => {
    const token = localStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    const [result, setResult] = useState(<></>);
    const [title, setTitle] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isProfessor, setIsProfessor] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/courses/professorCourse", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (response.data.classes.length > 0) setIsProfessor(true);
                else navigate("/error", { state: 403 });
                setIsLoading(false);
            } catch (error) {
                navigate("/error", { state: error.response.status });
            }
        }
        fetchData();
    }, []);
    const recommenderHandler = (event) => {
        event.preventDefault();
        setIsLoading(true);
        axios
            .get("/students/TaRS/", {
                headers: { Authorization: `Bearer ${token}` },
                params: { title: title },
            })
            .then((response) => {
                const sorted_data = response.data.sort((a, b) => {
                    return b.evaluation < a.evaluation ? -1 : b.evaluation > a.evaluation ? 1 : 0;
                });

                const evaluationResult = sorted_data.map((item) => {
                    if (item.evaluation == 1)
                        return (
                            <div className="max-w-md border-solid border border-rich-black-fogra-29/10 py-2 shadow rounded-md pr-4">
                                <p className="font-semibold text-queen-blue">
                                    <i className="fa-solid fa-user ml-2"></i>
                                    <span className="text-raisin-black">{item.name}</span>
                                    <span className="font-semibold text-green-700 mr-2">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </span>
                                </p>

                                <p className="font-semibold text-queen-blue">
                                    <i className="fa-solid fa-envelope ml-2"></i>
                                    <span className="text-raisin-black">{item.email}</span>
                                </p>
                            </div>
                        );
                    else if (item.evaluation == 0)
                        return (
                            <div className="max-w-md border-solid border border-rich-black-fogra-29/10 py-2 shadow rounded-md max-md:mb-8 pr-4">
                                <p className="font-semibold text-queen-blue">
                                    <i className="fa-solid fa-user ml-2"></i>
                                    <span className="text-raisin-black">{item.name}</span>
                                    <span className="font-semibold text-yellow-500 mr-2">
                                        <i className="fa-solid fa-star"></i>
                                        <i className="fa-solid fa-star"></i>
                                    </span>
                                </p>

                                <p className="font-semibold text-queen-blue">
                                    <i className="fa-solid fa-envelope ml-2"></i>
                                    <span className="text-raisin-black">{item.email}</span>
                                </p>
                            </div>
                        );
                    else
                        return (
                            <div className="max-w-md border-solid border border-rich-black-fogra-29/10 py-2 shadow rounded-md max-md:mb-8 pr-4">
                                <p className="font-semibold text-queen-blue">
                                    <i className="fa-solid fa-user ml-2"></i>
                                    <span className="text-raisin-black">{item.name}</span>
                                    <span className="font-semibold text-red-700 mr-2">
                                        <i className="fa-solid fa-star"></i>
                                    </span>
                                </p>

                                <p className="font-semibold text-queen-blue">
                                    <i className="fa-solid fa-envelope ml-2"></i>
                                    <span className="text-raisin-black">{item.email}</span>
                                </p>
                            </div>
                        );
                });
                setResult(evaluationResult);
                setIsLoading(false);
            });
    };

    if (isLoading) return <Loader />;
    else
        return (
            <>
                <Navbar />
                <main className="px-8 w-full mt-4 m-auto flex flex-col max-md:items-center">
                    <h3 className="mr-8 text-2xl font-bold leading-9 tracking-tight text-raisin-black mb-6 text-center">
                        سیستم پیشنهاد دستیار آموزشی
                    </h3>
                    <form onSubmit={recommenderHandler} className="max-w-md mb-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                id="search"
                                type="search"
                                placeholder="نام درس مورد نظر را جست و جو کنید"
                                autoFocus
                                required
                                className="block w-full p-4 ps-10 text-sm text-raisin-black border placeholder:text-raisin-black-25 border-independence/25 rounded-lg bg-cultured focus:ring-independence/50 "
                                value={title}
                                onChange={(event) => {
                                    setTitle(event.target.value);
                                }}
                            />
                            <button
                                type="submit"
                                className="text-white absolute end-2.5 bottom-2.5 bg-queen-blue hover:bg-blue-yonder focus:ring-4 focus:outline-none focus:ring-blue-yonder font-medium rounded-lg text-sm px-4 py-2"
                            >
                                جست و جو
                            </button>
                        </div>
                    </form>
                    {result.length < 1 ? (
                        <div className="max-md:w-full w-96 border-solid border border-rich-black-fogra-29/10 py-8 shadow rounded-md pr-4 mx-auto mt-32">
                            <p className="text-center font-semibold">پیشنهادی جهت نمایش وجود ندارد!</p>
                        </div>
                    ) : (
                        <div className="flex flex-col w-full">{result}</div>
                    )}
                </main>
            </>
        );
};

export default RecommenderSystem;
