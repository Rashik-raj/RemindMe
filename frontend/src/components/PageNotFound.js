import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, {useEffect} from "react";


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export default function PageNotFound() {
    useEffect(() => {
        sleep(3000).then(() => {
            window.location.href = "/dashboard";
        })
    })
    return (
        <Box component="container">
            <Typography variant="h5" component="h1">
                The page you are requesting for doesn't exist. Redirecting in 3 seconds...
            </Typography>
        </Box>
    )
}