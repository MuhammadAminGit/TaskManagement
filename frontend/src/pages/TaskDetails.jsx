import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { Edit, Save, ArrowBack } from '@mui/icons-material';

const TaskDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '', dueDate: '' });
    const [loading, setLoading] = useState(true);

    const token = sessionStorage.getItem('token');

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const res = await axiosInstance.get(`/tasks/${id}`);
                setTask(res.data);
                setFormData({
                    name: res.data.name,
                    description: res.data.description,
                    dueDate: res.data.dueDate.split('T')[0],
                });
                setLoading(false);
            } catch (err) {
                console.error('Error fetching task:', err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchTask();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axiosInstance.put(`/tasks/${id}`, formData);
            setTask({ ...task, ...formData });
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating task:', err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            {loading ? (
                <CircularProgress />
            ) : (
                <Card className="w-full max-w-3xl shadow-lg rounded-md">
                    <CardContent>
                        <div className="flex items-center justify-between mb-4">
                            <Button
                                startIcon={<ArrowBack />}
                                onClick={() => navigate('/Home')}
                                variant="outlined"
                            >
                                Back
                            </Button>
                            {!isEditing && (
                                <Button
                                    startIcon={<Edit />}
                                    onClick={() => setIsEditing(true)}
                                    variant="contained"
                                    color="primary"
                                >
                                    Edit Task
                                </Button>
                            )}
                        </div>

                        {isEditing ? (
                            <>
                                <TextField
                                    fullWidth
                                    label="Task Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    margin="normal"
                                />
                                <TextField
                                    fullWidth
                                    label="Description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    margin="normal"
                                    multiline
                                    rows={3}
                                />
                                <TextField
                                    fullWidth
                                    type="date"
                                    label="Due Date"
                                    name="dueDate"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <div className="flex justify-end mt-4">
                                    <Button
                                        onClick={handleSave}
                                        startIcon={<Save />}
                                        variant="contained"
                                        color="success"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Typography variant="h5" className="font-bold mb-2">
                                    {task.name}
                                </Typography>
                                <Typography variant="body1" className="text-gray-600 mb-2">
                                    {task.description}
                                </Typography>
                                <Typography variant="body2" className="text-gray-500">
                                    Due Date: {new Date(task.dueDate).toLocaleDateString()}
                                </Typography>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default TaskDetails;
