import { React } from "react";
import Navbar from "../../component/Navbar/Navbar";
import Course from "../../component/Course/Course";
import Card from "../../component/Card/Card";

const Home = () => {
    // fake data for testing UI
    const course = (
        <>
            <Course semester="پاییز 1402" teacherName="دکتر علی غلامی رودی" courseName="کامپایلر" />
            <Course semester="بهار 1402" teacherName="دکتر علی غلامی رودی" courseName="سیستم عامل" />
        </>
    );

    const TaCourse = <Course semester="پاییز 1401" teacherName="دکتر علی غلامی رودی" courseName="سیستم عامل" />;
    return (
        <>
            <Navbar />
            <div className="flex justify-evenly flex-wrap max-md:flex-nowrap mt-10 max-md:flex-col max-md:items-center ">
                <Card title="کلاس های من" courses={course} />
                <Card title="کلاس های درس" courses={TaCourse} />
            </div>
        </>
    );
};
export default Home;
