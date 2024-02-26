import { React } from "react";
import Navbar from "../../component/Navbar/Navbar";
import CardItem from "../../component/CardItem/CardItem";
import Card from "../../component/Card/Card";

const Home = () => {
    // fake data for testing UI
    const course = (
        <>
            <CardItem
                date="پاییز 1402"
                teacherName="دکتر علی غلامی رودی"
                title="کامپایلر"
                id="1"
                linkURL="course"
            />
            <CardItem
                date="بهار 1402"
                teacherName="دکتر علی غلامی رودی"
                title="سیستم عامل"
                id="2"
                linkURL="course"
            />
        </>
    );

    const TaCourse = (
        <CardItem
            date="پاییز 1401"
            teacherName="دکتر علی غلامی رودی"
            title="سیستم عامل"
            id="3"
            linkURL="course"
        />
    );
    return (
        <>
            <Navbar />
            <div className="flex justify-evenly flex-wrap max-md:flex-nowrap mt-10 max-md:flex-col max-md:items-center ">
                <Card title="کلاس های من" items={course} />
                <Card title="کلاس های درس" items={TaCourse} />
            </div>
        </>
    );
};
export default Home;
