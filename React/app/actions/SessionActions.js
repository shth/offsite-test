import * as types from './types'

export function registerUser(user) {
    return function(dispatch) {
        alert('signing up')
        return (new Promise((resolve, reject)=>{
            setTimeout(()=> resolve(), 500);
        })).then(() => {
            localStorage.setItem(user.email, user.password);
            // dispatch(loginSuccess());
        })
    };
}
export function logInUser(credentials) {
    return function(dispatch) {
        alert('logging in')
        // return sessionApi.login(credentials).then(response => {
        //     sessionStorage.setItem('jwt', response.jwt);
        //     dispatch(loginSuccess());
        // }).catch(error => {
        //     throw(error);
        // });
    };
}
