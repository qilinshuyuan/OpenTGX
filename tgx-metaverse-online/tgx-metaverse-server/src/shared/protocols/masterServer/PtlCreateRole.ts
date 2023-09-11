export interface ReqCreateRole {
    token:string;
    name:string;
    visualId:number;
}

export interface ResCreateRole {
    name:string;
    visualId:number;
    subWorldId:string;
}
