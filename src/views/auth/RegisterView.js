import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { UrlConstant, localstorageConstants } from '../../Constants/Constants';
import HTTPService from '../../Services/HTTPService';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');


  //function to sign up 
  const signUp = async () => {
    let url = UrlConstant.Ip + UrlConstant.signup
    let data = { "firstName": firstName, "lastName": lastName, "email": email, "password": password }
    let responsedata = await HTTPService(url, 'post', data)
    navigate('/login', { replace: true });
  }
  return (
    <Page
      className={classes.root}
      title="Register"
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
                Create new account
                  </Typography>
            </Box>
            <TextField
              fullWidth
              label="First name"
              margin="normal"
              name="firstName"
              onChange={(e) => setfirstName(e.target.value)}
              value={firstName}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Last name"
              margin="normal"
              name="lastName"
              onChange={(e) => setlastName(e.target.value)}
              value={lastName}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              name="email"
              onChange={(e) => setemail(e.target.value)}
              type="email"
              value={email}
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
                disabled={!(firstName && lastName && email && password)}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                onClick={() => signUp()}
              >
                Sign up now
                  </Button>
            </Box>
            <Typography
              color="textSecondary"
              variant="body1"
            >
              Have an account?
                  {' '}
              <Link
                component={RouterLink}
                to="/login"
                variant="h6"
              >
                Sign in
                  </Link>
            </Typography>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
