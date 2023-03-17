import {Address, Client, ClientBusiness, ClientPerson} from "./interfaces";

export class ClientModel implements Client, Address, ClientPerson, ClientBusiness {
    business: boolean = false;
    companyName: string = '';
    email: string = '';
    firstname: string = '';
    nip: string = '';
    phone: string = '';
    postal: string = '';
    streetWithNumbers: string = '';
    surname: string = '';

}
