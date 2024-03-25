import React, {useState} from 'react';
import axios from 'axios';
import {ErrorMessage, Form, FormContainer, FormGroup, Input, Label, SubmitButton} from "./add-course-styles";


const AddCourse = () => {
    const [courseName, setCourseName] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!courseName) {
            setError('Course name is required');
            return;
        }

        setError(null);

        try {
            await axios.post('http://127.0.0.1:8000/v1/core/courses/', {
                title: courseName
            });

            setCourseName('');

            alert('Course added successfully');
        } catch (error) {
            console.error('Error adding course:', error);
            setError('Error adding course');
        }
    };

    return (
        <FormContainer>
            <h2>Add New Course</h2>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Course Name:</Label>
                    <Input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                    />
                </FormGroup>
                <SubmitButton type="submit">Submit</SubmitButton>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Form>
        </FormContainer>
    );
};

export default AddCourse;
