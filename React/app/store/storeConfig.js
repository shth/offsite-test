import {createStore, applyMiddleware, compose} from 'redux'
import {autoRehydrate, persistStore} from 'redux-persist'
import thunk from 'redux-thunk'
import reducers from '../reducers/index';

const store = createStore(
    reducers,
    {},
    compose(applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        autoRehydrate()
    )
);
persistStore(store);
export default store