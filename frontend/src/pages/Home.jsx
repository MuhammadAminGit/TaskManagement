import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TrashIcon, EyeIcon, PlusCircleIcon } from '@heroicons/react/24/solid';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '', dueDate: '' });
    const navigate = useNavigate();

        // Get token from sessionStorage
        const token = sessionStorage.getItem('token');

        // Create Axios instance with Authorization header
        const axiosInstance = axios.create({
            baseURL: 'http://localhost:5000/api',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    
        // Fetch tasks
        useEffect(() => {
            const fetchTasks = async () => {
                try {
                    const res = await axiosInstance.get('/tasks');
                    setTasks(res.data);
                } catch (err) {
                    console.error('Error fetching tasks:', err.response?.data?.message || err.message);
                }
            };
            fetchTasks();
        }, []);

    // Fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axiosInstance.get('/tasks');
                setTasks(res.data);
            } catch (err) {
                console.error('Error fetching tasks:', err.response?.data?.message || err.message);
            }
        };
        fetchTasks();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/tasks', formData);
            window.location.reload();
        } catch (err) {
            console.error('Error creating task:', err.response?.data?.message || err.message);
        }
    };

    // Delete task
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/tasks/${id}`);
            setTasks(tasks.filter(task => task._id !== id));
        } catch (err) {
            console.error('Error deleting task:', err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="container mx-auto h-screen p-6 bg-gray-100">
            {/* Header */}
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">📋 Task Dashboard</h1>
            
            {/* Task Form */}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Task</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Task Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleChange}
                        className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                </div>
                <button
                    type="submit"
                    className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    <PlusCircleIcon className="h-5 w-5" />
                    Add Task
                </button>
            </form>

            {/* Task Table */}
            <div className="bg-white shadow-md rounded-lg p-4 h-3/4 overflow-auto">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Tasks</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-50">
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Description</th>
                            <th className="p-3 text-left">Due Date</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map(task => (
                                <tr key={task._id} className="border-b hover:bg-gray-100">
                                    <td className="p-3">{task.name}</td>
                                    <td className="p-3">{task.description}</td>
                                    <td className="p-3">
                                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="p-3 flex justify-center gap-2">
                                        <button
                                            onClick={() => navigate(`/tasks/${task._id}`)}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            <EyeIcon className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(task._id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <TrashIcon className="h-5 w-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-500">
                                    No tasks available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
