import SideBar from "./SideBar";
import MainContent from "./MainContent";
import {Stack} from "@mui/material";
import React from "react";

export default function Content(props) {

    return (<Stack direction="row" justifyContent={"space-between"}>
        <SideBar hanleMenuClick={props.handleMenuClick}/>
        <MainContent selectedMenu={props.selectedMenu}/>
    </Stack>)
}