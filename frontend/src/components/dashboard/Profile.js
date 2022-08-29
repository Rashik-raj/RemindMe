import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TextField from "@mui/material/TextField";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';

import React, {useEffect, useState} from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Button} from "@mui/material";
import axios from "axios";
import {toast} from 'react-toastify';
import Autocomplete from '@mui/material/Autocomplete';
import Fade from '@mui/material/Fade';
import Backdrop from '@mui/material/Backdrop';


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
    borderRadius: '20px'
};

export default function Profile(props) {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [municipalityOptions, setMunicipalityOptions] = useState([]);
    const [districtValue, setDistrictValue] = useState('');
    const [municipalityValue, setMunicipalityValue] = useState('');
    const [formValues, setFormValues] = useState(null);

    useEffect(() => {
        axios.get("/address/provinces/").then(res => {
            setProvinces(res.data);
        }).catch(err => {
            toast.error(err.response?.data?.detail ? err.response.data.detail : err.message);
        })
        axios.get("/address/districts/").then(res => {
            setDistricts(res.data);
            setDistrictOptions(res.data.filter(district => district.province === props.profile?.province));
            setDistrictValue(res.data.find(option => option.id === props.profile?.district))
        }).catch(err => {
            toast.error(err.response?.data?.detail ? err.response.data.detail : err.message);
        })
        axios.get("/address/municipalities/").then(res => {
            setMunicipalities(res.data);
            setMunicipalityOptions(res.data.filter(municipality => municipality.district === props.profile?.district));
            setMunicipalityValue(res.data.find(option => option.id === props.profile?.municipality))
        }).catch(err => {
            toast.error(err.response?.data?.detail ? err.response.data.detail : err.message);
        })
    }, [props.profile]);

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

    const handleAddressChange = (identifier, newValue) => {
        if (identifier === "province") {
            setDistrictOptions(districts.filter(district => district.province === newValue.id));
            setMunicipalityOptions([])
            setDistrictValue(null);
            setMunicipalityValue(null);
            setFormValues({
                ...formValues, [identifier]: newValue.id, district: null, municipality: null,
            })
        } else if (identifier === "district") {
            setMunicipalityOptions(municipalities.filter(municipality => municipality.district === newValue.id));
            setDistrictValue(newValue);
            setMunicipalityValue(null);
            setFormValues({
                ...formValues, [identifier]: newValue.id, municipality: null,
            })
        } else {
            setMunicipalityValue(newValue);
            setFormValues({
                ...formValues, [identifier]: newValue.id,
            })
        }
    }


    const handleProfileUpdate = (event) => {
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

    return (<div>
        <Modal
            open={props.openProfile}
            onClose={props.handleCloseProfile}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.openProfile}>
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h3" component="h2" alignItems={"center"}>
                        Profile
                    </Typography>
                    <Box component={"form"} onSubmit={handleProfileUpdate} sx={{mt: 2}}>
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
                                        value={formValues?.dob ? formValues?.dob : props.profile?.dob}
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
                                <TextField id="phone" label="Phone" variant="outlined"
                                           defaultValue={props.profile?.phone}
                                           fullWidth={true} onChange={handleInputChange}/>
                            </Box>
                        </Box>
                        <Box mb={2}>
                            <Autocomplete
                                id="province"
                                fullWidth={true}
                                onChange={(event, newValue) => handleAddressChange("province", newValue)}
                                options={provinces}
                                defaultValue={provinces.find(option => option.id === props.profile?.province)}
                                autoHighlight
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                                        {option.name}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose a province"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </Box>
                        <Box mb={2}>
                            <Autocomplete
                                id="district"
                                fullWidth={true}
                                onChange={(event, newValue) => handleAddressChange("district", newValue)}
                                options={districtOptions}
                                value={districtValue}
                                autoHighlight
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                                        {option.name}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose a district"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </Box>
                        <Box mb={2}>
                            <Autocomplete
                                id="municipality"
                                fullWidth={true}
                                onChange={(event, newValue) => handleAddressChange("municipality", newValue)}
                                options={municipalityOptions}
                                value={municipalityValue}
                                autoHighlight
                                getOptionLabel={(option) => option.name}
                                renderOption={(props, option) => (
                                    <Box component="li" sx={{'& > img': {mr: 2, flexShrink: 0}}} {...props}>
                                        {option.name}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose a municipality"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </Box>

                        <Button variant="outlined" type="Submit">Update</Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    </div>);
}
