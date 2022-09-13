import React from 'react'
import { Navigate } from 'react-router';
import Navbar from '../components/Navbar';
import ExaminerDashBoard from './ExaminerDashBoard';
import StudentDashBoard from './StudentDashBoard';

const Dashboard = () => {

    const user = JSON.parse(localStorage.getItem('userData')) ?
        JSON.parse(localStorage.getItem('userData')).user : null

    return (
        <>
            {!user && <Navigate to='/' />}
            {/* <div> */}
            <Navbar
                btnText='Logout'
                path='/'
            />
            {user?.userType === 'examiner' ? <ExaminerDashBoard user={user} />
                : <StudentDashBoard />}
            {/* </div> */}
        </>
    )
}

export default Dashboard