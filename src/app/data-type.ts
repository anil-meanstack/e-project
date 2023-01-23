export interface signup {
    name: string,
    email: string,
    password: string,
    phone: number,
    address: string,
}
export interface login {
    email: string,
    password: string
}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface order{
    email:string,
    number:string,
    address:string,
    pincode:string
}