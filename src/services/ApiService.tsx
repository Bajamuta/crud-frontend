import axios from "axios";
import {
    API_ACTION_ALL,
    API_ACTION_CREATE,
    API_ACTION_DELETE, API_ACTION_TYPES_ALL,
    API_ACTION_TYPES_CREATE,
    API_ACTION_TYPES_DELETE,
    API_ACTION_TYPES_UPDATE, API_ACTION_TYPES_URL,
    API_ACTION_UPDATE, API_ACTION_URL,
    API_ADDRESS_ALL,
    API_ADDRESS_CREATE, API_ADDRESS_DELETE,
    API_ADDRESS_UPDATE, API_ADDRESS_URL,
    API_CITY_ALL,
    API_CITY_CREATE,
    API_CITY_DELETE,
    API_CITY_SIZE_ALL,
    API_CITY_SIZE_CREATE,
    API_CITY_SIZE_DELETE,
    API_CITY_SIZE_UPDATE, API_CITY_SIZE_URL,
    API_CITY_UPDATE, API_CITY_URL,
    API_CLIENT_ALL,
    API_CLIENT_BUSINESS_ALL,
    API_CLIENT_BUSINESS_CREATE, API_CLIENT_BUSINESS_DELETE,
    API_CLIENT_BUSINESS_UPDATE, API_CLIENT_BUSINESS_URL,
    API_CLIENT_CREATE, API_CLIENT_DELETE,
    API_CLIENT_PERSON_ALL,
    API_CLIENT_PERSON_CREATE, API_CLIENT_PERSON_DELETE,
    API_CLIENT_PERSON_UPDATE, API_CLIENT_PERSON_URL,
    API_CLIENT_UPDATE, API_CLIENT_URL,
    API_COUNTRY_ALL,
    API_COUNTRY_CREATE,
    API_COUNTRY_DELETE,
    API_COUNTRY_UPDATE, API_COUNTRY_URL, API_USER_ALL,
    API_USER_CREATE,
    API_USER_DELETE,
    API_USER_UPDATE,
    API_USER_URL, AUTH_TOKEN
} from "../react-app-env.d";
import {
    ActionRequest, ActionTypeRequest, AddressRequest,
    CityRequest,
    CitySizeRequest, ClientBusinessRequest, ClientPersonRequest,
    ClientRequest,
    CountryRequest,
    UserRequest
} from "../../helpers/interfaces-requests";
import {
    ActionResponse, ActionTypeResponse, AddressResponse,
    CityResponse,
    CitySizeResponse, ClientBusinessResponse, ClientPersonResponse,
    ClientResponse,
    CountryResponse, UserResponse
} from "../../helpers/interfaces-responses";
import {FormDataLogin} from "../../helpers/interfaces";

export default class ApiService {

    public getAllUsers(){
        return axios.get<UserResponse[]>(`${API_USER_ALL}`);
    }
    public getAllCities(){
        return axios.get<CityResponse[]>(`${API_CITY_ALL}`);
    }
    public getAllCitySizes(){
        return axios.get<CitySizeResponse[]>(`${API_CITY_SIZE_ALL}`);
    }
    public getAllCountries(){
        return axios.get<CountryResponse[]>(`${API_COUNTRY_ALL}`);
    }
    public getAllActions(){
        return axios.get<ActionResponse[]>(`${API_ACTION_ALL}`);
    }
    public getAllActionTypes(){
        return axios.get<ActionTypeResponse[]>(`${API_ACTION_TYPES_ALL}`);
    }
    public getAllClients(){
        return axios.get<ClientResponse[]>(`${API_CLIENT_ALL}`);
    }
    public getAllClientsBusiness(){
        return axios.get<ClientBusinessResponse[]>(`${API_CLIENT_BUSINESS_ALL}`);
    }
    public getAllClientsPeople(){
        return axios.get<ClientPersonResponse[]>(`${API_CLIENT_PERSON_ALL}`);
    }
    public getAllAddresses(){
        return axios.get<AddressResponse[]>(`${API_ADDRESS_ALL}`);
    }
    public createAction(data: ActionRequest){
        return axios.post<Response>(`${API_ACTION_CREATE}`, data);
    }
    public createActionType(data: ActionTypeRequest){
        return axios.post<Response>(`${API_ACTION_TYPES_CREATE}`, data);
    }
    public createCity(data: CityRequest){
        return axios.post<Response>(`${API_CITY_CREATE}`, data);
    }
    public createCitySize(data: CitySizeRequest){
        return axios.post<Response>(`${API_CITY_SIZE_CREATE}`, data);
    }
    public createCountry(data: CountryRequest){
        return axios.post<Response>(`${API_COUNTRY_CREATE}`, data);
    }
    public createClient(data: ClientRequest){
        return axios.post<Response>(`${API_CLIENT_CREATE}`, data);
    }
    public createAddress(data: AddressRequest){
        return axios.post<Response>(`${API_ADDRESS_CREATE}`, data);
    }
    public createClientBusiness(data: ClientBusinessRequest){
        return axios.post<Response>(`${API_CLIENT_BUSINESS_CREATE}`, data);
    }
    public createClientPerson(data: ClientPersonRequest){
        return axios.post<Response>(`${API_CLIENT_PERSON_CREATE}`, data);
    }
    public createUser(data: UserRequest){
        return axios.post<UserResponse>(`${API_USER_CREATE}`, data);
    }

    public updateUser(id: string, data: UserRequest){
        return axios.post<UserResponse>(`${API_USER_UPDATE}/${id}`, data);
    }
    public updateCity(id: string, data: CityRequest){
        return axios.post<CityResponse>(`${API_CITY_UPDATE}/${id}`, data);
    }
    public updateCitySize(id: string, data: CitySizeRequest){
        return axios.post<CitySizeResponse>(`${API_CITY_SIZE_UPDATE}/${id}`, data);
    }
    public updateCountry(id: string, data: CountryRequest){
        return axios.post<CountryResponse>(`${API_COUNTRY_UPDATE}/${id}`, data);
    }
    public updateAction(id: string, data: ActionRequest){
        return axios.post<ActionResponse>(`${API_ACTION_UPDATE}/${id}`, data);
    }
    public updateActionType(id: string, data: ActionTypeRequest){
        return axios.post<ActionTypeResponse>(`${API_ACTION_TYPES_UPDATE}/${id}`, data);
    }
    public updateAddress(id: string, data: AddressRequest){
        return axios.post<AddressResponse>(`${API_ADDRESS_UPDATE}/${id}`, data);
    }
    public updateClient(id: string, data: ClientRequest){
        return axios.post<ClientResponse>(`${API_CLIENT_UPDATE}/${id}`, data);
    }
    public updateClientBusiness(id: string, data: ClientBusinessRequest){
        return axios.post<ClientBusinessResponse>(`${API_CLIENT_BUSINESS_UPDATE}/${id}`, data);
    }
    public updateClientPerson(id: string, data: ClientPersonRequest){
        return axios.post<ClientPersonResponse>(`${API_CLIENT_PERSON_UPDATE}/${id}`, data);
    }



    public deleteUser(id: string){
        return axios.delete<Response>(`${API_USER_DELETE}/${id}`);
    }
    public deleteCity(id: string){
        return axios.delete<Response>(`${API_CITY_DELETE}/${id}`);
    }
    public deleteCitySize(id: string){
        return axios.delete<Response>(`${API_CITY_SIZE_DELETE}/${id}`);
    }
    public deleteCountry(id: string){
        return axios.delete<Response>(`${API_COUNTRY_DELETE}/${id}`);
    }
    public deleteAction(id: string, typeId: string, clientId: string){
        /*TODO drugi parametr*/
        const data = {};
        return axios.delete<Response>(`${API_ACTION_DELETE}/${id}`, data);
    }
    public deleteActionType(id: string){
        return axios.delete<Response>(`${API_ACTION_TYPES_DELETE}/${id}`);
    }
    public deleteClient(id: string){
        return axios.delete<Response>(`${API_CLIENT_DELETE}/${id}`);
    }
    public deleteAddress(id: string){
        return axios.delete<Response>(`${API_ADDRESS_DELETE}/${id}`);
    }
    public deleteClientBusiness(id: string){
        return axios.delete<Response>(`${API_CLIENT_BUSINESS_DELETE}/${id}`);
    }
    public deleteClientPerson(id: string){
        return axios.delete<Response>(`${API_CLIENT_PERSON_DELETE}/${id}`);
    }

    public getSingleUser(id: string){
        return axios.get<UserResponse>(`${API_USER_URL}/${id}`);
    }
    public getSingleAction(id: string){
        return axios.get<ActionResponse>(`${API_ACTION_URL}/${id}`);
    }
    public getSingleActionType(id: string){
        return axios.get<ActionTypeResponse>(`${API_ACTION_TYPES_URL}/${id}`);
    }
    public getSingleCity(id: string){
        return axios.get<CityResponse>(`${API_CITY_URL}/${id}`);
    }
    public getSingleCitySize(id: string){
        return axios.get<CitySizeResponse>(`${API_CITY_SIZE_URL}/${id}`);
    }
    public getSingleCountry(id: string){
        return axios.get<CountryResponse>(`${API_COUNTRY_URL}/${id}`);
    }
    public getSingleAddress(id: string){
        return axios.get<AddressResponse>(`${API_ADDRESS_URL}/${id}`);
    }
    public getSingleClient(id: string){
        return axios.get<ClientResponse>(`${API_CLIENT_URL}/${id}`);
    }
    public getSingleClientBusiness(id: string){
        return axios.get<ClientBusinessResponse>(`${API_CLIENT_BUSINESS_URL}/${id}`);
    }
    public getSingleClientPerson(id: string){
        return axios.get<ClientPersonResponse>(`${API_CLIENT_PERSON_URL}/${id}`);
    }

    public login(formData: FormDataLogin){
        return  axios.post(`${AUTH_TOKEN}`, {
            username: formData.username,
            password: formData.password
            /*TODO separate response type: loginresponse vs errorresponse*/
        });
    }
}
