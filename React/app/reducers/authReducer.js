import {
    AUTH_USER,
    UNAUTH_USER,
    REHYDRATE
} from '../actions/types';

const INITIAL_STATE = {user:{}, authenticated: false}

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return Object.assign({}, state, {user: action.user, authenticated: true});
        case UNAUTH_USER:
            return Object.assign({}, state, {authenticated: false});
        case REHYDRATE:
            const {auth} = action.payload;
            if(!auth) return state;
            const {user, authenticated} = auth;
            return Object.assign({}, state, {user, authenticated});
    }

    return state;
}