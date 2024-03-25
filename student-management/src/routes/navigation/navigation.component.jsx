import {Fragment} from 'react';
import {Outlet} from 'react-router-dom';
import {NavigationContainer, NavLinks, NavLink} from './navigation.styles';

const Navigation = () => {
    return (
        <Fragment>
            <NavigationContainer>
                <NavLinks>
                    <NavLink className='nav-link' to='/'>Home</NavLink>
                    <NavLink className='nav-link' to='/add-student'>Add New Students</NavLink>
                    <NavLink className='nav-link' to='/students'>Students List</NavLink>
                    <NavLink className='nav-link' to='/add-course'>Add New Courses</NavLink>
                    <NavLink className='nav-link' to='/courses'>Courses List</NavLink>
                    <NavLink className='nav-link' to='/add-result'>Add New Results</NavLink>
                    <NavLink className='nav-link' to='/results'>Results List</NavLink>
                </NavLinks>
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    );
}
export default Navigation;