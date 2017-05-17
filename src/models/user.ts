export interface User {
    id?: number,
    email: string,
    username?: string,
    first_name?: string,
    last_name?: string,
    language?: string,
    profile_picture?:string  ,
    exp: number,
    iat: number
}