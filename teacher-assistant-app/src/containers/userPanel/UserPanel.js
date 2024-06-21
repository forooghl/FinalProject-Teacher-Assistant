import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import CardItem from "../../component/CardItem/CardItem";
import Navbar from "../../component/Navbar/Navbar";
import { Loader } from "../../ui/loader/Loader";

const UserPanel = () => {
    const username = sessionStorage.getItem("username");
    const refresh = localStorage.getItem("refresh");
    const token = localStorage.getItem("token");

    const [profile, setProfile] = useState([]);
    const [myTAClasses, setMyTAClasses] = useState([]);
    const [professorClasses, setProfessorClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editProfile, setEditProfile] = useState(false);

    const [newFullName, setNewFullName] = useState("");
    const [newProfilePicture, setNewProfilePicture] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/authentication/profile/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(response.data);
                setIsLoading(false);
            } catch (error) {
                navigate("/error", { state: error.response.status });
            }
            try {
                setIsLoading(true);
                const response = await axios.get("http://127.0.0.1:8000/courses/taCourse/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMyTAClasses(response.data.classes);
                setIsLoading(false);
            } catch (error) {
                navigate("/error", { state: error.response.status });
            }
            try {
                setIsLoading(true);
                const response = await axios.get("http://127.0.0.1:8000/courses/professorCourse", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfessorClasses(response.data.classes);
                setIsLoading(false);
            } catch (error) {
                navigate("/error", { state: error.response.status });
            }
        }
        fetchData();
    }, []);

    const handleLogout = () => {
        axios
            .post(
                "/authentication/logout/",
                { refresh },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then(() => {
                sessionStorage.removeItem("username");
                localStorage.removeItem("refresh");
                localStorage.removeItem("token");
                window.location.href = "/login";
            })
            .catch((err) => console.log(err));
    };

    const EditProfileHandler = (event) => {
        event.preventDefault();
        const formData = new FormData();
        if (newProfilePicture === "" && newFullName === "") {
            console.log("empty");
            axios
                .put(`/authentication/profile/`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    setEditProfile(false);
                    window.location.reload();
                })
                .catch((err) => console.log(err));
        } else if (newProfilePicture === "") {
            formData.append("fullName", newFullName);
            axios
                .put(`/authentication/profile/`, formData, {
                    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    setEditProfile(false);
                    window.location.reload();
                })

                .catch((err) => console.log(err));
        } else if (newFullName === "") {
            console.log(newProfilePicture);
            formData.append("avatar", newProfilePicture);
            axios
                .put(`/authentication/profile/`, formData, {
                    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    setEditProfile(false);
                    window.location.reload();
                })
                .catch((err) => console.log(err));
        } else {
            formData.append("fullName", newFullName);
            formData.append("avatar", newProfilePicture);
            axios
                .put(`/authentication/profile/`, formData, {
                    headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
                })
                .then(() => {
                    setEditProfile(true);
                    window.location.reload();
                })
                .catch((err) => console.log(err));
        }
    };

    if (!isLoading) {
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
        const professorCourse = (
            <>
                {professorClasses.map((item) => {
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
                <main className="flex flex-row h-screen no-wrap">
                    <div className="basis-1/6 h-full">
                        <div className="flex flex-row items-center shadow shadow-independence/15 py-3 pr-4">
                            {profile.avatar ? (
                                <img
                                    className=" w-16 h-16 rounded-full"
                                    src={`http://127.0.0.1:8000${profile.avatar}`}
                                />
                            ) : (
                                <img
                                    className=" w-16 h-16 rounded-full"
                                    src={`http://127.0.0.1:8000/media/Profile/default.png`}
                                />
                            )}

                            {profile.fullName ? (
                                <p className="mr-4">{profile.fullName}</p>
                            ) : (
                                <p className="mr-4">{profile.username}</p>
                            )}
                        </div>
                        <div className="py-3 pr-4 shadow shadow-independence/15 hover:bg-cultured/30">
                            <button
                                onClick={() => {
                                    setEditProfile(false);
                                }}
                            >
                                کلاس دانشجویان
                            </button>
                        </div>
                        <div className="py-3 pr-4 shadow shadow-independence/15 hover:bg-cultured/30">
                            <button
                                onClick={() => {
                                    setEditProfile(true);
                                }}
                            >
                                تغییر اطلاعات حساب کاربری
                            </button>
                        </div>
                        <div className="py-3 pr-4 shadow shadow-independence/15 h-full hover:bg-cultured/30">
                            <button onClick={handleLogout}>خروج از حساب کاربری</button>
                        </div>
                    </div>
                    {editProfile ? (
                        <div className="w-full pt-8">
                            <button
                                onClick={() => {
                                    setEditProfile(false);
                                }}
                                className="float-left "
                            >
                                <i
                                    className="fa fa-arrow-left ml-16 border solid border-black rounded-full p-2"
                                    aria-hidden="true"
                                ></i>
                            </button>
                            <div className="lg:px-8 w-full">
                                <h3 className="mr-8 text-2xl font-bold leading-9 tracking-tight text-raisin-black mb-6">
                                    به روزرسانی صفحه کاربری
                                </h3>
                                <div className="w-full sm:w-full">
                                    <form className="p-8 flex flex-col">
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className=" text-sm font-semibold leading-6 text-raisin-black "
                                            >
                                                نام و نام خانوادگی :
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                placeholder="نام کامل خود را وارد کنید"
                                                value={newFullName}
                                                className=" w-1/5 rounded-l border-b-2 mr-2 border-raisin-black/50 py-1 pr-2 placeholder:text-raisin-black-25 text-raisin-black focus:border-blue-yonder sm:text-sm sm:leading-6"
                                                onChange={(event) => setNewFullName(event.target.value)}
                                            />
                                        </div>
                                        <div className="mt-8">
                                            <label
                                                htmlFor="name"
                                                className="text-sm font-semibold leading-6 text-raisin-black "
                                            >
                                                پروفایل جدید :
                                            </label>
                                            <input
                                                type="file"
                                                placeholder="پروفایل جدید"
                                                className="rounded-md py-1.5 pr-2 text-raisin-black placeholder:text-raisin-black/50 sm:text-sm sm:leading-6"
                                                onChange={(event) => setNewProfilePicture(event.target.files[0])}
                                            />
                                        </div>
                                        <button
                                            onClick={EditProfileHandler}
                                            className="flex w-32 justify-center rounded-md bg-queen-blue mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-yonder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-yonder"
                                        >
                                            ذخیره تغییرات
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="pr-8 mt-8 w-full">
                            <h1 className="font-semibold text-xl">کلاس دانشجویان</h1>
                            {TaCourse.props.children.length > 0 ? (
                                <div className="w-1/2 mt-2 mr-4 border-solid border border-rich-black-fogra-29/10 shadow rounded-md max-md:mb-8">
                                    {TaCourse}
                                    {professorCourse}
                                </div>
                            ) : (
                                <div className="pt-4">چیزی برای نمایش وجود ندارد</div>
                            )}
                        </div>
                    )}
                </main>
            </>
        );
    } else {
        return (
            <>
                <Navbar />
                <Loader />
            </>
        );
    }
};

export default UserPanel;
