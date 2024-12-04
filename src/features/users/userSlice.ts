import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserState } from '../../types/userTypes'

let i=1
const initialState : UserState = {
    users : [
        { id: `${i++}`, name: "John Doe", role: "Admin", status: "Active"},
        { id: `${i++}`, name: "Jane Smith", role: "Moderator", status: "Inactive"},
        { id: `${i++}`, name: "Alice Brown", role: "User", status: "Active"},
        { id: `${i++}`, name: "Bob Davis", role: "Moderator", status: "Active"},
        { id: `${i++}`, name: "Emily Wilson", role: "Admin", status: "Active"},
        { id: `${i++}`, name: "Michael Johnson", role: "Moderator", status: "Inactive"},
        { id: `${i++}`, name: "Sarah White", role: "User", status: "Active"},
        { id: `${i++}`, name: "David Brown", role: "User", status: "Active"}      
      ]
}

const userSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {
        addUser : (state, action : PayloadAction<User>) => {
            state.users.push({...action.payload, id : `${i++}`})
        },
        updateUser : (state, action : PayloadAction<User>) => {
            const index = state.users.findIndex(user => user.id === action.payload.id)
            if(index !== -1) state.users[index] = action.payload
        },
        deleteUser : (state, action : PayloadAction<string>) => {
            state.users = state.users.filter(user => user.id !== action.payload)
        }
    }
})

export const { addUser, updateUser, deleteUser } = userSlice.actions
export default userSlice.reducer