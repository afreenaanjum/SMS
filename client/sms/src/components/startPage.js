import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import FormControl from '@material-ui/core/FormControl';
import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { compose } from "recompose";
import styles from './styles'


const themeStyles = (theme) => {
    return styles(theme);
};

class StartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignedUp: false,
            isSignedIn: false
        }
        this.handleSignUp = this.handleSignUp.bind(this)
        this.handleSignIn = this.handleSignUp.bind(this)
    }
    handleSignUp() {
        this.setState((prevState) => {
            // isSignedUp: !prevState.isSignedUp
        })
    }

    handleSignIn() {
        this.setState((prevState) => {
            // isSignedIn: !prevState.isSignedIn
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container direction="row"
                justify="center"
                alignItems="center"
                style={{ height: '100vh', }}
            >
                <Card style={{
                    height: "maxContent",
                    width: '80vw',
                    padding: "15px"
                }}>
                    <Grid
                        container
                        justify="center"
                        alignItems="start"
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        <Grid
                            xs={12}
                            md={12}
                            lg={7}
                            item
                        >
                            <img src={'../../assets/HomePage.svg'} style={{
                                maxWidth: '100%', height: 'auto'
                            }} />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            md={12}
                            lg={4}
                        >
                            <h1 >SMS.</h1>
                            <h4>Short Meetup Sessions</h4>
                            <hr style={{
                                border: '1px solid #7303c0'
                            }} />
                            <p>Connecting people in sessions and enabling communication</p>
                            {/* <button onClick={this.handleSignUp}>Sign Up</button>
                            <button>Sign In </button> */}

                            <FormControl fullWidth variant="outlined" root={classes.formCont}>
                                <TextField id="outlined-basic" label="User Name" variant="outlined"
                                    InputProps={{
                                        className: classes.inputPropsStyle,
                                        classes: {
                                            notchedOutline: classes.notchedOutlineSelect,
                                        },
                                    }}
                                    style={{
                                        marginBottom: '10px',
                                        marginTop: '10px',
                                        minWidth: '80% !important'
                                    }} />
                                <TextField id="outlined-basic" label="Email" variant="outlined"
                                    InputProps={{
                                        className: classes.inputPropsStyle,
                                        classes: {
                                            notchedOutline: classes.notchedOutlineSelect,
                                        },
                                    }} />
                                <TextField id="outlined-basic" label="Mobile" variant="outlined"
                                    InputProps={{
                                        className: classes.inputPropsStyle,
                                        classes: {
                                            notchedOutline: classes.notchedOutlineSelect,
                                        },
                                    }} />

                                <TextField id="outlined-basic" label="Password" variant="outlined"
                                    InputProps={{
                                        className: classes.inputPropsStyle,
                                        classes: {
                                            notchedOutline: classes.notchedOutlineSelect,
                                        },
                                    }} />
                                <TextField id="outlined-basic" label="Confirm Password" variant="outlined"
                                    InputProps={{
                                        className: classes.inputPropsStyle,
                                        classes: {
                                            notchedOutline: classes.notchedOutlineSelect,
                                        },
                                    }} />
                            </FormControl>
                        </Grid>
                    </Grid >
                </Card >
            </Grid >

        )
    }
}

// export default StartPage

export default compose(
    withStyles(themeStyles),
)(StartPage);