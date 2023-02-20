import React, {useState} from 'react';
import './App.css';
import {LoginResponse} from "../helpers/interfaces-responses";
import Header from "../views/Header";
import {Link, Outlet} from "react-router-dom";
import Footer from "../views/Footer";

export default function App() {


const initLocal = localStorage.getItem("loggedUser") || '';
const [loggedUser, setLoggedUser] = useState<LoginResponse>(initLocal.length > 0 ? JSON.parse( initLocal) : {jwt_token: ''});

return (
    <div className="App">
        <Header/>
        <nav className="AppNavbar">
            <ul>
                <li>
                    <Link to={"/"}>HOME</Link>
                </li>
                {!!loggedUser?.jwt_token &&
                    <li>
                        <Link to={"/register"}>REGISTER TO AN EVENT</Link>
                    </li>}
                {!loggedUser?.jwt_token &&
                    <li>
                        <Link to={"/login"}>LOG IN</Link>
                    </li>
                }
                {!loggedUser?.jwt_token &&
                    <li>
                        <Link to={"/signup"}>SIGN UP</Link>
                    </li>
                }
                {!!loggedUser?.jwt_token &&
                    <li>
                        <Link to={"/logout"}>LOG OUT</Link>
                    </li>
                }
                {!!loggedUser?.jwt_token &&
                    <li>
                        <Link to={"/user"}>USER</Link>
                    </li>
                }
            </ul>
        </nav>
        <Outlet context={{loggedUser, setLoggedUser}}/>
        <Footer/>
    </div>
);
}
/*TODO AUTHPROVIDER etc + czas tokena*/

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
