import React from "react";
import { Route, Routes } from "react-router-dom";

// import pages
import Login from "./auth/Login/Login";
import Signup from "./auth/Signup/Signup";
import Home from "./home/Home";
import CourseView from "./courseView/CourseView";

class Routers extends React.Component {
    render() {
        return (
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/course/:id" exact element={<CourseView />} />
                <Route path="/login" exact element={<Login />} />
                <Route path="/signup" exact element={<Signup />} />
            </Routes>
        );
    }
}

export default Routers;