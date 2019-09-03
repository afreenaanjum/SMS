import React from 'react'

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
            isSignedUp: !prevState.isSignedUp
        })
    }

    handleSignIn() {
        this.setState((prevState) => {
            isSignedIn: !prevState.isSignedIn
        })
    }

    render() {
        return (
            <div>
                <h1>SMS.</h1>
                <h4>Short Meetup Sessions</h4>
                <hr />
                <p>Connecting people in sessions and enabling communication</p>
                <button onClick={this.handleSignUp}>Sign Up</button>
                <button>Sign In </button>

            </div>
        )
    }
}

export default StartPage