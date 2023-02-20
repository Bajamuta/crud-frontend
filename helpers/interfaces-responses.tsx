import {
    Action,
    ActionType,
    Address,
    City,
    CitySize,
    Client,
    ClientBusiness,
    ClientPerson,
    Country, Error,
    User
} from "./interfaces";

export interface DatabaseResponse {
    _id: string,
    error?: string
}

export interface UserResponse extends DatabaseResponse, User{
    createdAt: string,
    actions: ActionResponse[],
    updatedAt?: string
}

export interface CityResponse extends DatabaseResponse, City{
    size: CitySize
}

export interface CitySizeResponse extends DatabaseResponse, CitySize {}

export interface CountryResponse extends DatabaseResponse, Country {}

export interface ActionResponse extends DatabaseResponse, Action {
    type: ActionTypeResponse,
    client: ClientResponse,
    user: UserResponse
}

export interface ActionTypeResponse extends DatabaseResponse, ActionType {}

export interface ClientResponse extends DatabaseResponse, Client {
    clientBusiness: ClientBusinessResponse,
    clientPerson: ClientPersonResponse,
    address: AddressResponse,
    actions: ActionResponse[]
}

export interface ClientBusinessResponse extends DatabaseResponse, ClientBusiness {
    clients: ClientResponse[]
}

export interface ClientPersonResponse extends DatabaseResponse, ClientPerson {
    clients: ClientResponse[]
}

export interface AddressResponse extends DatabaseResponse, Address {
    city: CityResponse,
    country: CountryResponse,
}

export interface LoginResponse {
    id: string,
    jwt_token: string,
    ttl: string,
    username: string
    error: string
}

export interface ErrorResponse {
    error: Error;
}

export interface ResultResponse {
    result: string;
}

export interface ObjectContext {
    loggedUser: LoginResponse,
    setLoggedUser: (res: LoginResponse) => void
}
