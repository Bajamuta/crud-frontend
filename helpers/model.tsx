import {Address, Client, ClientBusiness, ClientPerson} from "./interfaces";

export class ClientModel implements Client, Address, ClientPerson, ClientBusiness {
    business: boolean;
    email: string;
    phone: string;
    postal: string;
    streetWithNumbers: string;
    city: string;
    country: string;
    firstname: string;
    surname: string;
    nip: string;
    companyName: string;
}
