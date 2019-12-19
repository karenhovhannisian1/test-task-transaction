import React, { useState, useRef } from 'react';
import { Button, Container } from '@material-ui/core';
import API from '../api';
import {
  DASHBOARD_PATH,
  LINK_TO_SIGN_UP_MESSAGE,
  SIGN_IN_ERROR,
  SIGN_UP_PATH,
  TOKEN
} from '../configs/constants';
import { useStateValue } from '../context';
import { Link } from 'react-router-dom';
import { loginSuccess } from '../context/actions';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FormHelperText } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignIn = ({ history }) => {
  const [{}, dispatch] = useStateValue();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const classes = useStyles();

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const { data } = await API.signIn(email, password);
      if (data.id_token) {
        dispatch(loginSuccess);
        localStorage.setItem(TOKEN, data.id_token);
        history.push(DASHBOARD_PATH);
      }
    } catch (e) {
      setError(SIGN_IN_ERROR);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type={'email'}
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={({ target }) => setEmail(target.value)}
            autoFocus
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
            autoComplete="current-password"
            onChange={({ target }) => setPassword(target.value)}
          />
          {error && <FormHelperText error>{error}</FormHelperText>}
          <Button
            type="submit"
            fullWidth
            variant={'contained'}
            color="primary"
            className={classes.submit}
          >
            {loading ? <CircularProgress /> : 'Sign In'}
          </Button>
          <Grid container>
            <Grid item>
              <Link to={SIGN_UP_PATH} variant="body2">
                {LINK_TO_SIGN_UP_MESSAGE}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default SignIn;
