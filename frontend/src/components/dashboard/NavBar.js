import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import EditNotificationsIcon from '@mui/icons-material/EditNotifications';

const pages = ['Schedules', 'Emails'];
const settings = ['Profile', 'Logout'];
const title = "RemindMe";

const NavBar = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (event, page) => {
        setAnchorElNav(null);
        if (page !== "menuClose") {
            props.handleMenuClick(event, page)
        }
    };

    const handleCloseUserMenu = (setting) => {
        setAnchorElUser(null);
        if (setting === 'Logout') {
            handleLogOut();
        } else if (setting === 'Profile') {
            if (props.openProfile) {
                props.handleCloseProfile();
            } else {
                props.handleOpenProfile();
            }
        }
    };

    const handleLogOut = () => {
        window.location.href = "/logout";
    };

    return (<AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <EditNotificationsIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: {xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    {title}
                </Typography>

                <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenNavMenu}
                        color="inherit"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom', horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top', horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={(event) => handleCloseNavMenu(event, "menuClose")}
                        sx={{
                            display: {xs: 'block', md: 'none'},
                        }}
                    >
                        {pages.map((page) => (<MenuItem key={page} onClick={(event) => handleCloseNavMenu(event, page)}
                        >
                            <Typography textAlign="center">{page}</Typography>
                        </MenuItem>))}
                    </Menu>
                </Box>
                <EditNotificationsIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href=""
                    sx={{
                        mr: 2,
                        display: {xs: 'flex', md: 'none'},
                        flexGrow: 1,
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    {title}
                </Typography>

                <Box sx={{flexGrow: 1, ml: {xs: "50%", md: "80%"}}}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar alt="Remy Sharp"
                                    src={props.profile ? props.profile.profile : "/static/images/avatar/2.jpg"}/>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{mt: '45px'}}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top', horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top', horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>))}
                    </Menu>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>);
};
export default NavBar;
