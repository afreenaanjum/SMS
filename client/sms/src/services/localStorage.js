function setAuthToken(token) {
    localStorage.setItem('x-auth', JSON.stringify(token));
}

function getAuthToken(token) {
    return JSON.parse(localStorage.getItem('x-auth'));
}


export { setAuthToken, getAuthToken };