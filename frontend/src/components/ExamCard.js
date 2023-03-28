import React from 'react'
import { useNavigate } from 'react-router'
import moment from 'moment/moment'
import axios from 'axios'
import '../axios'
import Tags from './Tags'
import toast, { Toaster } from 'react-hot-toast';
import deleteIcon from '../asserts/icons/deleteIcon.png'
import editIcon from '../asserts/icons/edit.png'


const ExamCard = ({ exam, setIsLoading, getExams, student = false }) => {

    const navigate = useNavigate();
    const deleteExam = (examID) => {
        setIsLoading(true)
        axios.delete(`/exam/${examID}`)
            .then(res => {
                toast.success('Exam deleted successfully')
                getExams()
                setIsLoading(false)
            })
            .catch(err => {
                toast.error(err.response.data.msg)
                setIsLoading(false)
            })
    }

    const registerStudent = () => {
        setIsLoading(true)
        axios.post(`/exam/register-student/${exam._id}`)
            .then(res => {
                setIsLoading(false)
                toast.success('Registered successfully')
                getExams()
            })
            .catch(err => {
                setIsLoading(false)
                toast.error(err.response.data.msg)
            })
    }

    return (
        <div className='rounded-md px-6 bg-white py-3 relative exam-card-width'>
            <Toaster />
            <h1 className='text-lg font-semibold truncate ' style={{ width: '85%' }}>{exam.name.toUpperCase()}</h1>
            <p className='font-normal font-tiny -mt-1 mb-2'>{exam.description}</p>
            <div className=''>
                {student ?
                    <button className='student-exam-card-btn' onClick={() => {
                        if (exam.isRegistered) {
                            let date = new Date().toISOString()
                            if (date < exam.time) {
                                toast.error('Exam has not been started yet')
                                return toast(`Exam will start at ${moment(exam.time).format('DD, MMMM HH:mm')}`)
                            }
                            if (date > moment(exam.time).add(exam.duration, 'minutes').toISOString()) {
                                return toast.error('Exam has been finished')
                            }
                            navigate(`/exam/${exam._id}`)
                        }
                        else registerStudent()
                    }}>
                        {exam.isRegistered ? "Attempt Exam" : "Register"}
                    </button>
                    :
                    <>
                        <img src={deleteIcon} alt="delete" className='h-5 absolute top-3 right-2 cursor-pointer'
                            onClick={() => deleteExam(exam._id)}
                        />
                        <img src={editIcon} alt="edit" className='h-5 absolute top-3 right-10 cursor-pointer'
                            onClick={() => navigate(`/edit-exam/${exam._id}`)}
                        />
                    </>}
            </div>
            <div className='flex justify-between'>
                <div>
                    {exam.topics.map((tag, index) => {
                        return (
                            <span key={index} className='mr-1'>
                                <Tags tag={tag} />
                            </span>
                        )
                    })}
                </div>
                <div className=''>
                    <span className='rounded-md px-2 py-1 bg-green-100 text-green-500 text-xs border-2 border-green-300 mx-2'>
                        {exam.duration} minutes
                    </span>
                    <span className='rounded-md px-2 py-1 bg-green-200 text-green-500 text-xs border-2 border-green-300'>
                        Schedule: {moment(exam.time).format('DD, MMMM HH:mm')}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ExamCard