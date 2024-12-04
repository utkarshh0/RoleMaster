
export interface User{

    id : string,
    name : string,
    role : 'User' | 'Moderator' | 'Admin'
    status : 'Active' | 'Inactive'
}

export interface UserState{
    users : User[]
}