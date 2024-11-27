import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditUserModal from "../components/EditUserModel"; 




const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "Viewer", // Default role
        status: "Active", // Default status
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get("http://localhost:5000/api/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleSave = async (updatedUser) => {
        const token = localStorage.getItem("token");
        try {
            await axios.put(`http://localhost:5000/api/users/${updatedUser._id}`, updatedUser, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers((prev) => prev.map((u) => (u._id === updatedUser._id ? updatedUser : u)));
            setEditingUser(null);
        } catch (error) {
            console.error("Error updating user", error);
        }
    };

    const handleDelete = async (userId) => {
        const token = localStorage.getItem("token");
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers((prev) => prev.filter((user) => user._id !== userId));
        } catch (error) {
            console.error("Error deleting user", error);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", newUser, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers((prev) => [...prev, response.data]);
            setNewUser({ name: "", email: "", password: "", role: "Viewer", status: "Active" });
        } catch (error) {
            console.error("Error adding user", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

            {/* Add User Form */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h2 className="text-2xl mb-4">Add New User</h2>
                <form onSubmit={handleAddUser}>
                    <input
                        type="text"
                        placeholder="Name"
                        className="w-full p-2 mb-4 border rounded-lg"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full p-2 mb-4 border rounded-lg"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-4 border rounded-lg"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                    <select
                        className="w-full p-2 mb-4 border rounded-lg"
                        value={newUser.role}
                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    >
                        <option value="Viewer">Viewer</option>
                        <option value="Editor">Editor</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <select
                        className="w-full p-2 mb-4 border rounded-lg"
                        value={newUser.status}
                        onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300"
                    >
                        Add User
                    </button>
                </form>
            </div>

            <table className="table-auto w-full bg-white shadow rounded-lg">
                <thead>
                    <tr className="bg-gray-200 text-left">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-t">
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.role}</td>
                            <td className="px-4 py-2">
                                <span
                                    className={`px-2 py-1 rounded-full ${
                                        user.status === "Active" ? "bg-green-500" : "bg-red-500"
                                    } text-white`}
                                >
                                    {user.status}
                                </span>
                            </td>
                            <td className="px-4 py-2">
                                <button
                                    onClick={() => handleEdit(user)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(user._id)}
                                    className="ml-4 text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingUser && (
                <EditUserModal
                    user={editingUser}
                    onSave={handleSave}
                    onCancel={() => setEditingUser(null)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
