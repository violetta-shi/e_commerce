import React from 'react'
import ReactDOM from 'react-dom/client'
// import './index-old.css'
import {store} from './store'
import {Provider} from 'react-redux'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes";

//css
import "bootstrap/dist/css/bootstrap.css"; //TODO change to min.css finally
import "bootstrap-icons/font/bootstrap-icons.css"
import "../public/prototype/css/style.css"; //TODO move finally to current folder

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
