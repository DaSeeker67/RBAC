import React, { useState } from "react";
import axios from "axios";

const EditUserModal = ({ user, onSave, onCancel }) => {
    const [updatedUser, setUpdatedUser] = useState({
        name: user.name || '',
        email: user.email || '',
        role: user.role || 'Viewer',
        status: user.status || 'Active'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem('token'); // Changed from 'jwt_token'
            const response = await axios.put(`https://rbac-czit.onrender.com/api/users/${user._id}`, updatedUser, {
                headers: { 
                    'Authorization': `Bearer ${token}` 
                }
            });

            // Call onSave with the updated user
            onSave(response.data);
            
            // Reset loading state
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update user');
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                <button 
                    onClick={onCancel} // Use onCancel here
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                >
                    ✕
                </button>
                <h2 className="text-2xl font-bold mb-4">Edit User</h2>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={updatedUser.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={updatedUser.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={updatedUser.role}
                            onChange={handleChange}
                        >
                            <option value="Viewer">Viewer</option>
                            <option value="Editor">Editor</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                            Status
                        </label>
                        <select
                            id="status"
                            name="status"
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={updatedUser.status}
                            onChange={handleChange}
                        >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg 
                                       disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 text-gray-600 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;