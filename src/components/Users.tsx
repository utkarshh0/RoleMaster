import React, { useState } from "react"
import { FaEdit } from "react-icons/fa"
import { MdDelete } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../app/store"
import { deleteUser } from "../features/users/userSlice"
// import { User } from "../types/userTypes"

// let i=9

const Users: React.FC = () => {
    const users = useSelector((state: RootState) => state.users.users)
    const roles = useSelector((state: RootState) => state.roles.roles)
    const dispatch = useDispatch()

    const [selectedRole, setSelectedRole] = useState<string>("All")
    const [selectedStatus, setSelectedStatus] = useState<string>("All")
    const [searchTerm, setSearchTerm] = useState<string>("")
    // const [modalAction, setModalAction] = useState<'add' | 'edit'>('add');
    // const [formData, setFormData] = useState({
    //     name : '',
    //     role : 'User',
    //     status : 'Active'
    // })

    const filteredUsers = users.filter((user) => {
        const roleMatch = selectedRole === "All" || user.role === selectedRole
        const statusMatch = selectedStatus === "All" || user.status === selectedStatus
        const searchMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase())
        return roleMatch && statusMatch && searchMatch
    })

    const getPermissionForRole = (roleName : string) => {
        const role = roles.find(role => role.name === roleName)
        return role?.permissions
    }

    const handleDeleteUser = (userId : string) => {
        dispatch(deleteUser(userId))
    }

    // const handleSaveRole = () => {
    //     if (modalAction === 'add') {
    //         dispatch(addUser({ id: `${i++}`, name: formData.name, role : formData.role, status : formData.status }));
    //     } else if (modalAction === 'edit' && selectedRole) {
    //         dispatch(updateUser({ ...users["3"], name: roleName, permissions }));
    //     }
    //     closeModal();
    //     resetForm();
    // };

    // const resetForm = () => {
    //     setRoleName('');
    //     setPermissions([]);
    //     setSelectedRole(null);
    // };

    // const openEditModal = (role: Role) => {
    //     setSelectedRole(role);
    //     setRoleName(role.name);
    //     setPermissions(role.permissions);
    //     setModalAction('edit');
    //     openModal();
    // };

    // const openAddModal = () => {
    //     setModalAction('add');
    //     openModal();
    // };

    // const modalRef = useRef<HTMLDialogElement>(null);

    // const openModal = () => {
    //     if (modalRef.current) {
    //         modalRef.current.showModal();
    //     }
    // };

    // const closeModal = () => {
    //     resetForm()
    //     if (modalRef.current) {
    //         modalRef.current.close();
    //     }
    // };

    return ( 
        <>
            <div className="w-full">
                <div className='px-4 py-2 flex justify-between items-center'>
                    <p className='text-3xl font-bold'>Users</p>
                    <button className='text-lg bg-text text-primary px-4 py-2 rounded-lg font-bold hover:opacity-75 transition duration-200'>Add Users</button>
                </div>
                <div className="m-2 flex flex-col md:flex-row space-y-2 space-x-4 items-center md:items-baseline">
                    <input 
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search User"
                        className="bg-primary border border-2 border-text rounded-md px-2 py-1"
                    />
                    <div className="flex space-x-2">
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value)}
                            className="bg-primary border border-2 border-text rounded-md px-2 py-1"
                        >
                            <option value="All">All Roles</option>
                            {roles.map((role) => (
                                <option key={role.id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="bg-primary border border-2 border-text rounded-md px-2 py-1"
                        >
                            <option value="All">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full mx-auto shadow-lg rounded-lg overflow-hidden">
                        <thead>
                            <tr>
                                <th className="border border-2 border-text p-2">Id</th>
                                <th className="border border-2 border-text p-2">Name</th>
                                <th className="border border-2 border-text p-2">Role</th>
                                <th className="border border-2 border-text p-2">Activity</th>
                                <th className="border border-2 border-text p-2">Permissions</th>
                                <th className="border border-2 border-text p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length == 0 ?
                                <tr>
                                    <td colSpan={6} className="p-4 text-center">No Such Users</td>
                                </tr>
                                    :   
                                filteredUsers.map((user) => (
                                    <tr key={user.id}>
                                        <td className="border border-2 border-text p-2">{user.id}</td>
                                        <td className="border border-2 border-text p-2">{user.name}</td>
                                        <td className="border border-2 border-text p-2">{user.role}</td>
                                        <td className="border border-2 border-text p-2">{user.status}</td>
                                        <td className="border border-2 border-text p-2">
                                            <div className="flex justify-center space-x-4">
                                                {['Read', 'Write', 'Delete'].map((permission) => (
                                                    <label key={permission} className="flex items-center space-x-2">
                                                        <input
                                                            disabled
                                                            type="checkbox"
                                                            checked={getPermissionForRole(user.role)?.includes(permission) || false}
                                                            readOnly
                                                            className="form-checkbox"
                                                        />
                                                        <span>{permission}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="border border-2 border-text p-2">
                                            <div className="flex space-x-4 font-bold px-4 text-center">
                                                <button className="bg-text text-primary px-2 py-1 rounded-md hover:opacity-75 transition duration-200">
                                                    <FaEdit />
                                                </button>
                                                <button onClick={() => handleDeleteUser(user.id)} className="bg-text text-primary px-2 py-1 rounded-md shadow-md hover:opacity-75 transition duration-200">
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <dialog ref={modalRef} className="p-6 rounded-md w-4/5 md:w-2/5">
                <p className="text-2xl text-text text-center font-bold mb-4">
                    {modalAction === 'add' ? 'Add User' : 'Edit User'}
                </p>

                <div className="mb-4">
                    <label className="block text-md font-bold text-text">User Name</label>
                    <input
                        type="text"
                        className="w-full border border-2 border-text p-2 rounded-md"
                        value={formData.name}
                        onChange={(e) => setFormData(formData[name][e.target.value])}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold text-text">User Role</label>
                    <select
                        className="w-full border border-2 border-text p-2 rounded-md"
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="viewer">Viewer</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-md font-bold text-text">Activity</label>
                    <select
                        className="w-full border border-2 border-text p-2 rounded-md"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                    >
                        <option value="">Select Activity</option>
                        <option value="login">Login</option>
                        <option value="logout">Logout</option>
                        <option value="edit">Edit</option>
                    </select>
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={handleSaveRole}
                        className="bg-text text-primary px-4 py-2 rounded-md hover:opacity-75"
                    >
                        {modalAction === 'add' ? 'Add' : 'Update'}
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:opacity-75"
                    >
                        Cancel
                    </button>
                </div>
            </dialog> */}

        </>
        
    )
}

export default Users
