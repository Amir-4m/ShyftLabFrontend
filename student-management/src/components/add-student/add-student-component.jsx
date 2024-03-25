import React, {useState} from 'react';
import {ErrorMessage, FormContainer, FormGroup, Input, Label, SubmitButton, Form} from './add-student.styles'
import axios from "axios";

const AddStudent = () => {
    const [firstName, setFirstName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !familyName || !dateOfBirth || !email) {
            setError('All fields are required');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Invalid email address');
            return;
        }

        const dob = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        if (age < 10) {
            setError('Student must be at least 10 years old');
            return;
        }

        setError(null);

        try {
            // Send data to API
            await axios.post('http://127.0.0.1:8000/v1/core/students/', {
                firstName,
                familyName,
                dateOfBirth,
                email
            });

            // Clear fields
            setFirstName('');
            setFamilyName('');
            setDateOfBirth('');
            setEmail('');

            alert('Student added successfully');
        } catch (error) {
            console.error('Error adding student:', error);
            setError('Error adding student');
        }
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <FormContainer>
            <h2>Add Student</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>First Name:</Label>
                    <Input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Family Name:</Label>
                    <Input
                        type="text"
                        value={familyName}
                        onChange={(e) => setFamilyName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Date of Birth:</Label>
                    <Input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Email Address:</Label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>
                <SubmitButton type="submit">Submit</SubmitButton>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Form>
        </FormContainer>
    );
};

export default AddStudent;
