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

const ResetPasswordView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setuserName] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  //function to resetPassword 
  const resetPassword = async () => {
    let url = UrlConstant.Ip + UrlConstant.resetpassword
    let data={"username":username,"newPassword":newPassword,"confirmPassword":confirmPassword}
    let responsedata=await HTTPService(url, 'post',data)
    navigate('/login', { replace: true });
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
              {labels.forgotPassword.lbl_Forgot_Password}
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
            label="New Password"
            margin="normal"
            name="New Password"
            onChange={(e) => setnewPassword(e.target.value)}
            type="password"
            value={newPassword}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm Password"
            margin="normal"
            name="Confirm Password"
            onChange={(e) => setconfirmPassword(e.target.value)}
            type="password"
            value={confirmPassword}
            variant="outlined"
          />
          <Box my={2}>
            <Button
              color="primary"
              disabled={!(username && newPassword && confirmPassword)}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={() => resetPassword()}
            >
              Reset Password
                  </Button>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default ResetPasswordView;
