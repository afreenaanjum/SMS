import { createStore, combineReducers } from 'redux'
import sessionReducer from '../reducers/session'
import videoPlayerReducer from '../reducers/video'
import startPageReducer from '../reducers/startpage'

const configureStore = () => {
    const store = createStore(combineReducers({
        startPage : startPageReducer,
        session: sessionReducer,
        videoPlayer: videoPlayerReducer
    }))
    return store
}

export default configureStore
