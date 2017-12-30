import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import placesReducer from "./reducers/places";

const rootReducers = combineReducers({
    places: placesReducer,
});

let composeEnhancers = compose;

if (__DEV__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const configureStore = () => {
    return createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));
};

export default configureStore;