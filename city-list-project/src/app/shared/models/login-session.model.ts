import { TabDataExternalizableEnum } from "../enums/tab-data-externalizable.enum";
import { AbstractExternalizableModel } from "./abstract-externalizable.model";


// this is to handle logginn session data with encriptiom
export class LoginSessionModel extends AbstractExternalizableModel {

    private token: string = '';
    private roles: any[] = [];
    private email: string = '';
    private id!: number;
    private name: string = '';
    private redirectData: string = '';

    getId(): number{
        return this.id;
    }
    setId(id: number){
        this.id = id;
    }
    
    getToken(): string{
        return this.token;
    }
    setToken(token: string){
        this.token = token;
    }

    getRole(): any[]{
        return this.roles;
    }
    setRole(roles: any[]){
        this.roles = roles;
    }

    getEmail(): string{
        return this.email;
    }
    setEmail(email: string){
        this.email = email;
    }

    getName(): string{
        return this.name;
    }
    setName(name: string){
        this.name = name;
    }

    getRedirectData(): string{
        return this.redirectData;
    }
    setRedirectData(redirectData: string){
        this.redirectData = redirectData;
    }


    // update the cached storage
    updateBrowserCache(key: string, value: any): void {

        const readData: any = key ? this.readExternal() : null;
        if (readData) {
            readData[key] = value;
            if (readData.token) {
                const encoded = this.encode(readData, true);
                this.addItemToSessionStorage(TabDataExternalizableEnum.SESSION_DATA, encoded);
            }
        } else {
            this.writeExternal();
        }
    }

    // this is to redirect to last place that user was
    hasRedirectData(): boolean {
        const encodedRedirectData: any = this.getItemSessionStorage(TabDataExternalizableEnum.SESSION_DATA);
        const decodedeRedirectData: any = encodedRedirectData ? this.decode(encodedRedirectData, false) : null;
        if (decodedeRedirectData && decodedeRedirectData.redirectData) {
            return true;
        } else {
            return false;
        }
    }

    // read storage data after decoding
    readExternal<T>() {
        const encodedData: any = this.getItemSessionStorage(TabDataExternalizableEnum.SESSION_DATA);
        const decodedData: any = encodedData ? this.decode(encodedData, true) : null;

        this.token = decodedData?.token;
        this.roles = decodedData?.roles;
        this.email = decodedData?.email;
        this.id = decodedData?.id;
        this.name = decodedData?.name;
        this.redirectData = decodedData?.redirectData;
        return this;
    }

    // writing storage data with encoding
    writeExternal(): void {
        const sanitizedData = this.sanitize();
        const returnString = JSON.stringify(sanitizedData);
        const encodedData: any = this.encode(returnString, true);
        this.addItemToSessionStorage(TabDataExternalizableEnum.SESSION_DATA, encodedData);
    }

    // this is to hadle the writeExternal data
    sanitize(): any {
        const data: any = {};
        data.token = this.token;
        data.roles = this.roles;
        data.email = this.email;
        data.id = this.id;
        data.name = this.name;
        data.redirectData = this.redirectData;
        return data;
    }

}