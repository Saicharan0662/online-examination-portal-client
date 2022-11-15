import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import '../axios';
import ExamCard from '../components/ExamCard';
import toast, { Toaster } from 'react-hot-toast';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const ExaminerDashBoard = ({ user, isLoading, setIsLoading }) => {

    const navigate = useNavigate()
    const [exams, setExams] = useState([])

    const getExams = () => {
        setIsLoading(true)
        axios.get('/exam')
            .then(res => {
                setExams(res.data.exams)
                setIsLoading(false)
            })
            .catch(err => {
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
                <div className='dashboard-content'>
                    <div className=' my-6'>
                        <div className='flex justify-between'>
                            <h1 className='text-xl font-bold'>Dashboard</h1>
                            <Button variant='contained' className='rounded-md' size='small' color='success' startIcon={<AddIcon />} onClick={() => navigate('/create-exam')}>Create exam</Button>
                            <Button variant='contained' className='rounded-md' size='small' color='secondary' onClick={() => navigate(`/result/examiner/${user.userID}`)}>Results</Button>
                        </div>
                    </div>
                    <div className='my-6'>
                        <h1 className='text-lg font-bold mb-6'>Your Exams</h1>
                        <div className='flex gap-y-4 justify-around flex-wrap'>
                            {exams.map((exam, index) => {
                                return (
                                    <ExamCard exam={exam} key={index} setIsLoading={setIsLoading} getExams={getExams} />
                                )
                            })}
                            {isLoading && exams?.length === 0 && <p>Loading...</p>}
                            {!isLoading && exams?.length === 0 &&
                                <div className=' mt-16'>
                                    <p className='text-xl font-semibold'>No Exams Found</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExaminerDashBoard