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

export interface priceSummary {
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}
export interface order {
    email: string,
    number: string,
    address: string,
    pincode: string
}
export interface product {
    name: string,
    price: number,
    category: string,
    color: string,
    image: string,
    description: string,
    id: number | undefined,
    quantity: undefined | number,
    productId: undefined | number

}
export interface cart {
    total: number,
    name: string,
    price: number,
    category: string,
    color: string,
    image: string,
    description: string,
    id: number | undefined,
    quantity: undefined | number,
    userId: number,
    productId: number | undefined,
}
export interface order {
    email: string,
    number: string,
    address: string,
    pinCode: string,
    totalPrice: number,
    userId: number,
    id:number|undefined
}