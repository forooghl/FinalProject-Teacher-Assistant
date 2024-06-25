import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar/Navbar";
import axios from "../axios";
import { useNavigate, useParams } from "react-router-dom";

const Grading = () => {
    const token = localStorage.getItem("token");
    const { id } = useParams();
    const [grade_list, setGrade_list] = useState([]);
    const [studentList, setStudentList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/students/grading/`, {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { course_id: id },
                });
                console.log(response);
                setStudentList(response.data["students"]);
            } catch {}
        }
        fetchData();
    }, []);

    const updateGradeHandler = (i, event, user_id) => {
        const newGrade_list = [...grade_list];
        if (event.target.value > 0) {
            newGrade_list[i] = event.target.value;
        } else {
            newGrade_list[i] = 0;
        }
        setGrade_list(newGrade_list);
        axios
            .put(
                "/students/grading/",
                { id: id, grade: newGrade_list[i], student_id: user_id },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((response) => {})
            .catch((error) => {
                navigate("/error", { state: error.response.status });
            });
    };

    const studentCard = (
        <>
            {studentList.map((item, index) => {
                return (
                    <div
                        key={item.id}
                        className=" h-16 w-full mx-auto px-4 flex items-center shadow shadow-independence/15 justify-between flex-nowrap hover:bg-cultured/30"
                    >
                        <div className="flex flex-col justify-between">
                            <p className="text-raisin-black/75 text-sm">
                                شماره دانشجویی: <span className="text-independence">{item.std_number}</span>
                            </p>
                        </div>
                        <p className="text-united-nations-blue text-sm font-semibold mr-2">
                            <input
                                name="grade"
                                min={0}
                                max={20}
                                type="number"
                                className="border-2 py-1.5 text-center w-[60px]"
                                value={grade_list[index] || item.grade}
                                onChange={(event) => updateGradeHandler(index, event, item.user_id)}
                            />
                        </p>
                    </div>
                );
            })}
        </>
    );
    return (
        <>
            <Navbar />
            <main className="h-screen no-wrap text-center mt-4 mx-auto">
                <h2 className="font-bold text-lg">ارزشیابی دانشجویان درس</h2>
                <div className="w-1/2 mx-auto mt-4">{studentCard}</div>
            </main>
        </>
    );
};

export default Grading;
