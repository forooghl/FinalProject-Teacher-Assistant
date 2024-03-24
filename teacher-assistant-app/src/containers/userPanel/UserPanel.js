import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import Card from "../../component/Card/Card";

const UserPanel = () => {
    const username = sessionStorage.getItem("username");
    const refresh = localStorage.getItem("refresh");
    const token = localStorage.getItem("token");

    const [profile, setProfile] = useState([]);
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("/authentication/profile/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProfile(response.data.Profile);
            } catch (error) {
                Promise.reject(error);
                // navigate("/error404");
            }
            try {
                setIsLoading(true);
                const response = await axios.get("/Courses/taCourse/", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setClasses(response.data["classes"]);
                setIsLoading(false);
                console.log(response.data["classes"]);
                console.log(classes);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleLogout = () => {
        axios
            .get("/authentication/logout/", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                sessionStorage.removeItem("username");
                localStorage.removeItem("refresh");
                localStorage.removeItem("token");
                window.location.href = "/login";
            })
            .catch((err) => console.log(err));
    };

    const EditProfileHandler = () => {
        // navigate("/editProfile");
    };
    return (
        <>
            <header>
                <div className="user-panel-container">
                    <div className="grid px8">
                        <div className="profile-image">
                            {/* {profile.length > 0 && (
                                <img
                                    key={Date.now()}
                                    className="profile-pic"
                                    src={`http://127.0.0.1:8000${profile[0].avatar}`}
                                    alt="Profile Picture"
                                />
                            )} */}
                        </div>

                        <div className="profile-info">
                            <div className="profile-user-settings">
                                <h1 className="profile-user-name">{username}</h1>

                                <button className="icon-profile-edit-btn" onClick={EditProfileHandler}>
                                    <i className="fa-solid fa-user-pen"></i>
                                </button>
                                <button className="btn profile-edit-btn" onClick={EditProfileHandler}>
                                    Edit Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="profile-settings-btn"
                                    aria-label="profile settings"
                                >
                                    <i className="fa-solid fa-right-from-bracket" title="Log out"></i>
                                </button>
                            </div>

                            <div className="profile-stats">
                                <ul>
                                    <li>
                                        {classes.length > 0 && (
                                            <span className="profile-stat-count">{classes.length} </span>
                                        )}
                                        classes
                                    </li>
                                </ul>
                            </div>

                            {/* <div className="profile-bio">{profile.length > 0 && <p>{profile[0].bio}</p>}</div> */}
                        </div>
                    </div>
                </div>
            </header>

            {isLoading ? (
                <></>
            ) : (
                // <Loader />

                <main>
                    <div className="container">
                        <div className="gallery">
                            {classes.map((item) => (
                                <Card key={item.id} id={item.id} title={item.courseName} />
                            ))}
                        </div>
                    </div>
                    <div className="add-post-button">
                        <Link to={"/addCourse"}>
                            <i title="add post" className="fa fa-plus-square-o"></i>
                        </Link>
                    </div>
                </main>
            )}
        </>
    );
};

export default UserPanel;
