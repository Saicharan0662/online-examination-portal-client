import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import '../axios';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import StudentRegistrationCard from '../components/StudentRegistrationCard';

const ExaminerResults = () => {
    const { examinerID } = useParams();

    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios(`/result/examiner/${examinerID}`)
            .then(res => {
                setResults(res?.data?.results)
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
                        <h1 className='text-xl font-bold'>Your exam registrations</h1>
                    </div>
                </div>
                <div className="my-6">
                    <h1 className='text-lg font-medium my-4'>Total exam registrations: {results.length}</h1>
                    <div className='flex gap-y-4 justify-around flex-wrap'>
                        {results && results.length > 0 && results.map((result, index) => {
                            return (
                                <StudentRegistrationCard
                                    result={result}
                                    index={index}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExaminerResults