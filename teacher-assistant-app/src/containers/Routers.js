import React from "react";
import { Route, Routes } from "react-router-dom";

// import pages
import Login from "./auth/Login/Login";
import Signup from "./auth/Signup/Signup";
import Home from "./home/Home";
import CourseView from "./courseView/CourseView";
import Exercise from "./exercise/Exercise";
import UserPanel from "./userPanel/UserPanel";
import NewClass from "./newClass/NewClass";
import JoinNewClass from "./joinNewClass/JoinNewClass";
import NewExercise from "./newExercise/NewExercise";
import Error from "./error/Error";
import Evaluation from "./evaluation/Evaluation";

class Routers extends React.Component {
    render() {
        return (
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/error" exact element={<Error />} />
                <Route path="/newCourse" exact element={<NewClass />} />
                <Route path="/addExercise" exact element={<NewExercise />} />
                <Route path="/course/:id" exact element={<CourseView />} />
                <Route path="/evaluation" exact element={<Evaluation />} />
                <Route path="/joinClass/:id" exact element={<JoinNewClass />} />
                <Route path="/practice/:id" exact element={<Exercise />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/signup" exact element={<Signup />} />
                <Route path="/profile" exact element={<UserPanel />} />
            </Routes>
        );
    }
}

export default Routers;
