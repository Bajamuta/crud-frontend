import {ProviderProps} from "./interfaces";

export const datePipe = (dataString: string) => {
    const d: Date = new Date(dataString);
    const year = d.getFullYear();
    const month = d.getMonth() < 10 ? '0' + d.getMonth() : d.getMonth();
    const day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
    return year + '-' + month + '-' + day;
}
export const ProtectedRoute = ({ loggedUser, children } : ProviderProps) => {
    const token = loggedUser?.jwt_token || null;
    return token ? children : null;
};
export const NotLoggedRoute = ({ loggedUser, children } : ProviderProps) => {
    const token = loggedUser?.jwt_token || null;
    return !token ? children : null;
};
