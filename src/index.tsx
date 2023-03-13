import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './views/Home';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import LogOut from "./views/LogOut";
import User from "./views/User";
import ErrorPage from "./views/ErrorPage";
import Clients from "./views/Clients";
import Actions from "./views/Actions";
import 'bootstrap/dist/css/bootstrap.min.css';
import Registered from "./views/Registered";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        element: <App/>,
        children: [
            {
                path: "/", element: <Home/>, index: true
            },
            {
                path: "login", element: <Login/>,
            },
            {
                path: "signup", element: <SignUp/>
            },
            {
                path: "logout", element: <LogOut/>
            },
            {
                path: "clients", element: <Clients/>, children: [
                    /*{
                        path: ":clientId",
                        element:
                    }*/
                ]
            },
            {
                path: "actions", element: <Actions/>
            },
            {
                path: 'user', element: <User/>
            },
            {
                path: 'registered', element: <Registered/>
            }
        ],
        errorElement: <ErrorPage/>
    }
]);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
