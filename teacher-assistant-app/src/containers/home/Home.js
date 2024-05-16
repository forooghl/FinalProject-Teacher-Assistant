import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar/Navbar";
import CardItem from "../../component/CardItem/CardItem";
import Card from "../../component/Card/Card";
import axios from "../axios";

const Home = () => {
    const username = sessionStorage.getItem("username");
    const refresh = localStorage.getItem("refresh");
    const token = localStorage.getItem("token");

    const [myClasses, setMyClasses] = useState([]);
    const [myTAClasses, setMyTAClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);

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
            } else {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const SearchResult = (event) => {
        event.preventDefault();
        axios
            .get(`/courses/search?search=${search}`)
            .then((request) => {
                setSearchResult(request.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    if (!isLoading) {
        const searchCourse = (
            <>
                {searchResult.map((item) => {
                    return (
                        <CardItem
                            key={item.id}
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
        const course = (
            <>
                {myClasses.map((item) => {
                    return (
                        <CardItem
                            key={item.id}
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
                            key={item.id}
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
                        <div className="flex flex-row justify-between">
                            <form onSubmit={SearchResult} className="max-w-md mb-4">
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
                                        value={search}
                                        onChange={(event) => {
                                            setSearch(event.target.value);
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
                            <div>
                                <Link to="/newCourse">
                                    <div className="hidden max-sm:inline-block mt-3 mx-auto mr-2">
                                        <i className="px-2 py-1.5 fa-solid fa-plus  bg-blue-yonder text-cultured rounded-full"></i>
                                    </div>
                                    <div className="max-sm:hidden flex w-32 mt-2 ml-2 mr-2 justify-center rounded-md bg-queen-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-yonder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-yonder">
                                        <p className="">ایجاد کلاس جدید</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        {searchResult.length >= 1 ? (
                            <div className="mb-4">
                                <Card title="نتیجه جست وجو" items={searchCourse} />
                            </div>
                        ) : (
                            <></>
                        )}
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
