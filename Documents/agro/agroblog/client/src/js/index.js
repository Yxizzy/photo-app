import React from 'react';
import { render } from "react-dom";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {store, history} from './helpers';

import App from "./App";

render( 
    <Provider store={store}>
        <Router history={history}>
            <App/>
        </Router>
    </Provider>, 
    window.document.getElementById('app')
);