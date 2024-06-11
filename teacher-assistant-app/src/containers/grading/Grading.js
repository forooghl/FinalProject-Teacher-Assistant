import React, { useEffect } from "react";
import Navbar from "../../component/Navbar/Navbar";
import axios from "../axios";
import { useParams } from "react-router-dom";

const Grading = () => {
    const token = localStorage.getItem("token");
    // const { id } = useParams();
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`/students/courseStudents/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log(response);
            } catch {}
        }
        fetchData();
    }, []);
    return (
        <>
            <Navbar />
            <div>Grading</div>
        </>
    );
};

export default Grading;
