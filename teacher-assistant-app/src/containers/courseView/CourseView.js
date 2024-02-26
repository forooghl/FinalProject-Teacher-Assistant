import React from "react";
import Navbar from "../../component/Navbar/Navbar";
import Card from "../../component/Card/Card";
import CardItem from "../../component/CardItem/CardItem";

const CourseView = (props) => {
    // fake data for testing UI
    const practice = (
        <>
            <CardItem title="تمرین سری سوم" teacherName="" date="23 فروردین" id="3" linkURL="practice" />
            <CardItem title="تمرین سری دوم" teacherName="" date="23 اسفند" id="2" linkURL="practice" />
            <CardItem title="تمرین سری اول" teacherName="" date="23 بهمن" id="1" linkURL="practice" />
        </>
    );
    const classDetail = (
        <div className="text-center text-raisin-black mt-2">
            {/* dynamic data when connected to the backend */}
            <h1 className="font-bold text-xl mb-2">اصول طراحی کامپایلر</h1>
            <h2 className=" text-sm">دکتر علی غلامی رودی</h2>

            <div class="flex items-center px-4 my-2">
                <div class="flex-1 border-t-2 border-independece/15"></div>
                <span class="px-3 font-bold">دستیاران آموزشی</span>
                <div class="flex-1 border-t-2 border-independece/15"></div>
            </div>

            {/* dynamic data when connected to the backend */}
            <div className="text-sm">
                <p className="mb-2">محدثه قنبری</p>
                <p className="mb-2">فاطمه زحمتکش</p>
                <p className="mb-2">فروغ میراسماعیلی</p>
            </div>
        </div>
    );
    return (
        <>
            <Navbar />
            <div className="flex justify-evenly flex-wrap max-md:flex-nowrap mt-10 max-md:flex-col max-md:items-center">
                <div className="w-3/12  max-md:w-10/12">
                    <Card title="🏛️درس در یک نگاه" items={classDetail} />
                </div>
                <div className="w-3/12  max-md:w-10/12">
                    <Card title="📰 اطلاع رسانی" items={practice} />
                </div>
                <div className="w-4/12  max-md:w-10/12">
                    <Card title="📑تمرین‌ها" items={practice} />
                </div>
            </div>
        </>
    );
};

export default CourseView;
