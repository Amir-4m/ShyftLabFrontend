import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {DeleteButton, Table, Td, Th} from "./courses-table.styles";


const CoursesTable = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/v1/core/courses/');
            setCourses(response.data.results);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleDelete = async (uuid) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/v1/core/courses/${uuid}/`);
            setCourses(courses.filter(course => course.uuid !== uuid));
        } catch (error) {
            console.error('Error deleting course:', error);
        }
    };

    return (
        <div>
            <h2>Courses List</h2>
            <Table>
                <thead>
                <tr>
                    <Th>Course Name</Th>
                    <Th>Delete</Th>
                </tr>
                </thead>
                <tbody>
                {courses.map(course => (
                    <tr key={course.uuid}>
                        <Td>{course.title}</Td>
                        <Td>
                            <DeleteButton onClick={() => handleDelete(course.uuid)}>❌</DeleteButton>
                        </Td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CoursesTable;
