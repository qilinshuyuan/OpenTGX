export interface ReqLogin {
    account: string,
    password: string
}

export interface ResLogin {
    token: string,
    uid:string,
    name?:string,
    visualId?:number,
    subWorldId:string,
}