import React from 'react'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider, connect} from 'react-redux'
import {autoRehydrate, persistStore} from 'redux-persist'
import thunk from 'redux-thunk'
import reducers from '../../../reducers/index';
import LoginBar from './LoginBar'

class LoginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Provider store={store}>
                <LoginBar/>
            </Provider>
        )
    }
}
const store = createStore(
    reducers,
    {},
    compose(applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        autoRehydrate()
    )
);
persistStore(store);
export default LoginContainer