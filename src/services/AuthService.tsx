import {FormDataLogin} from "../helpers/interfaces";
import {AUTH_TOKEN} from "../react-app-env.d";
import axios from "axios";
export default class AuthService {
    public login(formData: FormDataLogin){
        return  axios.post(`${AUTH_TOKEN}`, {
            username: formData.username,
            password: formData.password
            /*TODO separate response type: loginresponse vs errorresponse*/
        });
    }
}
