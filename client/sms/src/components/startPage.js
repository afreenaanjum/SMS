import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { Button, Link } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import styles from "./styles";
import axios from "../config/axios";
import CustomTextField from "./CommonComponents/TextField";
import { setAuthToken, getAuthToken } from "../services/localStorage";
import { connect } from "react-redux";
import { userDetails } from "../actions/userDetails";

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

  componentDidMount() {
    if (getAuthToken()) {
      this.props.history.push("/homepage");
    }
  }

  handleSignUp(e) {
    e.preventDefault();
    const formData = {
      username: this.state.userName,
      email: this.state.email,
      mobile: this.state.mobileNumber,
      password: this.state.password,
    };
    axios.post("/sms/users/register", formData).then((response) => {
      console.log(response.data);
      if (response.data.hasOwnProperty("errors")) {
        alert(response.data.message);
      }
    });
  }

  handleLogin(e) {
    e.preventDefault();
    const formData = {
      mobileOrEmail: this.state.email,
      password: this.state.password,
    };
    axios.post("/sms/users/login", formData).then((response) => {
      if (response.data.hasOwnProperty("errors")) {
        alert(response.data.message);
      }
      setAuthToken(response.data.token);
      this.setState({
        email: "",
        password: "",
      });
      this.props.dispatch(userDetails(response.data.user));
      this.props.history.push("/homepage");
    });
  }

  handleSignIn() {
    this.setState((prevState) => {
      return { isSignedIn: !prevState.isSignedIn };
    });
  }

  handleUserName(e) {
    this.setState({ userName: e.target.value });
  }

  handleEmail(e) {
    this.setState({ email: e.target.value });
  }

  handleMobile(e) {
    this.setState({ mobileNumber: e.target.value });
  }

  handlePassword(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmPassword(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  handleRegister() {
    console.log("Reigster madi");
  }

  render() {
    const { classes } = this.props;
    const {
      userName,
      email,
      mobileNumber,
      password,
      confirmPassword,
      isSignedIn,
    } = this.state;
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        <div
          style={{
            paddingTop: "30px",
            paddingBottom: "30px",
          }}
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
                position: "relative",
              }}
            >
              <Grid
                xs={12}
                md={7}
                lg={7}
                item
                hidden={false}
                className={classes.gridPic}
              >
                <img
                  src={"../../assets/HomePage.svg"}
                  alt={"Home"}
                  style={{
                    maxWidth: "80%",
                    height: "auto",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={5} lg={5}>
                <h1>SMS</h1>
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
                {!isSignedIn ? (
                  <>
                    <form>
                      <div>
                        <CustomTextField
                          type="text"
                          label="User Name"
                          value={userName}
                          onChange={this.handleUserName}
                          notchedOutlineSelect={classes.notchedOutlineSelect}
                          inputStyles={classes.textField}
                          styles={classes.textField}
                        />
                      </div>
                      <div>
                        <CustomTextField
                          type="text"
                          label="Email"
                          value={email}
                          onChange={this.handleEmail}
                          notchedOutlineSelect={classes.notchedOutlineSelect}
                          styles={classes.textField}
                        />
                      </div>
                      <div>
                        <CustomTextField
                          type="text"
                          label="Mobile"
                          value={mobileNumber}
                          onChange={this.handleMobile}
                          notchedOutlineSelect={classes.notchedOutlineSelect}
                          styles={classes.textField}
                        />
                      </div>
                      <div>
                        <CustomTextField
                          type="password"
                          label="Password"
                          value={password}
                          onChange={this.handlePassword}
                          notchedOutlineSelect={classes.notchedOutlineSelect}
                          styles={classes.textField}
                        />
                      </div>
                      <div>
                        <CustomTextField
                          type="password"
                          label="Confirm Password"
                          value={confirmPassword}
                          onChange={this.handleConfirmPassword}
                          notchedOutlineSelect={classes.notchedOutlineSelect}
                          styles={classes.textField}
                        />
                      </div>
                      <Button
                        disabled={
                          !userName ||
                          !email ||
                          !mobileNumber ||
                          !password ||
                          password !== confirmPassword
                        }
                        type="submit"
                        onClick={(e) => this.handleSignUp(e)}
                        classes={{
                          root: classes.button,
                        }}
                      >
                        Sign Up
                      </Button>
                    </form>
                    <Link href="#" onClick={this.handleSignIn}>
                      {"Already had account?"}
                    </Link>
                  </>
                ) : null}
                {isSignedIn ? (
                  <>
                    <form className={classes.signInForm}>
                      <div>
                        <CustomTextField
                          type="text"
                          label="Email/Mobile"
                          value={email}
                          onChange={this.handleEmail}
                          notchedOutlineSelect={classes.notchedOutlineSelect}
                          styles={classes.textField}
                        />
                      </div>
                      <div>
                        <CustomTextField
                          type="password"
                          label="Password"
                          value={password}
                          onChange={this.handlePassword}
                          notchedOutlineSelect={classes.notchedOutlineSelect}
                          styles={classes.textField}
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={!email || !password}
                        onClick={(e) => this.handleLogin(e)}
                        classes={{
                          root: classes.button,
                        }}
                      >
                        Sign In
                      </Button>
                    </form>
                    <Link href="#" onClick={this.handleSignIn}>
                      {"Had no account?"}
                    </Link>
                  </>
                ) : null}
              </Grid>
            </Grid>
          </Card>
        </div>
      </Grid>
    );
  }
}

export default compose(connect(), withStyles(themeStyles))(StartPage);
