import React from 'react'
import { useNavigate } from 'react-router'
import Tags from './Tags'

const StudentRegistrationCard = ({ exam, count, studentID, index }) => {

    const navigate = useNavigate();
    return (
        <div className='rounded-md px-6 bg-white py-3 relative mx-4 student-card-width' >
            <h1 className='text-lg font-semibold truncate mb-4' style={{ width: '85%' }}>{exam.name.toUpperCase()}</h1>
            <div>
                {exam?.topics.map((tag, index) => {
                    return (
                        <span key={index} className='mr-1'>
                            <Tags tag={tag} />
                        </span>
                    )
                })}
            </div>
            <div className=''>
                <button className='student-exam-card-btn' onClick={() => {
                    navigate(`/result/exam/${exam._id}/${studentID}`)
                }}>
                    View Results
                </button>
            </div>
            <span className='rounded-md px-2 py-1 bg-green-100 text-green-500 text-xs absolute bottom-3 right-2 border-2 border-green-300'>
                {`${count} ${count > 1 ? 'Attempts' : 'Attempt'}`}
            </span>
        </div>
    )
}

export default StudentRegistrationCard