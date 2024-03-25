import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Table, Td, Th} from "./results-table.styles";


const ResultsTable = () => {
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetchResults();
    }, []);

    const fetchResults = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/v1/core/student-courses/');
            setResults(response.data.results);
        } catch (error) {
            console.error('Error fetching results:', error);
        }
    };

    return (
        <div>
            <h2>Results List</h2>
            <Table>
                <thead>
                <tr>
                    <Th>Course</Th>
                    <Th>Student</Th>
                    <Th>Score</Th>
                </tr>
                </thead>
                <tbody>
                {results.map(result => (
                    <tr key={result.uuid}>
                        <Td>{result.courseData.title}</Td>
                        <Td>{`${result.studentData.firstName} ${result.studentData.familyName}`}</Td>
                        <Td>{result.score}</Td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ResultsTable;
