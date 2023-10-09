export type UserModel = {
    id: number,
    nome: string,
    lastName: string,
    document: string,
    balance: number,
    email: string,
    password: string,
    userType: string
}


export type postUser = {
    firstName: string,
    lastName: string,
    document: string,
    balance: number,
    email: string,
    password: string,
    userType: string
}

export type postTransaction = {
    value: number,
    senderId: number,
    receiverId: number
}


