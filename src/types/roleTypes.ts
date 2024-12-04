export interface Role{
    id : string,
    name : string,
    permissions : string[]
}

export interface RoleState{
    roles : Role[]
}