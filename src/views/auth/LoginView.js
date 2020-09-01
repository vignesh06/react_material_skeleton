import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { UrlConstant, localstorageConstants } from '../../Constants/Constants';
import HTTPService from '../../Services/HTTPService';
import labels from '../../Constants/labels';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setuserName] = useState('');
  const [password, setpassword] = useState('');
  //function to Login 
  const login = async () => {
    let url = UrlConstant.Ip + UrlConstant.login
    let data={"username":username,"password":password}
    let responsedata=await HTTPService(url, 'post',data)
    localStorage.setItem(
      localstorageConstants.Token,responsedata.token
    )
    localStorage.setItem(
      localstorageConstants.IsLoggedIn,true
    )
    navigate('/app/dashboard', { replace: true });
  }
  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
        <Box mb={3}>
              <Typography
                color="textPrimary"
                variant="h2"
              >
                {labels.login.lbl_Login_button}
                  </Typography>
            </Box>
          <TextField
            fullWidth
            label="Email Address"
            margin="normal"
            name="email"
            onChange={(e) => setuserName(e.target.value)}
            type="email"
            value={username}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            value={password}
            variant="outlined"
          />
          <Box my={2}>
            <Button
              color="primary"
              disabled={!(username && password)}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={() => login()}
            >
              Sign in now
                  </Button>
          </Box>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            Don&apos;t have an account?
                  {' '}
            <Link
              component={RouterLink}
              to="/register"
              variant="h6"
            >
              Sign up
                  </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Link
              component={RouterLink}
              to="/forgotpassword"
              variant="h6"
            >
              Forgot password ?
                  </Link>
          </Typography>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
