import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './User.css';
import { MdEdit, MdDelete } from 'react-icons/md';

export const userData = [
    { id: 1, name: 'Amit Patel', email: 'amit@gmail.com', role: 'Admin' },
    { id: 2, name: 'Neha Shah', email: 'neha@gmail.com', role: 'User' },
    { id: 3, name: 'Ravi Mehta', email: 'ravi@gmail.com', role: 'Moderator' },
    { id: 4, name: 'Sneha Joshi', email: 'sneha@gmail.com', role: 'User' },
    { id: 5, name: 'Vikas Kumar', email: 'vikas@gmail.com', role: 'User' },
];

const UserManagement = () => {
    const [users, setUsers] = useState(userData);
    const [editIndex, setEditIndex] = useState(null);

    const handleAddOrUpdateUser = (values, { resetForm }) => {
        if (editIndex !== null) {
            const updatedUsers = [...users];
            updatedUsers[editIndex] = { id: users[editIndex].id, ...values };
            setUsers(updatedUsers);
            setEditIndex(null);
        } else {
            const newUser = {
                id: users.length + 1,
                ...values,
            };
            setUsers([...users, newUser]);
        }
        resetForm();
    };

    const handleEdit = (index) => {
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedUsers = users.filter((_, i) => i !== index);
        setUsers(updatedUsers);
        setEditIndex(null);
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        role: Yup.string().required('Role is required'),
    });

    return (
        <div className="users-container">
            <Formik
                enableReinitialize
                initialValues={
                    editIndex !== null ? users[editIndex] : { name: '', email: '', role: '' }
                }
                validationSchema={validationSchema}
                onSubmit={handleAddOrUpdateUser}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {() => (
                    <Form className="user-form">
                        <div>
                            <Field name="name" placeholder="Full Name" />
                            <ErrorMessage name="name" component="div" className="error" />
                        </div>
                        <div>
                            <Field name="email" type="email" placeholder="Email" />
                            <ErrorMessage name="email" component="div" className="error" />
                        </div>
                        <div>
                            <Field name="role" as="select">
                                <option value="">Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                <option value="Agent">Agent</option>
                                <option value="Moderator">Moderator</option>
                            </Field>
                            <ErrorMessage name="role" component="div" className="error" />
                        </div>
                        <button type="submit">{editIndex !== null ? 'Update User' : 'Add User'}</button>
                    </Form>
                )}
            </Formik>

            {/* ==== User Cards ==== */}
            <div className="user-cards">
                {users.map((user, index) => (
                    <div className="user-card" key={user.id}>
                        <h3>{user.name}</h3>
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Role:</strong> {user.role}</p>
                        <div className="action-buttons1">
                            <MdEdit className="action-icon-edit" onClick={() => handleEdit(index)} />
                            <MdDelete className="action-icon-delete" onClick={() => handleDelete(index)} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserManagement;
