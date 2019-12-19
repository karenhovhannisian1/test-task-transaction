import React, {useState} from "react";
import {Link} from "react-router-dom";
import {Avatar, CssBaseline,TextField, Grid, Button, Container, FormHelperText, Typography, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {DASHBOARD_PATH, LINK_TO_SIGN_IN_MESSAGE, SIGN_IN_PATH, SIGN_UP_ERROR, TOKEN} from "../configs/constants";
import {useStateValue} from "../context";
import {loginSuccess} from "../context/actions";

import API from "../api";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const SignUp = ({history}) => {
  const [{}, dispatch] = useStateValue();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const classes = useStyles();

  async function signUp(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const {data} = await API.signUp(email, password, userName);
      setLoading(true)
      if(data.id_token){
        dispatch(loginSuccess);
        localStorage.setItem(TOKEN, data.id_token);
        history.push(DASHBOARD_PATH)
      }
    }
    catch (error) {
      setError(SIGN_UP_ERROR)
    }
    finally {
      setLoading(false)
    }
  }

  return <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} onSubmit={signUp} autoComplete="off">
        <TextField
            variant="outlined"
            margin="normal"
            type={"text"}
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete={"none"}
            onChange={({target}) => setUserName(target.value)}
        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type={"email"}
            label="Email Address"
            name="email"
            onChange={({target}) => setEmail(target.value)}

        />
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={({target}) => setPassword(target.value)}
        />
        {error && <FormHelperText error>{error}</FormHelperText>}
        {loading ? <CircularProgress /> :
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
              Sign Up
            </Button>}
        <Grid container>
          <Grid item>
            <Link to={SIGN_IN_PATH} variant="body2">
              {LINK_TO_SIGN_IN_MESSAGE}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  </Container>
};

export default SignUp;
