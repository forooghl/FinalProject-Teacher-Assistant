import React from "react";
import { Link, useLocation } from "react-router-dom";
const Error = () => {
    const location = useLocation();

    const error_status = location.state;

    if (error_status == "404") {
        return (
            <main>
                <div className="w-[60%] my-[11%] mx-auto text-center">
                    <h1 className="tracking-widest text-[7em] font-extralight text-independence ">404</h1>
                    <h2 className="tracking-widest text-raisin-black text-2xl mb-4 font-bold">ای وای! صفحه یافت نشد</h2>
                    <p className="tracking-widest text-raisin-black">
                        صفحه ای که به دنبال آن هستید ممکن است حذف شده باشد یا به طور موقت در دسترس نباشد.{" "}
                        <span className="border-b-[.07em] border-dashed border-independence text-independence ">
                            <Link to="/">بازگشت به صفحه اصلی</Link>
                        </span>
                    </p>
                </div>
            </main>
        );
    } else if (error_status == "401") {
        return (
            <main>
                <div className="w-[60%] my-[11%] mx-auto text-center">
                    <h1 className="tracking-widest text-[7em] font-extralight text-independence ">401</h1>
                    <h2 className="tracking-widest text-raisin-black text-2xl mb-4 font-bold">
                        ای وای! عدم احراز هویت
                    </h2>
                    <p className="tracking-widest text-raisin-black">
                        دسترسی به این صفحه فقط برای کاربران ثبت نام شده مجاز است!{" "}
                        <span className="border-b-[.07em] border-dashed border-independence text-independence ">
                            <Link to="/login">ورود به حساب کاربری</Link>
                        </span>
                    </p>
                </div>
            </main>
        );
    } else if (error_status == "403") {
        return (
            <main className="">
                <div className="w-[60%] my-[11%] mx-auto text-center">
                    <h1 className="tracking-widest text-[7em] font-extralight text-independence ">403</h1>
                    <h2 className="tracking-widest text-raisin-black text-2xl mb-4 font-bold">
                        ای وای! مجوز رد شده است
                    </h2>
                    <p className="tracking-widest text-raisin-black">
                        شما مجوز دسترسی به این صفحه را ندارید!{" "}
                        <span className="border-b-[.07em] border-dashed border-independence text-independence ">
                            <Link to="/">بازگشت به صفحه اصلی</Link>
                        </span>
                    </p>
                </div>
            </main>
        );
    } else if (error_status == "500") {
        return (
            <main className="">
                <div className="w-[60%] my-[11%] mx-auto text-center">
                    <h1 className="tracking-widest text-[7em] font-extralight text-independence ">{error_status}</h1>
                    <h2 className="tracking-widest text-raisin-black text-2xl mb-4 font-bold">ای وای! خطای سرور</h2>
                    <p className="tracking-widest text-raisin-black">
                        سرور با یک خطای داخلی یا پیکربندی اشتباه مواجه شده است و نمی‌تواند درخواست شما را تکمیل کند{" "}
                        <span className="border-b-[.07em] border-dashed border-independence text-independence ">
                            <Link to="/">بازگشت به صفحه اصلی</Link>
                        </span>
                    </p>
                </div>
            </main>
        );
    } else {
        return (
            <main className="">
                <div className="w-[60%] my-[11%] mx-auto text-center">
                    <h1 className="tracking-widest text-[7em] font-extralight text-independence ">{error_status}</h1>
                    <h2 className="tracking-widest text-raisin-black text-2xl mb-4 font-bold">
                        ای وای! خطایی رخ داده است
                    </h2>
                    <p className="tracking-widest text-raisin-black">
                        بابت مشکل پیش آمده پوزش می‌طلبیم.{" "}
                        <span className="border-b-[.07em] border-dashed border-independence text-independence ">
                            <Link to="/">بازگشت به صفحه اصلی</Link>
                        </span>
                    </p>
                </div>
            </main>
        );
    }
};

export default Error;
