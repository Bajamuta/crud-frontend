import {
    ActionResponse, ActionTypeResponse,
    AddressResponse, CityResponse,
    ClientBusinessResponse,
    ClientPersonResponse, ClientResponse, CountryResponse, LoginResponse,
    UserResponse
} from "./interfaces-responses";

export interface User {
    firstname: string,
    surname: string,
    username: string,
    email: string,
    avatarUrl: string
}
export interface City{
    name: string,
}

export interface CitySize {
    name: string
}

export interface Country {
    name: string
}

export interface Action {
    subject: string,
    date: string,
    description: string,
}

export interface ActionType {
    name: string
}

export interface Client {
    business: boolean,
    email: string,
    phone: string
}

export interface ClientBusiness {
    nip: string,
    companyName: string,
}

export interface ClientPerson {
    firstname: string,
    surname: string,
}

export interface Address {
    streetWithNumbers: string,
    postal: string
}

export interface FormDataLogin {
    username: string,
    password: string
}

export interface Error {
    message: string
}

export interface ProviderProps {
    loggedUser: LoginResponse,
    children: JSX.Element
}

