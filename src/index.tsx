import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './views/elements/Home';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom";
import Login from "./views/user/Login";
import SignUp from "./views/user/SignUp";
import LogOut from "./views/user/LogOut";
import User from "./views/user/User";
import ErrorPage from "./views/elements/ErrorPage";
import Clients from "./views/client/Clients";
import Actions from "./views/action/Actions";
import 'bootstrap/dist/css/bootstrap.min.css';
import Registered from "./views/user/Registered";
import ClientDetails from "./views/client/ClientDetails";
import ClientIndex from "./views/client/ClientIndex";
import ClientAdd from "./views/client/ClientAdd";
import UserIndex from "./views/user/UserIndex";
import UserEdit from "./views/user/UserEdit";
import ClientEdit from "./views/client/ClientEdit";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
    {
        path: "",
        element: <App/>,
        children: [
            {
               element: <Home/>, index: true
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
                path: "clients", element: <ClientIndex/>,
                children: [
                    {
                        element: <Clients/>, index: true
                    },
                    {
                        path: ":clientId/show",
                        element: <ClientDetails/>
                    },
                    {
                        path: ":clientId/edit",
                        element: <ClientEdit/>
                    },
                    {
                        path: "add",
                        element: <ClientAdd/>
                    }
                ]
            },
            {
                path: "actions", element: <Actions/>
            },
            {
                path: 'user', element: <UserIndex/>,
                children: [
                    {
                        element: <User/>, index: true
                    },
                    {
                        path: "edit",
                        element: <UserEdit/>
                    }
                ]
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
