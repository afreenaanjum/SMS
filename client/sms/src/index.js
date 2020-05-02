import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { App } from './App';
import 'bootstrap/dist/css/bootstrap.min.css';


//Creating redux store
const store = configureStore()

//Subscribe method gets called only when there are changes made.
store.subscribe(() => {
    console.log(store.getState())
})

console.log(store.getState())



const jsx = (
    <Provider store={store}>
        <AppContainer>
            <App />
        </AppContainer>
    </Provider>
)
ReactDOM.render(jsx, document.getElementById('root'));


