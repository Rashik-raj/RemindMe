import Box from "@mui/material/Box";
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import DraftsIcon from '@mui/icons-material/Drafts';
import React from "react";


export default function SideBar(props) {
    return (<Box flex={1} bgcolor={"cornsilk"} sx={{display: {xs: 'none', md: 'block'}}}>
        <List>
            <ListItem disablePadding>
                <ListItemButton selected={props.selectedMenu === "Schedules"}
                                onClick={(event) => props.hanleMenuClick(event, "Schedules")}>
                    <ListItemIcon>
                        <PendingActionsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Schedules"/>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton selected={props.selectedMenu === "Emails"}
                                onClick={(event) => props.hanleMenuClick(event, "Emails")}>
                    <ListItemIcon>
                        <DraftsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Emails"/>
                </ListItemButton>
            </ListItem>
        </List>
    </Box>)
}