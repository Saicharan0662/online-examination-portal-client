import React, { useEffect, useState, useRef } from 'react'
import { useParams, Navigate } from 'react-router'
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment/moment'
import axios from 'axios'
import { Button } from '@mui/material';
import Navbar from '../components/Navbar';
import Tags from '../components/Tags';

const Exam = () => {

    const { examID } = useParams()
    const customWindowRef = useRef(null)
    const [exam, setExam] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem('userData')) ?
        JSON.parse(localStorage.getItem('userData')).user : null;

    useEffect(() => {
        setIsLoading(true)
        axios.get(`/exam/meta-data/${examID}`)
            .then(res => {
                console.log(res.data)
                setExam(res.data.exam[0])
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response.data.msg)
                setIsLoading(false)
            })
    }, [examID])

    const handleBeforeUnload = (e) => {
        e.preventDefault();
        return e.returnValue = ""
    }

    const disableReload = e => {
        if (e.which === 116) {
            e.preventDefault();
        }
        if (e.which === 82 && e.ctrlKey) {
            e.preventDefault();
        }
    }

    const cretateNewWindow = () => {
        let params = `scrollbars=no,resizable=no,location=no,toolbar=no,menubar=no,topbar=no,left=0,top=0,popup=yes`;
        customWindowRef.current = window.open(`/exam/${exam._id}`, 'test', params)
        customWindowRef.current.resizeTo(window.screen.width, window.screen.height);
        customWindowRef.current.addEventListener('beforeunload', handleBeforeUnload);
        customWindowRef.current.addEventListener('keydown', disableReload)
    }

    useEffect(() => {
        return () => {
            if (customWindowRef.current) {
                customWindowRef.current.removeEventListener('beforeunload', handleBeforeUnload);
                customWindowRef.current.removeEventListener('keydown', disableReload);
                customWindowRef.current.close()
            }
        }
    }, [])

    if (!user) {
        return <Navigate to='/' />
    }

    return (
        <>
            <Navbar
                btnText='Logout'
                path='/'
                isLoading={isLoading}
            />
            <Toaster />
            <div className='min-h-screen w-full flex flex-col items-center bg-gray-100'>
                <div className='dashboard-width '>
                    <div className='mt-16 bg-white py-5 px-16'>
                        <h1 className='text-3xl font-bold text-center mt-10 mb-5'>Exam Details</h1>
                        <div className='flex flex-col items-start justify-center '>
                            <p className='text-lg font-semibold'>{exam?.name}</p>
                            <p className='font-normal font-tiny'>{exam?.description}</p>
                            <div>
                                {exam?.topics.map((tag, index) => {
                                    return (
                                        <span key={index} className='mr-1'>
                                            <Tags tag={tag} />
                                        </span>
                                    )
                                })}
                            </div>
                            <div className='mt-2'>
                                <div className='flex w-screen items-center'>
                                    <div className=' w-1/2'>
                                        <p className='leading-loose'>Duration: {exam?.duration} minutes</p>
                                        <p className='font-semibold leading-loose'>Starts at:
                                            <span className='text-green-400'> {moment(exam?.time).format('DD, MMMM HH:mm')}</span>
                                        </p>
                                        <p className='font-semibold leading-loose'>Last updated:
                                            <span className='text-green-400'> {moment(exam?.updatedAt).format('DD, MMMM HH:mm')}</span>
                                        </p>
                                    </div>
                                    <div className='w-1/2'>
                                        <Button
                                            variant='contained'
                                            color='success'
                                            disabled={user.userType !== 'student'}
                                            onClick={() => {
                                                let date = new Date().toISOString()
                                                if (date < exam.time) {
                                                    toast.error('Exam has not been started yet')
                                                    return toast(`Exam will start at ${moment(exam.time).format('DD, MMMM HH:mm')}`)
                                                }
                                                if (date > moment(exam.time).add(exam.duration, 'minutes').toISOString()) {
                                                    return toast.error('Exam has been finished')
                                                }

                                                cretateNewWindow()
                                            }}
                                        >
                                            {user.userType !== 'student' ? "Examiner can not take exam" : "Start Exam"}
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Exam