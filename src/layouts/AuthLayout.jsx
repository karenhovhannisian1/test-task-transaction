import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {CssBaseline, Container, Grid, Paper} from '@material-ui/core';
import {LeftMenu, AppBar} from "../components";
import {drawerWidth, SIGN_IN_PATH, TOKEN} from "../configs/constants";
import ReactNotification from "react-notifications-component";
import {useStateValue} from "../context";
import {useAuth} from "../hooks/useAuth";
import {withRouter} from "react-router-dom";


import 'react-notifications-component/dist/theme.css';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        marginTop: 10
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        marginTop: 20,
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    avatar: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        }
    },
    avatarImg: {
        height: 40,
        marginLeft: 3
    },
    avatarLarge: {
        width: theme.spacing(9),
        height: theme.spacing(9),
        marginRight: 7
    }
}));

function AuthLayout({children, history}) {
    const [{ user }] = useStateValue();
    const {getUserInfo} = useAuth();
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    useEffect(() => {
        if(localStorage.getItem(TOKEN)){
            getUserInfo()
        } else {
            history.push(SIGN_IN_PATH)
        }
    }, []);


    return (
        <div className={classes.root}>
            <ReactNotification />
            <CssBaseline />
           <AppBar handleDrawerOpen={handleDrawerOpen} open={open}  classes={classes} account={user}/>
           <LeftMenu open={open} setOpen={setOpen} classes={classes} account={user}/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                {children}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}

export default withRouter(AuthLayout)
