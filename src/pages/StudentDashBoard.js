import React, { useEffect } from 'react';
import axios from 'axios';
import '../axios'
import toast, { Toaster } from 'react-hot-toast';

const StudentDashBoard = ({ user, isLoading, setIsLoading }) => {

    const getExams = () => {
        setIsLoading(true)
        axios.get('/exam/get-exams/student')
            .then(res => {
                console.log(res)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response.data.msg)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getExams();
    }, [])


    return (
        <div className='min-h-screen w-full flex flex-col items-center bg-gray-100'>
            <Toaster />
            <div className='dashboard-width' >
                <div className='h-40 flex items-end px-8 py-2 bg-blue-pattern rounded-b-md'>
                    <h1 className='text-xl font-bold'>Welcome back {user.name}!!</h1>
                </div>
            </div>
        </div>
    )
}

export default StudentDashBoard