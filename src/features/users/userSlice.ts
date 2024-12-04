import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserState } from '../../types/userTypes'

const initialState : UserState = {
    users : [
        { id: "1", name: "John Doe", role: "Admin", status: "Active"},
        { id: "2", name: "Jane Smith", role: "Moderator", status: "Inactive"},
        { id: "3", name: "Alice Brown", role: "User", status: "Active"},
        { id: "4", name: "Bob Davis", role: "Moderator", status: "Active"},
        { id: "5", name: "Emily Wilson", role: "Admin", status: "Active"},
        { id: "6", name: "Michael Johnson", role: "Moderator", status: "Inactive"},
        { id: "7", name: "Sarah White", role: "User", status: "Active"},
        { id: "8", name: "David Brown", role: "User", status: "Active"}      
      ]
}

const userSlice = createSlice({
    name : 'users',
    initialState,
    reducers : {
        addUser : (state, action : PayloadAction<User>) => {
            state.users.push(action.payload)
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