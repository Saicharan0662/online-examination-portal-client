import React, { useState } from 'react'
import { Navigate } from 'react-router';
import Navbar from '../components/Navbar';
import ExaminerDashBoard from './ExaminerDashBoard';
import StudentDashBoard from './StudentDashBoard';

const Dashboard = () => {

    const user = JSON.parse(localStorage.getItem('userData')) ?
        JSON.parse(localStorage.getItem('userData')).user : null;

    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            {!user && <Navigate to='/' />}
            <Navbar
                btnText='Logout'
                path='/'
                isLoading={isLoading}
            />
            {user?.userType === 'examiner' ? <ExaminerDashBoard user={user} setIsLoading={setIsLoading} isLoading={isLoading} />
                : <StudentDashBoard />}
        </>
    )
}

export default Dashboard