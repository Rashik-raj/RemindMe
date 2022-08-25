import './App.css';
import SignIn from './components/auth/SignIn';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import React from "react";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogOut from "./components/auth/LogOut";
import Dashboard from "./components/dashboard/Dashboard";
import PageNotFound from "./components/PageNotFound";
import {createTheme, ThemeProvider} from '@mui/material/styles';

const theme = createTheme();

function App() {
    return (<React.Fragment>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    <Route path="/signin" element={<SignIn/>}/>
                    <Route path="/signup" element={<SignUp/>}/>
                    <Route path="/logout" element={<LogOut/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover/>
        </ThemeProvider>
    </React.Fragment>);
}

export default App;
