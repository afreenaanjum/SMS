import React from 'react'

class StartPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isSignUp: false,
            isSignIn: false
        }
    }

    render() {
        return (
            <div>
                <h1>SMS.</h1>
                <h4>Short Meetup Sessions</h4>
                <hr />
                <p>Connecting people in sessions and enabling communication</p>
                <button>Sign Up</button>
                <button>Sign In </button>
            </div>
        )
    }
}

export default StartPage