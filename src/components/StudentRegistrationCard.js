import React from 'react'
import { useNavigate } from 'react-router'
import Tags from './Tags'
import moment from 'moment/moment';

const StudentRegistrationCard = ({ result, index }) => {

    const navigate = useNavigate();
    return (
        <div className='rounded-md px-6 bg-white py-3 relative mx-4 student-card-width' >
            <div className='my-4'>
                <h1 className='text-sm font-semibold truncate' style={{ width: '85%' }}>Exam name: <span style={{ color: 'gray' }}>{` ${result?.examDetails[0]?.name}`}</span></h1>
                <h1 className='text-sm font-semibold truncate' style={{ width: '85%' }}>Student name: <span style={{ color: 'gray' }}>{` ${result?.studentDetails[0]?.name}`}</span></h1>
                <h1 className='text-sm font-semibold truncate' style={{ width: '85%' }}>Student email: <span style={{ color: 'gray' }}>{` ${result?.studentDetails[0]?.email}`}</span></h1>
                <h1 className='text-sm font-semibold truncate' style={{ width: '85%' }}>Score: <Tags tag={result.score} /></h1>
            </div>
            <div>
                {result?.examDetails[0]?.topics.map((tag, index) => {
                    return (
                        <span key={index} className='mr-1'>
                            <Tags tag={tag} />
                        </span>
                    )
                })}
            </div>
            <div className=''>
                <button className='student-exam-card-btn' onClick={() => {
                    navigate(`/exam/result/${result?._id}`)
                }}>
                    View Results
                </button>
            </div>
            <span className='rounded-md px-2 py-1 bg-green-100 text-green-500 text-xs absolute bottom-3 right-2 border-2 border-green-300'>
                {`Attempted on: ${moment(result?.createdAt).format('MMM Do YY')}`}
            </span>
        </div>
    )
}

export default StudentRegistrationCard