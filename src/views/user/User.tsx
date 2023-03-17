import React, {useEffect, useState} from "react";
import {useNavigate,} from "react-router-dom";
import {AxiosResponse} from "axios";
import {Button, Image} from "react-bootstrap";
import {UserResponse} from "../../helpers/interfaces-responses";
import {useMainContext} from "../../App";

export default function User() {
    const initUser = {
        _id: '',
        createdAt: '',
        firstname: '',
        surname: '',
        username: '',
        email: '',
        avatarUrl: '',
        actions: []
    };
    const {loggedUser, apiService} = useMainContext();
    const defaultAvatarUrl = 'https://images.unsplash.com/photo-1622227056993-6e7f88420855?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';
    const [userDetails, setUserDetails] = useState<UserResponse>(initUser);
    const navigate = useNavigate();

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = (): Promise<UserResponse | void> => {
        return apiService.getSingleUser(loggedUser.id)
            .then(
                (response: AxiosResponse<UserResponse>) => {
                    if (!response.data.error) {
                        return Promise.resolve(response.data);
                    } else {
                        console.error('An error has occurred during retrieving logged user\'s details', response.data.error);
                        return Promise.reject();
                    }
                }
            )
            .then((userDetails: UserResponse) => {
                setUserDetails(userDetails);
            })
            .catch((error) => console.error("An error has occurred:", error));
    }

    const deleteUser = () => {
        return apiService.deleteUser(loggedUser.id).then(
            (result: AxiosResponse<Response>) => {
                if (result.status === 200 || result.status === 204)
                {
                    navigate('/logout');
                }
            }
        )
    }

    const openUserEdit = () => {
        navigate(`/user/edit`);
    }

    return (
        <div className="">
            <h2 className="mb-5">Logged user's details</h2>
            <div className="d-flex justify-content-evenly w-50 mx-auto" style={{gap: "3rem"}}>
                <Image src={userDetails?.avatarUrl || defaultAvatarUrl}
                       roundedCircle={true} width="200px" height="200px" style={{objectFit: "cover"}}></Image>
                <div className="w-50">
                    <p><span className="fw-bold">Username:</span> {userDetails?.username}</p>
                    <p><span className="fw-bold">Email:</span> {userDetails?.email}</p>
                    <p><span className="fw-bold">Name:</span> {userDetails?.firstname}</p>
                    <p><span className="fw-bold">Surname:</span> {userDetails?.surname}</p>
                    <div className="d-flex flex-column">
                        <Button type="button" className="w-50 mb-4" variant="info" onClick={openUserEdit}>Edit details</Button>
                        <Button type="button" className="w-50" variant="danger" onClick={deleteUser}>Delete account</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
