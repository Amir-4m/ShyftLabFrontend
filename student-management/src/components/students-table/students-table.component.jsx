import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {DeleteButton, Table, Td, Th} from "./students-table.styles";


const StudentsTable = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/v1/core/students/');
            setStudents(response.data.results);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleDelete = async (uuid) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/v1/core/students/${uuid}/`);
            setStudents(students.filter(student => student.uuid !== uuid));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    return (
        <div>
            <h2>Students List</h2>
            <Table>
                <thead>
                <tr>
                    <Th>Name & Family Name</Th>
                    <Th>DOB</Th>
                    <Th>Email</Th>
                    <Th>Delete</Th>
                </tr>
                </thead>
                <tbody>
                {students.map(student => (
                    <tr key={student.uuid}>
                        <Td>{`${student.firstName} ${student.familyName}`}</Td>
                        <Td>{student.dateOfBirth}</Td>
                        <Td>{student.email}</Td>
                        <Td>
                            <DeleteButton onClick={() => handleDelete(student.uuid)}>❌</DeleteButton>
                        </Td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};


export default StudentsTable;
