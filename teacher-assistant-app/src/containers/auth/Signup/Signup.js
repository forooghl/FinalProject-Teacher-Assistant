// import "./Login.css";
import Logo from "../../../assets/img/Logo.png";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";
const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [SignedIn, setSignedIn] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        if (SignedIn) {
            return navigate("/");
        }
    }, [SignedIn]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("/authentication/register/", {
                username,
                email,
                password,
            });
            console.log(response);
            const token_response = await axios.post("/authentication/login/", { username, password });

            localStorage.setItem("refresh", token_response.data.refresh);
            localStorage.setItem("token", token_response.data.access);
            sessionStorage.setItem("username", username);
            setSignedIn(true);
        } catch (error) {
            try {
                if (error.response.data.username) setError("حسابی با این نام کاربری وجود دارد");
                else if (error.response.data.email) setError("حسابی با این ایمیل وجود دارد");
            } catch {}
        }
    };

    return (
        <>
            <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-cultured">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-20 w-auto" src={Logo} alt="NIT Company" />
                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-raisin-black">
                        عضویت در NIT
                    </h2>
                    {error && (
                        <p className="text-center mt-4 text-queen-blue font-semibold" id="error">
                            {error}
                        </p>
                    )}
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6 border-solid border border-rich-black-fogra-29/10 shadow rounded-md p-8"
                        action="#"
                        method="POST"
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-raisin-black">
                                نام کاربری
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="نام کاربری خود را وارد کنید"
                                    minlength="4"
                                    required
                                    value={username}
                                    onChange={(event) => setUsername(event.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pr-2 text-raisin-black shadow-sm ring-1 ring-inset ring-rich-black-fogra-29/25 placeholder:text-raisin-black/50 focus:ring-1 focus:ring-inset focus:ring-rich-black-fogra-29/2 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-raisin-black">
                                ایمیل
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="ایمیل خود را وارد کنید"
                                    required
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pr-2 text-raisin-black shadow-sm ring-1 ring-inset ring-rich-black-fogra-29/25 placeholder:text-raisin-black/50 focus:ring-1 focus:ring-inset focus:ring-rich-black-fogra-29/2 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-raisin-black"
                                >
                                    رمز عبور
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="رمز عبور خود را وارد کنید"
                                    autoComplete="current-password"
                                    minlength="8"
                                    required
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 pr-2 text-raisin-black shadow-sm ring-1 ring-inset ring-rich-black-fogra-29/25 placeholder:text-raisin-black/50 focus:ring-1 focus:ring-inset focus:ring-rich-black-fogra-29/2 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-queen-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-yonder focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-yonder"
                            >
                                عضویت
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-raisin-black/75">
                        حساب کاربری دارید ؟{" "}
                        <Link to="/Login" className="font-semibold leading-6 text-queen-blue hover:text-blue-yonder">
                            ورود به سایت
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Signup;
