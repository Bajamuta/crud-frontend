import {
    Action,
    ActionType,
    Address,
    City,
    CitySize,
    Client,
    ClientBusiness,
    ClientPerson,
    Country,
    User
} from "./interfaces";

export interface ActionRequest extends Action {
    typeId: string,
    clientId: string,
    userId: string
}

export interface ActionTypeRequest extends ActionType {}

export interface UserRequest extends User {
    password: string
}

export interface FormDataRegister extends UserRequest{
    passwordConfirm: string
}

export interface CityRequest extends City {}

export interface CitySizeRequest extends CitySize{}

export interface CountryRequest extends Country {}

export interface ClientRequest extends Client {}

export interface ClientBusinessRequest extends ClientBusiness {}

export interface ClientPersonRequest extends ClientPerson {}

export interface AddressRequest extends Address {}

