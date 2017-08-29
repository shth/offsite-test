import * as types from './types'

export function registerUser(user) {
    return function (dispatch) {
        return (new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
        })).then(() => {
            /* mocking server side validation */
            if (localStorage.getItem(user.email)) throw {email: 'this email is already taken.'};
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
        return (new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
        })).then(() => {
            /* mocking server side validation */
            let correctPassword = localStorage.getItem(credentials.email);
            if (!correctPassword) throw {email: 'This user account does not exist'};
            if (credentials.password === correctPassword) {
                dispatch({
                    type: types.AUTH_USER,
                    authenticated: true,
                    user: {
                        email: credentials.email
                    }
                });
            }
            else throw {password: 'Incorrect password'}
        })
    };
}
export function logoutUser() {
    return function (dispatch) {
        return (new Promise((resolve, reject) => {
            setTimeout(() => resolve(), 500);
        })).then(() => {
            dispatch({
                type: types.UNAUTH_USER,
            });
        })
    };
}
