export interface ReqLogin {
    account: string,
    password: string
}

export interface ResLogin {
    token: string,
    name?:string,
    visualId?:number,
}