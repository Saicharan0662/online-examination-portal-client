import React from 'react'
import { Navigate } from 'react-router';
import Navbar from '../components/Navbar';

const Dashboard = () => {

    const user = JSON.parse(localStorage.getItem('userData')) ?
        JSON.parse(localStorage.getItem('userData')).user : null

    return (
        <>
            {!user && <Navigate to='/' />}
            <div>
                <Navbar
                    btnText='Logout'
                    path='/'
                />
                <div>Welcome {user?.name}</div>
            </div>
        </>
    )
}

export default Dashboard