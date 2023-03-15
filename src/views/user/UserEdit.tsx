import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {AxiosResponse} from "axios/index";
import {useNavigate} from "react-router-dom";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {FormDataRegister} from "../../../helpers/interfaces-requests";
import {UserResponse} from "../../../helpers/interfaces-responses";
import {useMainContext} from "../../App";

export default function UserEdit() {
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
    const [userDetails, setUserDetails] = useState<UserResponse>(initUser);
    const defaultAvatarUrl = 'https://images.unsplash.com/photo-1622227056993-6e7f88420855?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80';
    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<FormDataRegister>();
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

    const onSubmit: SubmitHandler<FormDataRegister> = (data: FormDataRegister) => {
        apiService.updateUser(userDetails._id, data)
            .then((response: AxiosResponse<UserResponse>) => {
                if (response.status === 200) {
                    if (!response.data.error)
                    {
                        navigate('/user');
                        /*TODO poprawić grafikę*/
                    }
                    else
                    {
                        console.error('An error has occurred during updating an user', response.data.error);
                    }
                }
                else {
                    console.log(response);
                }
            })
            .catch((error) => console.error("An error has occurred:", error));
    }


    const passwordMatches = () => {
        return watch().password?.trim().length > 0
            && watch().password === watch().passwordConfirm;
    }

    return (
        <div className="FormContainer">
            <h2 className="mb-4">Edit user info:</h2>
            <Form name="signupForm" className="FormBody" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="my-3" controlId="username">
                    <Form.Label>Username*:</Form.Label>
                    <Controller control={control} name="username" defaultValue={userDetails?.username}
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <Form.Control type="text" placeholder="Enter username"
                                                  required
                                                  minLength={3}
                                                  onChange={onChange} value={value} ref={ref} isInvalid={!!errors.username}>
                                    </Form.Control>
                                )} />
                    <Form.Control.Feedback type='invalid'>
                        {errors.username?.message}
                    </Form.Control.Feedback>
                    {errors.username && <Form.Text className="ValidationMessage">{errors.username?.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="my-3" controlId="firstname">
                    <Form.Label>Name*:</Form.Label>
                    <Controller control={control} name="firstname" defaultValue={userDetails?.firstname}
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <Form.Control type="text" placeholder="Enter subject"
                                                  required
                                                  minLength={3}
                                                  onChange={onChange} value={value} ref={ref} isInvalid={!!errors.firstname}>
                                    </Form.Control>
                                )} />
                    <Form.Control.Feedback type='invalid'>
                        {errors.firstname?.message}
                    </Form.Control.Feedback>
                    {errors.firstname && <Form.Text className="ValidationMessage">{errors.firstname?.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="my-3" controlId="surname">
                    <Form.Label>Surname*:</Form.Label>
                    <Controller control={control} name="surname" defaultValue={userDetails?.surname}
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <Form.Control type="text" placeholder="Enter surname"
                                                  required
                                                  minLength={3}
                                                  onChange={onChange} value={value} ref={ref} isInvalid={!!errors.surname}>
                                    </Form.Control>
                                )} />
                    <Form.Control.Feedback type='invalid'>
                        {errors.surname?.message}
                    </Form.Control.Feedback>
                    {errors.surname && <Form.Text className="ValidationMessage">{errors.surname?.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="my-3" controlId="email">
                    <Form.Label>Email*:</Form.Label>
                    <Controller control={control} name="email" defaultValue={userDetails?.email}
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <Form.Control type="email" placeholder="Enter email"
                                                  required
                                                  className={errors.email ? 'invalid' : 'valid'}
                                                  onChange={onChange} value={value} ref={ref} isInvalid={!!errors.email}>
                                    </Form.Control>
                                )} />
                    {/*<Form.Control type="email" placeholder="Enter email"
                              {...register("email", { required: true, pattern: /^\/w+@\/w+.\/w{2}$/ })}>
                </Form.Control>*/}
                    {errors.email && <Form.Text className="ValidationMessage">{errors.email?.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="my-3" controlId="password">
                    <Form.Label>Password*:</Form.Label>
                    <Controller control={control} name="password" defaultValue=""
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <Form.Control type="password" placeholder="Enter password"
                                                  className={errors.password ? 'invalid' : 'valid'}
                                                  required
                                                  pattern="'[0-9a-Z$%&*()#@!]+'"
                                                  onChange={onChange}
                                                  value={value} ref={ref}
                                                  isInvalid={!!errors.password}>
                                    </Form.Control>
                                )} />
                    {/*<Form.Control type="password" placeholder="Enter password"
                              {...register("password", { required: true, pattern: /^\/w+$/ })}>
                </Form.Control>*/}
                    {errors.password && <Form.Text className="ValidationMessage">{errors.password?.message}</Form.Text>}
                </Form.Group>
                <Form.Group className="my-3" controlId="passwordConfirm">
                    <Form.Label>Confirm password*:</Form.Label>
                    <Controller control={control} name="passwordConfirm" defaultValue=""
                                render={({field: {onChange, onBlur, value, ref}}) => (
                                    <Form.Control type="password" placeholder="Confirm password"
                                                  required
                                                  pattern="'[0-9a-Z$%&*()#@!]+'"
                                                  onChange={onChange} value={value} ref={ref}
                                                  isInvalid={!!errors.passwordConfirm || !passwordMatches()}
                                    >
                                    </Form.Control>
                                )} />
                    {/*<Form.Control type="password" placeholder="Confirm password"
                              {...register("passwordConfirm", { required: true, pattern: /^\/w+$/ })}>
                </Form.Control>*/}
                    {errors.passwordConfirm && <Form.Text className="ValidationMessage">{errors.passwordConfirm?.message}</Form.Text>}
                </Form.Group>
                <div className="ButtonsContainer">
                    <Button variant="primary" size="lg" type="submit">Save</Button>
                </div>
            </Form>
        </div>
    );
}
