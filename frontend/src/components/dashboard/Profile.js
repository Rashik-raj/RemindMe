import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextField from "@mui/material/TextField";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

import React, {useState} from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Button} from "@mui/material";
import axios from "axios";
import {toast} from 'react-toastify';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Profile(props) {
    const [formValues, setFormValues] = useState(null);

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setFormValues({
            ...formValues, [id]: value,
        });
    };

    const handleDateInputChange = (newValue) => {
        setFormValues({
            ...formValues, dob: newValue,
        });
    }


    const handleprofileUpdate = (event) => {
        event.preventDefault();
        axios.put(`/profiles/${props.profile.id}/`, formValues).then(res => {
            if (res.status === 200) {
                props.updateProfile(res.data);
                toast.success("Profile updated successfully.");
                props.handleCloseProfile();
            }
        }).catch(err => {
            toast.error("Error updating profile.");
        })
    }

    return (<div>handleProfileUpdate
        <Modal
            open={props.openProfile}
            onClose={props.handleCloseProfile}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h3" component="h2" alignItems={"center"}>
                    Profile
                </Typography>
                <Box component={"form"} onSubmit={handleprofileUpdate} sx={{mt: 2}}>
                    <Box>
                        <Box sx={{width: "10%", float: "left", marginBottom: 2}}>
                            <CalendarMonthIcon sx={{color: 'action.active', mr: 1, height: "50px"}}/>
                        </Box>
                        <Box sx={{width: "90%", float: "right", marginBottom: 2}}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disableFuture
                                    id="dob1"
                                    label="DOB"
                                    openTo="year"
                                    views={['year', 'month', 'day']}
                                    value={formValues?.dob?formValues?.dob:props.profile?.dob}
                                    onChange={handleDateInputChange}
                                    renderInput={(params) => <TextField {...params} id="dob" fullWidth={true}
                                    />}
                                />

                            </LocalizationProvider>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{width: "10%", float: "left", marginBottom: 2}}>
                            <ContactMailIcon sx={{color: 'action.active', mr: 1, height: "50px"}}/>
                        </Box>
                        <Box sx={{width: "90%", float: "right", marginBottom: 2}}>

                            <TextField id="address" label="Address" variant="outlined"
                                       defaultValue={props.profile?.address} fullWidth={true}
                                       onChange={handleInputChange}/>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{width: "10%", float: "left", marginBottom: 2}}>
                            <ContactPhoneIcon sx={{color: 'action.active', mr: 1, height: "50px"}}/>
                        </Box>
                        <Box sx={{width: "90%", float: "right", marginBottom: 2}}>
                            <TextField id="phone" label="Phone" variant="outlined" defaultValue={props.profile?.phone}
                                       fullWidth={true} onChange={handleInputChange}/>
                        </Box>
                    </Box>
                    <Button variant="outlined" type="Submit">Update</Button>
                </Box>
            </Box>
        </Modal>
    </div>);
}
