import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Role, RoleState } from '../../types/roleTypes'

let i = 1
const initialState : RoleState = {
    roles : [
        { id: `${i++}`, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
        { id: `${i++}`, name: 'Moderator', permissions: ['Read', 'Write'] },
        { id: `${i++}`, name: 'User', permissions: ['Read'] },
    ],
}

const roleSlice = createSlice({
    name : 'roles',
    initialState,
    reducers : {
        addRole : (state, action : PayloadAction<Role>) => {
            const newRole = {...action.payload, id: `${i++}`}
            state.roles.push(newRole)
        },
        updateRole : (state, action : PayloadAction<Role>) => {
            const index = state.roles.findIndex(role => role.id === action.payload.id)
            if(index !== -1) state.roles[index] = action.payload
        },
        deleteRole : (state, action : PayloadAction<string>) => {
            state.roles = state.roles.filter(role => role.id !== action.payload)
        }
    }
})

export const { addRole, updateRole, deleteRole } = roleSlice.actions
export default roleSlice.reducer