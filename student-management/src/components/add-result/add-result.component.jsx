import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ErrorMessage, Form, FormContainer, FormGroup, Label, Option, Select, SubmitButton} from "./add-result.styles";


const AddResult = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [score, setScore] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchStudents();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/v1/core/courses');
      setCourses(response.data.results);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/v1/core/students');
      setStudents(response.data.results);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCourse || !selectedStudent || !score) {
      setError('Please select course, student, and score');
      return;
    }

    setError(null);

    try {
      await axios.post('http://127.0.0.1:8000/v1/core/student-courses/', {
        course: selectedCourse,
        student: selectedStudent,
        score
      });

      setSelectedCourse('');
      setSelectedStudent('');
      setScore('');

      alert('Result added successfully');
    } catch (error) {
      console.error('Error adding result:', error);
      setError('Error adding result');
    }
  };

  return (
    <FormContainer>
      <h2>Add New Result</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Course Name:</Label>
          <Select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <Option value="">Select Course</Option>
            {courses.map(course => (
              <Option key={course.uuid} value={course.uuid}>{course.title}</Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Student Name:</Label>
          <Select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
          >
            <Option value="">Select Student</Option>
            {students.map(student => (
              <Option key={student.uuid} value={student.uuid}>{`${student.firstName} ${student.familyName}`}</Option>
            ))}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label>Score:</Label>
          <Select
            value={score}
            onChange={(e) => setScore(e.target.value)}
          >
            <Option value="">Select Score</Option>
            <Option value="A">A</Option>
            <Option value="B">B</Option>
            <Option value="C">C</Option>
            <Option value="D">D</Option>
            <Option value="E">E</Option>
            <Option value="F">F</Option>
          </Select>
        </FormGroup>
        <SubmitButton type="submit">Submit</SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </FormContainer>
  );
};

export default AddResult;
