import React from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import '../axios'
import Tags from './Tags'
import toast, { Toaster } from 'react-hot-toast';
import deleteIcon from '../asserts/icons/deleteIcon.png'
import editIcon from '../asserts/icons/edit.png'


const ExamResultCard = ({ exam, count }) => {

    const navigate = useNavigate();

    return (
        <div className='rounded-md px-6 bg-white py-3 relative exam-card-width'>
            <Toaster />
            <h1 className='text-lg font-semibold truncate mb-4' style={{ width: '85%' }}>{exam.name.toUpperCase()}</h1>
            <div>
                {exam.topics.map((tag, index) => {
                    return (
                        <span key={index} className='mr-1'>
                            <Tags tag={tag} />
                        </span>
                    )
                })}
                <span className='mr-3'>
                    <Tags tag={exam.score} />
                </span>
            </div>
            <div className=''>
                <button className='student-exam-card-btn' onClick={() => {
                    navigate(`/exam/result/${exam._id}`)
                }}>
                    View Result
                </button>
            </div>
            <span className='rounded-md px-2 py-1 bg-green-100 text-green-500 text-xs absolute bottom-3 right-2 border-2 border-green-300'>
                {`${count} ${count > 1 ? 'Attempts' : 'Attempt'}`}
            </span>
        </div>
    )
}

export default ExamResultCard