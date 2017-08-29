import React from 'react'
import {Provider} from 'react-redux'

import store from '../../../store/storeConfig'
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
export default LoginContainer