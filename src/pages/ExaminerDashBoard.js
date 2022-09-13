import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../axios';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ExamCard from '../components/ExamCard';

const ExaminerDashBoard = ({ user }) => {

    const [exams, setExams] = useState([])

    const getExams = () => {
        axios.get('/exam')
            .then(res => {
                setExams(res.data.exams)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        getExams();
    }, [])


    return (
        <div className='min-h-screen w-full flex flex-col items-center bg-gray-100'>
            <div className='dashboard-width' >
                <div className='h-40 flex items-end px-8 py-2 bg-blue-pattern rounded-b-md'>
                    <h1 className='text-xl font-bold'>Welcome back {user.name}!!</h1>
                </div>
                <div className='dashboard-content'>
                    <div className=' my-6'>
                        <div className='flex justify-between'>
                            <h1 className='text-xl font-bold'>Dashboard</h1>
                            <Button variant='contained' className='rounded-md' size='small' color='success' startIcon={<AddIcon />}>create exam</Button>
                        </div>
                    </div>
                    <div className='my-6'>
                        <h1 className='text-lg font-bold mb-6'>Your Exams</h1>
                        <div className='flex gap-y-4 justify-around flex-wrap'>
                            {exams.map((exam, index) => {
                                return (
                                    <ExamCard exam={exam} key={index} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExaminerDashBoard