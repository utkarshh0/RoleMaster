import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store"; // Assuming your store is set up in this path
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteRole, addRole, updateRole } from "../features/roles/roleSlice"; // Importing actions for role deletion, adding, and updating

interface Role {
    id: string;
    name: string;
    permissions: string[];
}

const Roles: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [modalAction, setModalAction] = useState<'add' | 'edit'>('add');
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [roleName, setRoleName] = useState('');
    const [permissions, setPermissions] = useState<string[]>([]);
    const roles = useSelector((state: RootState) => state.roles.roles);
    const dispatch = useDispatch();

    const filteredRoles = roles.filter(role =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDeleteRole = (roleId: string) => {
        dispatch(deleteRole(roleId));
    };

    const handleSaveRole = () => {
        if (modalAction === 'add') {
            dispatch(addRole({ id: Date.now().toString(), name: roleName, permissions }));
        } else if (modalAction === 'edit' && selectedRole) {
            dispatch(updateRole({ ...selectedRole, name: roleName, permissions }));
        }
        closeModal();
        resetForm();
    };

    const resetForm = () => {
        setRoleName('');
        setPermissions([]);
        setSelectedRole(null);
    };

    const openEditModal = (role: Role) => {
        setSelectedRole(role);
        setRoleName(role.name);
        setPermissions(role.permissions);
        setModalAction('edit');
        openModal();
    };

    const openAddModal = () => {
        setModalAction('add');
        openModal();
    };

    const modalRef = useRef<HTMLDialogElement>(null);

    const openModal = () => {
        if (modalRef.current) {
            modalRef.current.showModal();
        }
    };

    const closeModal = () => {
        resetForm()
        if (modalRef.current) {
            modalRef.current.close();
        }
    };

    return (
        <div className="w-full">
            <div className="px-4 py-2 flex justify-between items-center">
                <p className="text-3xl font-bold">Roles</p>
                <button
                    onClick={openAddModal}
                    className="text-lg bg-text text-primary px-4 py-2 rounded-lg font-bold hover:opacity-75 transition duration-200"
                >
                    Add Role
                </button>
            </div>
            
            <div className="m-2">
                <input
                    type="text"
                    placeholder="Search Role"
                    className="bg-primary border border-2 border-text rounded-md px-2 py-1"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="overflow-x-auto">
                <table className="table-auto w-full mx-auto shadow-lg rounded-lg overflow-hidden">
                    <thead>
                        <tr>
                            <th className="border border-2 border-text p-2">Id</th>
                            <th className="border border-2 border-text p-2">Role Name</th>
                            <th className="border border-2 border-text p-2">Permissions</th>
                            <th className="border border-2 border-text p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRoles.map((role) => (
                            <tr key={role.id}>
                                <td className="border border-2 border-text p-2">{role.id}</td>
                                <td className="border border-2 border-text p-2">{role.name}</td>
                                <td className="border border-2 border-text p-2">
                                    <div className="flex justify-center space-x-4">
                                        {['Read', 'Write', 'Delete'].map((permission) => (
                                            <label key={permission} className="flex items-center space-x-2">
                                                <input
                                                    disabled
                                                    type="checkbox"
                                                    checked={role.permissions.includes(permission)}
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
                                        <button
                                            onClick={() => openEditModal(role)}
                                            className="bg-text text-primary px-2 py-1 rounded-md hover:opacity-75 transition duration-200"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteRole(role.id)}
                                            className="bg-text text-primary px-2 py-1 rounded-md shadow-md hover:opacity-75 transition duration-200"
                                        >
                                            <MdDelete />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Add/Edit */}
            <dialog ref={modalRef} className="p-6 rounded-md w-4/5 md:w-2/5">
                <p className="text-2xl text-text text-center font-bold mb-4">{modalAction === 'add' ? 'Add Role' : 'Edit Role'}</p>
                <div className="mb-4">
                    <label className="block text-md font-bold text-text">Role Name</label>
                    <input
                        type="text"
                        className="w-full border border-2 border-text p-2 rounded-md"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-lg text-text font-bold">Permissions</label>
                    <div className="flex space-x-4">
                        {['Read', 'Write', 'Delete'].map((permission) => (
                            <label key={permission} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={permissions.includes(permission)}
                                    onChange={() => {
                                        setPermissions(prev =>
                                            prev.includes(permission)
                                                ? prev.filter(p => p !== permission)
                                                : [...prev, permission]
                                        );
                                    }}
                                    className="form-checkbox"
                                />
                                <span className="text-text">{permission}</span>
                            </label>
                        ))}
                    </div>
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
            </dialog>
        </div>
    );
};

export default Roles;
