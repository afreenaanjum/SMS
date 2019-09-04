import React, { Component} from 'react';
import Login from '../components/UserAuth/Login';
import Register from '../components/UserAuth/Register';
// import { logoutUser } from '../../actions/authActions';

function StartPage () {
    return(
        <div>
            <h1>SMS.</h1>
            <h3>Short Meetup Sessions</h3>
            <p>Connecting people in sessions and enabling communication.</p>
            <Login />
            <Register />
        </div>
    )
}

export default StartPage