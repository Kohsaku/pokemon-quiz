import React, { useState } from "react";
import { auth } from "../api/firebase";
import { useHistory } from "react-router-dom";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import { makeStyles } from "@material-ui/core";

import { Link } from "react-router-dom";

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  Container: {
    marginTop: theme.spacing(10),
  },
  Button: {
    marginTop: theme.spacing(2),
  },
  Grid: {
    marginTop: theme.spacing(2),
  },
  ForgotPassword: {
    cursor: "pointer",
  },
  modal: {
    outline: "none",
    position: "absolute",
    width: 400,
    borderRadius: 10,
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(10),
  },
}));

const LoginPage = (props) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const history = useHistory();

  const sendResetEmail = async (event) => {
    await auth
      .sendPasswordResetEmail(resetEmail)
      .then(() => {
        setOpenModal(false);
        setResetEmail("");
      })
      .catch((err) => {
        alert(err.message);
        setResetEmail("");
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setEmail("");
      setPassword("");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const emailHandleChange = (event) => {
    const name = event.target.value;
    setEmail(name);
  };

  const passwordHandleChange = (event) => {
    const name = event.target.value;
    setPassword(name);
  };

  return (
    <div className="LoginPage">
      <Container className={classes.Container} component="main" maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={emailHandleChange}
            value={email}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={passwordHandleChange}
            value={password}
            required
          />
          <Button
            className={classes.Button}
            type="submit"
            fullWidth
            variant="contained"
            onClick={props.emailLogin}
          >
            Sign In
          </Button>
          <Button
            className={classes.Button}
            type="submit"
            fullWidth
            variant="contained"
            onClick={props.googleSignin}
          >
            Google Sign In
          </Button>
          <Grid className={classes.Grid} container>
            <Grid className={classes.ForgotPassword} item xs>
              <span onClick={() => setOpenModal(true)}>Forgot password?</span>
            </Grid>
            <Grid item>
              <Link to="/signup">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </form>
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <div style={getModalStyle()} className={classes.modal}>
            <div>
              <TextField
                InputLabelProps={{
                  shrink: true,
                }}
                type="email"
                name="email"
                label="Reset E-mail"
                value={resetEmail}
                onChange={(event) => {
                  setResetEmail(event.target.value);
                }}
              />
              <IconButton onClick={sendResetEmail}>
                <SendIcon />
              </IconButton>
            </div>
          </div>
        </Modal>
      </Container>
    </div>
  );
};

export default LoginPage;
