import React, { useState } from "react";
import { auth, createUserProfileDocument } from "../api/firebase";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

import "./SignupPage.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  Container: {
    marginTop: theme.spacing(5),
  },
  Button: {
    marginTop: theme.spacing(2),
  },
  Grid: {
    marginTop: theme.spacing(2),
  },
}));

const SignupPage = (props) => {
  const classes = useStyles();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      console.log(user);

      await createUserProfileDocument(user, { displayName });

      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const displayNameHandleChange = (event) => {
    setDisplayName(event.target.value);
  };

  const emailHandleChange = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandleChange = (event) => {
    setPassword(event.target.value);
  };

  const confirmPasswordHandleChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Container className={classes.Container} component="main" maxWidth="xs">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="Name"
                name="Name"
                required
                fullWidth
                id="Name"
                label="Name"
                autoFocus
                onChange={displayNameHandleChange}
                value={displayName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={emailHandleChange}
                value={email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={passwordHandleChange}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={confirmPasswordHandleChange}
                value={confirmPassword}
              />
            </Grid>
          </Grid>
          <Button
            className={classes.Button}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={props.onClick}
          >
            Sign Up
          </Button>
          <Grid className={classes.Grid} container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Container>
      </form>
    </div>
  );
};

export default SignupPage;
