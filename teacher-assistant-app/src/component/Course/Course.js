import { React } from "react";
import { Link } from "react-router-dom";
const Course = (props) => {
    return (
        <Link to="/">
            <div className="h-16 mx-auto px-4 flex items-center shadow shadow-independence/15 justify-between flex-wrap md:flex-nowrap hover:bg-cultured/30">
                <div className="flex flex-col">
                    <p className="font-semibold text-raisin-black">{props.courseName}</p>
                    <p className="text-raisin-black/75 text-sm">{props.teacherName}</p>
                </div>
                <p className="text-raisin-black/50 text-sm" >{props.semester}</p>
            </div>
        </Link>
    );
};
export default Course;
