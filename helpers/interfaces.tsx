import {
    ActionResponse, ActionTypeResponse,
    AddressResponse, CityResponse,
    ClientBusinessResponse,
    ClientPersonResponse, ClientResponse, CountryResponse,
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
    name: string,
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
    name: string,
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

