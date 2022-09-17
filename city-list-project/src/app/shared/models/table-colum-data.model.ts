import { TableDataTypeEnum } from "../enums/table-data-type.enum";

export class TableColumDataModel{
    public matColumnDef: string = '';
    public text: string = '';
    public key: string = '';
    public authData: string = '';
    public type: TableDataTypeEnum = TableDataTypeEnum.TEXT;
    public triggerOnlickEvent!: boolean;
}