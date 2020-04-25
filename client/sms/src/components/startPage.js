import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import styles from "./styles";

const themeStyles = (theme) => {
  return styles(theme);
};

class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedUp: false,
      isSignedIn: false,
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignUp.bind(this);
  }
  handleSignUp() {
    this.setState((prevState) => {
      // isSignedUp: !prevState.isSignedUp
    });
  }

  handleSignIn() {
    this.setState((prevState) => {
      // isSignedIn: !prevState.isSignedIn
    });
  }

  render() {
    const { classes } = this.props;
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
              <form>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="User Name"
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
                    label="Email"
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
                    variant="outlined"
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutlineSelect,
                      },
                    }}
                    style={{ marginTop: "10px" }}
                  />
                </div>
                {/* <div>
                  <TextField
                    id="outlined-basic"
                    label="password"
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
                    label="Confirm Password"
                    variant="outlined"
                    InputProps={{
                      classes: {
                        notchedOutline: classes.notchedOutlineSelect,
                      },
                    }}
                    style={{ marginTop: "10px" }}
                  />
                </div> */}
              </form>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  }
}

// export default StartPage

export default compose(withStyles(themeStyles))(StartPage);
