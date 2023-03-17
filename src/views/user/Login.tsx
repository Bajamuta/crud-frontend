import React, {FormEvent, useState} from "react";
import '../../styles/Login.css';
import {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";
import {FormDataLogin} from "../../helpers/interfaces";
import {LoginResponse} from "../../helpers/interfaces-responses";
import {useMainContext} from "../../App";

export default function Login() {
    const {setLoggedUser, authService} = useMainContext();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>("Incorrect username or password");

    const [formData, setFormData] = useState<FormDataLogin>({
        username: "",
        password: ""
    });
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        authService.login(formData)
       .then((response: AxiosResponse<LoginResponse>) => {
            if (response.status === 200) {
                if (!response.data.error)
                {
                    setShowErrorMessage(false);
                    localStorage.setItem("loggedUser", JSON.stringify(response.data));
                    setLoggedUser(response.data);
                    navigate('/');
                }
                else
                {
                    console.error('An error has occurred during retrieving login token', response.data.error);
                    // setErrorMessage(response.data.error)
                    setShowErrorMessage(true);
                }
            }
            else {
                setShowErrorMessage(true);
            }
        })
            .catch((error) => console.error("An error has occurred during logging in:", error));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        const name = target.name;
        setFormData({
            ...formData,
            [name]: target.value
        });
        setShowErrorMessage(false);
    }
    return (<div className="LoginContainer">
        <h2 className="mb-4">Log In</h2>
        {/*HERE AS AN EXAMPLE WITHOUT BOOTSTRAP ELEMENTS, JUST CLASSES*/}
        <form className="FormBody" onSubmit={handleSubmit}>
            <div>
                <label form={formData.username} className="form-label">Username*:</label>
                <input type="text"
                       name="username"
                       className="form-control"
                       placeholder="Enter username"
                       onChange={handleInputChange}/>
            </div>
            <div>
                <label form={formData.password} className="form-label">Password*:</label>
                <input type="password" placeholder="Enter password"
                       className="form-control"
                       name="password" onChange={handleInputChange}/>
            </div>
            <button type="submit" className="btn btn-primary w-75 align-self-center mt-5">Login</button>
        </form>
        {showErrorMessage && <p className="FontItalic FontRed">{errorMessage}</p>}
    </div>);
}
