import Box from "@mui/material/Box";
import React, {useEffect, useState} from "react";
import {Button, Typography} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {DataGrid} from '@mui/x-data-grid';
import axios from "axios";
import {toast} from "react-toastify";
import Schedule from "./schedule";


export default function MainContent(props) {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);
    const [openSchedule, setOpenSchedule] = useState(false);

    useEffect(() => {
        if (props.selectedMenu === "Schedules") {
            axios.get("/schedules/").then(res => {
                const rowData = res.data.map(schedule => {
                    return {
                        id: schedule.id,
                        user: schedule.user.username,
                        name: schedule.name,
                        description: schedule.description,
                        interval: schedule.interval,
                        date: schedule.date,
                        next_date: schedule.next_date,
                    }
                })
                setRows(rowData);
                setColumns([
                    {field: 'id', headerName: 'ID', width: 10},
                    {field: 'user', headerName: 'User', width: 250},
                    {field: 'name', headerName: 'Name', width: 250},
                    {field: 'description', headerName: 'Description', width: 450},
                    {field: 'interval', headerName: 'Interval', width: 150},
                    {field: 'date', headerName: 'Date', width: 150},
                    {field: 'next_date', headerName: 'Next Date', width: 150},
                ])
            }).catch(err => {
                toast.error("Error loading schedules.");
            })
        } else {
            axios.get("/emails/").then(res => {
                const rowData = res.data.map(email => {
                    return {
                        id: email.id,
                        user: email.user.username,
                        schedule: email.schedule.name,
                        status: email.status
                    }
                });
                setRows(rowData);
                setColumns([
                    {field: 'id', headerName: 'ID', width: 10},
                    {field: 'user', headerName: 'User', width: 250},
                    {field: 'schedule', headerName: 'Schedule', width: 250},
                    {field: 'status', headerName: 'Status', width: 100},
                ])
            }).catch(err => {
                toast.error("Error loading emails.");
            })
        }
    }, [props.selectedMenu])

    const handleOpenSchedule = () => setOpenSchedule(!openSchedule);


    return (
        <Box flex={4} bgcolor={"#bbdefb"} height={"calc(100vh - 135px)"}>
            <Typography variant="h5" m={2}>{props.selectedMenu} {props.selectedMenu === "Schedules" ?
                <>
                    <Button startIcon={<AddCircleOutlineIcon/>} variant={"outlined"} color={"success"}
                            sx={{marginLeft: 2}} onClick={handleOpenSchedule}>
                        Add Schedule
                    </Button> <Schedule openSchedule={openSchedule} handleOpenSchedule={handleOpenSchedule}/>
                </> : null
                }
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={pageSize}
                rowsPerPageOptions={[1, 10, 20, 50, 100]}
                onPageSizeChange={(pageSize) => {
                    setPageSize(pageSize)
                }}
                onSelectionModelChange={(event, selectionModel) => {
                    setSelectedRows(event)
                }}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
            /></Box>)
}