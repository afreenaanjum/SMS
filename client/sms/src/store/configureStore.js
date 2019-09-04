import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import sessionReducer from '../reducers/session'
import videoPlayerReducer from '../reducers/video'
import startPageReducer from '../reducers/startpage'
import authReducer from '../reducers/authReducer'

const configureStore = () => {
    const store = createStore(
        combineReducers({
            startPage : startPageReducer,
            session: sessionReducer,
            videoPlayer: videoPlayerReducer,
            userAuth: authReducer
        }),
        applyMiddleware(
            thunk
        )
    )
    return store
}

export default configureStore
