import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import { TextField, Button, Link } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import styles from "./styles";
import axios from '../config/axios'

const themeStyles = (theme) => {
  return styles(theme);
};

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isSignedIn: false,
      userName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleUserName = this.handleUserName.bind(this);
    this.handleMobile = this.handleMobile.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleSignUp(e) {
    e.preventDefault();
    const formData = {
      username: this.state.userName,
      email: this.state.email,
      mobile: this.state.mobileNumber,
      password: this.state.password
    }
    console.log(formData)
    axios.post('/sms/users/register', formData)
      .then(response => {
        console.log(response.data);
        if (response.data.hasOwnProperty('errors')) {
          alert(response.data.message)
        }
      })
  }

  handleLogin(e) {
    e.preventDefault();
    const formData = {
      mobileOrEmail: this.state.email,
      password: this.state.password
    }
    console.log(formData)
    axios.post('/sms/users/login', formData)
      .then(response => {
        console.log(response.data);
        if (response.data.hasOwnProperty('errors')) {
          alert(response.data.message)
        }
      })
  }

  handleSignIn() {
    this.setState((prevState) => {
      return { isSignedIn: !(prevState.isSignedIn) }
    });
  }

  handleUserName(e) {
    this.setState({ userName: e.target.value })
  }

  handleEmail(e) {
    this.setState({ email: e.target.value })
  }

  handleMobile(e) {
    this.setState({ mobileNumber: e.target.value })
  }

  handlePassword(e) {
    this.setState({ password: e.target.value })
  }

  handleConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value })
  }

  handleRegister() {
    console.log('Reigster madi')
  }

  render() {
    const { classes } = this.props;
    const { userName, email, mobileNumber, password, confirmPassword, isSignedIn, isSignedUp } = this.state
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
        <Card
          style={{
            height: "maxContent",
            width: "80vw",
            padding: "50px",
          }}
        >
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{
              textAlign: "center",
            }}
          >
            <Grid xs={12} md={12} lg={7} item>
              <img
                src={"../../assets/HomePage.svg"}
                style={{
                  maxWidth: "80%",
                  height: "auto",
                }}
              />
            </Grid>
            <Grid item xs={12} md={12} lg={5}>
              <h1>SMS.</h1>
              <h4>Short Meetup Sessions</h4>
              <hr
                style={{
                  border: "1px solid #7303c0",
                  width: "80%",
                }}
              />
              <p style={{ color: "grey" }}>
                Connecting people in sessions and enabling communication
              </p>
              {!isSignedIn ?
                <>
                  <form>
                    <div>
                      <TextField
                        id="outlined-basic"
                        label="User Name"
                        variant="outlined"
                        value={userName}
                        onChange={(e) => this.handleUserName(e)}
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutlineSelect,
                          },
                          style: {
                            height: '40px',
                          },
                        }}
                        style={{ marginTop: "10px" }}
                      />
                    </div>
                    <div>
                      <TextField
                        id="outlined-basic"
                        label="Email"
                        value={email}
                        onChange={(e) => this.handleEmail(e)}
                        variant="outlined"
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutlineSelect,
                          },
                        }}
                        style={{ marginTop: "10px" }}
                      />
                    </div>
                    <div>
                      <TextField
                        id="outlined-basic"
                        label="Mobile"
                        value={mobileNumber}
                        onChange={(e) => this.handleMobile(e)}
                        variant="outlined"
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutlineSelect,
                          },
                        }}
                        style={{ marginTop: "10px" }}
                      />
                    </div>
                    <div>
                      <TextField
                        type='password'
                        id="outlined-basic"
                        label="Password"
                        value={password}
                        onChange={(e) => this.handlePassword(e)}
                        variant="outlined"
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutlineSelect,
                          },
                        }}
                        style={{ marginTop: "10px" }}
                      />
                    </div>
                    <div>
                      <TextField
                        type='password'
                        id="outlined-basic"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => this.handleConfirmPassword(e)}
                        variant="outlined"
                        InputProps={{
                          classes: {
                            notchedOutline: classes.notchedOutlineSelect,
                          },
                        }}
                        style={{ marginTop: "10px" }}
                      />
                    </div>
                    <Button
                      disabled={!userName || !email || !mobileNumber || !password || (password !== confirmPassword)}
                      type="submit"
                      onClick={
                        (e) => this.handleSignUp(e)
                      }
                      classes={{
                        root: classes.button,
                      }}>
                      Sign Up
                </Button>
                  </form>
                  <Link href='#' onClick={this.handleSignIn}>{'Already had account?'}</Link>
                </> : null
              }
              {
                isSignedIn ?
                  <>
                    <form>
                      <div>
                        <TextField
                          id="outlined-basic"
                          label="Email/Mobile"
                          variant="outlined"
                          value={email}
                          onChange={(e) => this.handleEmail(e)}
                          InputProps={{
                            classes: {
                              notchedOutline: classes.notchedOutlineSelect,
                            },
                          }}
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                      <div>
                        <TextField
                          type='password'
                          id="outlined-basic"
                          label="Password"
                          value={password}
                          onChange={(e) => this.handlePassword(e)}
                          variant="outlined"
                          InputProps={{
                            classes: {
                              notchedOutline: classes.notchedOutlineSelect,
                            },
                          }}
                          style={{ marginTop: "10px" }}
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={!email || !password}
                        onClick={(e) => this.handleLogin(e)}
                        classes={{
                          root: classes.button,
                        }}>
                        Sign In
                     </Button>
                    </form>
                    <Link href='#' onClick={this.handleSignIn}>{'Had no account?'}</Link>
                  </>
                  : null
              }
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}
export default compose(withStyles(themeStyles))(StartPage);