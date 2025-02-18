import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchAssets, addAsset, updateAsset, deleteAsset } from "../api";

const AssetManagement = () => {
    const queryClient = useQueryClient();
    const { data: assets, isLoading } = useQuery("assets", fetchAssets);

    const addMutation = useMutation(addAsset, {
        onSuccess: () => queryClient.invalidateQueries("assets"),
    });

    const updateMutation = useMutation(updateAsset, {
        onSuccess: () => queryClient.invalidateQueries("assets"),
    });

    const deleteMutation = useMutation(deleteAsset, {
        onSuccess: () => queryClient.invalidateQueries("assets"),
    });

    const [formData, setFormData] = useState({ id: null, name: "", type: "", value: "", description: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            updateMutation.mutate(formData);
        } else {
            addMutation.mutate(formData);
        }
        setFormData({ id: null, name: "", type: "", value: "", description: "" });
    };

    const handleEdit = (asset) => {
        setFormData(asset);
    };

    if (isLoading) return <p className="text-center text-lg font-semibold text-gray-600">Loading assets...</p>;

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">📊 Asset Management</h2>

            {/* Asset Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                <input type="text" name="name" placeholder="🏷️ Name" className="input input-bordered w-full"
                    value={formData.name} onChange={handleChange} required />
                <input type="text" name="type" placeholder="📂 Type" className="input input-bordered w-full"
                    value={formData.type} onChange={handleChange} required />
                <input type="number" name="value" placeholder="💲 Value" className="input input-bordered w-full"
                    value={formData.value} onChange={handleChange} required />
                <textarea name="description" placeholder="📝 Description" className="textarea textarea-bordered w-full col-span-2"
                    value={formData.description} onChange={handleChange} required />
                <button type="submit" className={`btn w-full col-span-2 ${formData.id ? "btn-info" : "btn-primary"}`}>
                    {formData.id ? "Update Asset" : "Add Asset"}
                </button>
            </form>

            {/* Assets Table */}
            <div className="overflow-x-auto mt-6">
                <table className="table w-full table-zebra">
                    <thead>
                        <tr className="bg-gray-300">
                            <th>Name</th>
                            <th>Type</th>
                            <th>Value</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets?.map((asset) => (
                            <tr key={asset.id} className="hover:bg-gray-100">
                                <td>{asset.name}</td>
                                <td>{asset.type}</td>
                                <td>${asset.value}</td>
                                <td>
                                    <button onClick={() => handleEdit(asset)} className="btn btn-info btn-sm mr-2">✏️ Edit</button>
                                    <button onClick={() => deleteMutation.mutate(asset.id)} className="btn btn-error btn-sm">🗑️ Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetManagement;
