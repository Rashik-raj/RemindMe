import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {Button} from "@mui/material";
import React, {useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

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

export default function Schedule(props) {
    const [formValues, setFormValues] = useState()
    const intervalOptions = [
        {label: "Annually", id: "ANNUALLY"},
        {label: "Semi Annually", id: "SEMI ANNUALLY"},
        {label: "Quarterly", id: "QUARTERLY"},
        {label: "Monthly", id: "MONTHLY"},

    ]

    const handleInputChange = (e) => {
        const {id, value} = e.target;
        setFormValues({
            ...formValues, [id]: value,
        });
    };

    const handleIntervalChange = (newValue) => {
        setFormValues({
            ...formValues, interval: newValue.id,
        })
    }

    const handleDateInputChange = (newValue) => {
        setFormValues({
            ...formValues, date: newValue.toISOString().split('T')[0],
        });
    }


    const handleAddSchedule = (event) => {
        event.preventDefault()
        axios.post(`/schedules/`, formValues).then(res => {
            window.location.reload();
        }).catch(err => {
            toast.error("Error adding schedule.");
        })
    }
    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={props.openSchedule}
            onClose={props.handleOpenSchedule}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={props.openSchedule}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2" alignItems={"center"}>
                        Add Schedule
                    </Typography>
                    <Box component={"form"} onSubmit={handleAddSchedule} sx={{mt: 2}}>
                        <Box mb={2}>
                            <TextField id="name" label="Name" variant="outlined" fullWidth={true}
                                       onChange={handleInputChange} value={formValues?.name ? formValues?.name : undefined}/>
                        </Box>
                        <Box mb={2}>
                            <TextField id="description" label="Description" variant="outlined" fullWidth={true}
                                       onChange={handleInputChange}
                                       value={formValues?.description ? formValues?.description : undefined}/>
                        </Box>
                        <Box mb={2}>
                            <Autocomplete
                                id="interval"
                                fullWidth={true}
                                onChange={(event, newValue) => handleIntervalChange(newValue)}
                                options={intervalOptions}
                                autoHighlight
                                defaultValue={intervalOptions.find(option => option.id === formValues?.interval)}

                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose an interval"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </Box>
                        <Box mb={2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disablePast
                                    id="date"
                                    label="Date"
                                    openTo="year"
                                    views={['year', 'month', 'day']}
                                    outputFormat={"yyyy-MM-dd"}
                                    value={formValues?.date}
                                    onChange={handleDateInputChange}
                                    renderInput={(params) => <TextField {...params} id="date" fullWidth={true}
                                    />}
                                />
                            </LocalizationProvider>
                        </Box>


                        <Button variant="outlined" type="Submit">Add</Button>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    )
}