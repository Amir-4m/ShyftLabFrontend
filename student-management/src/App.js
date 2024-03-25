import {Routes, Route} from 'react-router-dom';
import './App.css';
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import AddStudent from "./components/add-student/add-student-component";
import StudentsTable from "./components/students-table/students-table.component";
import AddCourse from "./components/add-course/add-course.component";
import CoursesTable from "./components/courses-table/courses-table.component";
import AddResult from "./components/add-result/add-result.component";
import ResultsTable from "./components/results-table/results-table.component";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Navigation/>}>
                <Route index element={<Home/>}/>
                <Route path='add-student' element={<AddStudent/>}/>
                <Route path='students' element={<StudentsTable/>}/>
                <Route path='add-course' element={<AddCourse/>}/>
                <Route path='courses' element={<CoursesTable/>}/>
                <Route path='add-result' element={<AddResult/>}/>
                <Route path='results' element={<ResultsTable/>}/>
            </Route>
        </Routes>
    );
}

export default App;
