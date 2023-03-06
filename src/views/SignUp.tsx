import React, {ChangeEvent} from "react";
import {useNavigate, useOutletContext} from "react-router-dom";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import ApiService from "../services/ApiService";
import {AxiosResponse} from "axios";
import {ObjectContext, UserResponse} from "../../helpers/interfaces-responses";
import { FormDataRegister } from "../../helpers/interfaces-requests";

export default function SignUp() {

    const objectContext: ObjectContext = useOutletContext();
    const navigate = useNavigate();
    const apiService: ApiService = new ApiService();
    const { register, handleSubmit, control, reset, watch, formState: { errors } } = useForm<FormDataRegister>();

    const onSubmit: SubmitHandler<FormDataRegister> = (data: FormDataRegister) => {
        apiService.createUser(data)
            .then((response: AxiosResponse<UserResponse>) => {
            if (response.status === 200) {
                if (!response.data.error)
                {
                    navigate('/registered');
                }
               else
                {
                    console.error('An error has occurred during creating an user', response.data.error);
                }
            }
            else {
                console.log(response);
            }
        })
            .catch((error) => console.error("An error has occurred during registering an user:", error));
    }

    const passwordMatches = () => {
        return watch().password?.trim().length > 0
            && watch().password === watch().passwordConfirm;
    }

    return (<div className="Container BorderContainer mb-5">
        <h2>Sign Up</h2>
        <Form name="signupForm" className="FormBody" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="" controlId="username">
                <Form.Label>Username*:</Form.Label>
                <Controller control={control} name="username" defaultValue=""
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
            <Form.Group className="" controlId="firstname">
                <Form.Label>Name*:</Form.Label>
                <Controller control={control} name="firstname" defaultValue=""
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
            <Form.Group className="" controlId="surname">
                <Form.Label>Surname*:</Form.Label>
                <Controller control={control} name="surname" defaultValue=""
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
            <Form.Group className="" controlId="email">
                <Form.Label>Email*:</Form.Label>
                <Controller control={control} name="email" defaultValue=""
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
            <Form.Group className="" controlId="password">
                <Form.Label>Password*:</Form.Label>
                <Controller control={control} name="password" defaultValue=""
                            render={({field: {onChange, onBlur, value, ref}}) => (
                                <Form.Control type="password" placeholder="Enter password"
                                              className={errors.password ? 'invalid' : 'valid'}
                                              required
                                              pattern="[1-9a-Z$%&*()#@!]+"
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
            <Form.Group className="" controlId="passwordConfirm">
                <Form.Label>Confirm password*:</Form.Label>
                <Controller control={control} name="passwordConfirm" defaultValue=""
                            render={({field: {onChange, onBlur, value, ref}}) => (
                                <Form.Control type="password" placeholder="Confirm password"
                                              required
                                              pattern="[1-9a-Z$%&*()#@!]+"
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
            <Button variant="primary" size="lg" type="submit" className="mt-4">Sign Up</Button>
        </Form>
    </div>);
}
