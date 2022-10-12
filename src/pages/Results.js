import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios';
import '../axios';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar'
import ExamCard from '../components/ExamCard';
import ExamResultCard from '../components/ExamResultCard';

const Results = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [exams, setExams] = useState([])
    const { studentID } = useParams();

    useEffect(() => {
        setIsLoading(true)
        axios.get(`/result/student/${studentID}`)
            .then(res => {
                console.log(res.data.results[0])
                setExams(res.data.results)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response.data.msg)
                setIsLoading(false)
            })
    }, [])


    return (
        <div>
            <Navbar
                btnText='Logout'
                path='/'
                isLoading={isLoading}
            />
            <div className='min-h-screen w-full flex flex-col items-center bg-gray-100'>
                <Toaster />
                <div className='dashboard-width' >
                    <div className='h-40 flex items-end px-8 py-2 bg-blue-pattern rounded-b-md'>
                        <h1 className='text-xl font-bold'>Your Results</h1>
                    </div>

                    <div className="my-6">
                        <div className='flex gap-y-4 justify-around flex-wrap'>
                            {exams && exams.map((exam, index) => {
                                return (
                                    <ExamResultCard exam={exam} key={index} count={exam.count} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Results