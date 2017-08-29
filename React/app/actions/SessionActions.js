import * as types from './types'

export function registerUser(user) {
    return function (dispatch) {
        alert('signing up');
        return (new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
        })).then(() => {
            /* mocking server side validation */
            if(localStorage.getItem(user.email)) throw {email: 'this email is already taken.'};
            localStorage.setItem(user.email, user.password);
            dispatch({
                    type: types.AUTH_USER,
                    authenticated: true,
                    user: {
                        email: user.email
                    }
                }
            );
        })
    };
}
export function logInUser(credentials) {
    return function (dispatch) {
        alert('logging in')
        // return sessionApi.login(credentials).then(response => {
        //     sessionStorage.setItem('jwt', response.jwt);
        //     dispatch(loginSuccess());
        // }).catch(error => {
        //     throw(error);
        // });
    };
}
