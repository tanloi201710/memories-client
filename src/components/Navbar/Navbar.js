import React, { useEffect, useState } from 'react';
import { Typography, AppBar, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useStyles from './styles';
import memories from '../../images/memories.png';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

function Navbar() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        history.push('/');
        setUser(null);
    }

    useEffect(() => {
        const token = user?.token;

        if(token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) {
                handleLogout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location,user?.token]);
    return (
        <AppBar position="static" color="inherit" className={classes.appBar}>
            <div className={classes.brandContainer}>
                <Typography 
                    variant="h2" 
                    align="center" 
                    className={classes.heading}
                    component={Link}
                    to="/"
                >
                    Memories
                </Typography>
                <img src={memories} alt="memories" height="60" className={classes.image} />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar 
                            className={classes.purple} 
                            alt={user.result.name} 
                            src={user.result.imageUrl}
                        >
                            {user.result.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">
                            {user.result.name}
                        </Typography>
                        <Button 
                            variant="contained" 
                            className={classes.logout} 
                            color="secondary"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
