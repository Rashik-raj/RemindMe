import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import Content from "./Content";
import axios from "axios";
import {toast} from "react-toastify";
import Profile from "./Profile";

export default function Dashboard() {
    const [initialLoad, setInitialLoad] = useState(true);
    const [selectedMenu, setSelectedMenu] = useState("Schedules");
    const [profile, setProfile] = useState(null);
    const [openProfile, setOpenProfile] = useState(false);
    const handleOpenProfile = () => setOpenProfile(true);
    const handleCloseProfile = () => setOpenProfile(false);

    const handleMenuClick = (event, menu) => {
        setSelectedMenu(menu);
    }

    const updateProfile = (profile) => {
        setProfile(profile)
    }
    useEffect(() => {
        if (localStorage.getItem('access') === null) {
            window.location.href = '/signin';
        }
        if (initialLoad) {
            axios.get('/profiles/my-profile/').then(res => {
                setProfile(res.data);
            }).catch(err => {
                toast.error("Error loading profile.");
            })
            setInitialLoad(false);
        }
    }, [initialLoad]);

    return (<React.Fragment>
        <NavBar selectedMenu={selectedMenu} handleMenuClick={handleMenuClick} profile={profile}
                handleOpenProfile={handleOpenProfile} handleCloseProfile={handleCloseProfile}
                openProfile={openProfile}/>
        <Content selectedMenu={selectedMenu} handleMenuClick={handleMenuClick}/>
        <Profile profile={profile} handleOpenProfile={handleOpenProfile} handleCloseProfile={handleCloseProfile}
                 openProfile={openProfile} updateProfile={updateProfile}/>
    </React.Fragment>);
}