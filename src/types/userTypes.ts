
export interface User{

    id : string,
    name : string,
    role : string
    status : 'Active' | 'Inactive'
}

export interface UserState{
    users : User[]
}