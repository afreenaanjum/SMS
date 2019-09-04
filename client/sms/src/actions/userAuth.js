import axios from '../config/axios'

function userLoggedIn(username){
    return {
        type: "USER_LOGGEDIN",
        payload: username
    }
}

function userRegistered(username){
    return {
        type: "USER_REGISTERED",
        payload: username
    }
}

function logout(){
    return {
        type: "USER_LOGOUT"
    }
}

export function submitLogin(data){
    return dispatch => {
        return axios.post('/sms/users/login', data)
            .then( (response) => {
                localStorage.setItem('token', response.data.token);
                dispatch(userLoggedIn());
                console.log(response)
            })        
            .catch((e) => console.log(e));
    }    
}

export function submitRegister(data){
    return dispatch => {
        return axios.post('/sms/users/register', data)
            .then( (response) => {
                dispatch(userRegistered());
                console.log(data)
            })        
            .catch((e) => console.log(e));
    }    
}

export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('token');
        dispatch(logout());
    }
}