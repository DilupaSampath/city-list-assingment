import { TabDataExternalizableEnum } from "../enums/tab-data-externalizable.enum";


// AbstractExternalizableModel to handle local stroage or sesstion stroage data with enctription
export abstract class AbstractExternalizableModel {

    public addItemToSessionStorage(itemType: TabDataExternalizableEnum, data: any) {
        sessionStorage.setItem(itemType.toString(), data);
    }

    public getItemSessionStorage(itemType: TabDataExternalizableEnum): string | null {
        return sessionStorage.getItem(itemType.toString());
    }


    public removeItemInSessionStorage(itemType: TabDataExternalizableEnum): void {
        sessionStorage.removeItem(itemType.toString());
    }

    encode(data: any, isJson: boolean): string {
        const encoded = encodeURIComponent(btoa(encodeURIComponent(JSON.stringify(data))));
        return encoded;
    }

    decode(encoded: any, isJson: boolean): string {
        const decoded = JSON.parse(decodeURIComponent(atob(decodeURIComponent(encoded))));
        return decoded ? isJson ? JSON.parse(decoded) : decoded : null;
    }

    abstract hasRedirectData(): boolean;

    abstract updateBrowserCache(key: string, value: any): void;

    abstract readExternal<T>(): any;
    abstract writeExternal<T>(): void;

    abstract sanitize(): any;


}
