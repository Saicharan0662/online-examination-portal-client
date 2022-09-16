import React from 'react'
import axios from 'axios'
import '../axios'
import Tags from './Tags'
import deleteIcon from '../asserts/icons/deleteIcon.png'
import editIcon from '../asserts/icons/edit.png'


const ExamCard = ({ exam, setIsLoading, getExams }) => {

    const deleteExam = (examID) => {
        setIsLoading(true)
        axios.delete(`/exam/${examID}`)
            .then(res => {
                console.log(res)
                getExams()
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }

    return (
        <div className='rounded-md px-6 bg-white py-3 relative exam-card-width'>
            <h1 className='text-lg font-semibold truncate ' style={{ width: '85%' }}>{exam.name.toUpperCase()}</h1>
            <p className='font-normal font-tiny -mt-1 mb-2'>{exam.description}</p>
            <div>
                {exam.topics.map((tag, index) => {
                    return (
                        <span key={index} className='mr-1'>
                            <Tags tag={tag} />
                        </span>
                    )
                })}
            </div>
            <div>
                <img src={deleteIcon} alt="delete" className='h-5 absolute top-3 right-2 cursor-pointer'
                    onClick={() => deleteExam(exam._id)}
                />
                <img src={editIcon} alt="edit" className='h-5 absolute top-3 right-10 cursor-pointer'
                />
            </div>
            <span className='rounded-md px-2 py-1 bg-green-100 text-green-500 text-xs absolute bottom-3 right-2 border-2 border-green-300'>
                {exam.duration} minutes
            </span>
        </div>
    )
}

export default ExamCard