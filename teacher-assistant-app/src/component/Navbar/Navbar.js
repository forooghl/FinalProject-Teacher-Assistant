import { React, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import axios from "../../containers/axios";

const Navbar = (props) => {
    const username = sessionStorage.getItem("username");
    const refresh = localStorage.getItem("refresh");
    const token = localStorage.getItem("token");

    const [profile, setProfile] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isProfessor, setIsProfessor] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            if (username) {
                try {
                    const response = await axios.get("/authentication/profile/", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    setProfile(response.data);
                    setIsLoading(false);
                } catch (error) {
                    Promise.reject(error);
                    // navigate("/error404");
                }
                try {
                    const response = await axios.get("/courses/professorCourse", {
                        headers: { Authorization: `Bearer ${token}` },
                    });
                    if (response.data.classes.length > 0) setIsProfessor(true);
                    setIsLoading(false);
                } catch (error) {
                    navigate("/error", { state: error.response.status });
                }
            }
        }
        fetchData();
    }, []);
    // TODO : control activeClassName="is-active" in NavLink with props
    return (
        <header>
            <nav className="bg-cultured/50 shadow shadow-independence/15 w-100 px-8 md:px-auto">
                <div className="h-14 mx-auto md:px-4 container flex items-center justify-around flex-nowrap">
                    {/* Logo */}
                    <div>
                        <NavLink to="/">
                            <div className="flex flex-row justify-between">
                                <img className="h-11 w-11" src={Logo} />
                                <p className="self-center font-bold text-queen-blue font-Merienda">LearnEase</p>
                            </div>
                        </NavLink>
                    </div>
                    <div className="text-tufts-blue basis-9/12 max-lg:basis-6/12 max-md:w-auto max-md:basis-1/3">
                        <ul className="flex font-semibold justify-start max-md:justify-between">
                            <li className="md:px-4 md:py-2">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "ease-in duration-300 text-queen-blue font-bold pb-3 border-b-2 border-independence"
                                            : "transition ease-in delay-150 duration-300 text-tufts-blue hover:text-queen-blue hover:font-bold "
                                    }
                                >
                                    داشبورد
                                </NavLink>
                            </li>
                            {isProfessor ? (
                                <li className="md:px-4 md:py-2">
                                    <NavLink
                                        to="/TaRS"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "text-queen-blue font-bold pb-3 border-b-2 border-independence"
                                                : "transition ease-in delay-150 duration-300 text-tufts-blue hover:text-queen-blue hover:font-bold "
                                        }
                                    >
                                        پیشنهاد دستیار آموزشی
                                    </NavLink>
                                </li>
                            ) : (
                                <></>
                            )}
                            <li class="md:px-4 md:py-2">
                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-queen-blue font-bold pb-3 border-b-2 border-independence"
                                            : "transition ease-in delay-150 duration-300 text-tufts-blue hover:text-queen-blue hover:font-bold "
                                    }
                                >
                                    ارتباط با ما
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="text-queen-blue max-md:w-fit">
                        {username ? (
                            <NavLink to="/profile">
                                <div className="flex flex-row transition ease-in delay-150 duration-300 hover:text-blue-yonder">
                                    <p className="py-4 px-4 font-semibold ">خوش آمدی {username}</p>
                                    {isLoading ? (
                                        <div className="fa-layers fa-fw fa-2xl">
                                            <i className="fa fa-user-circle" title="صفحه شخصی"></i>
                                        </div>
                                    ) : profile.avatar ? (
                                        <img
                                            className=" w-12 h-12 rounded-full self-center"
                                            src={`http://127.0.0.1:8000${profile.avatar}`}
                                        />
                                    ) : (
                                        <img
                                            className=" w-12 h-12 rounded-full self-center"
                                            src={`http://127.0.0.1:8000/media/Profile/default.png`}
                                        />
                                    )}
                                </div>
                            </NavLink>
                        ) : (
                            <NavLink to="/login">
                                <div className="px-3 py-1 bg-queen-blue hover:bg-blue-yonder text-cultured rounded-lg flex items-center gap-2">
                                    <span>ورود</span>
                                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                                </div>
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
