import React from 'react'
import moment from 'moment'

const ProctorCard = ({ examName, examDes, studentName, studentEmail, leftTurnCount, rightTurnCount, maxLeftDur, maxRightDur, movedOutOfFrame, isSubmitted, lastUpdated }) => {



    return (
        <div className='m-4 p-3 bg-white rounded-md w-3/4'>
            <div className='flex flex-col justify-between'>
                <div className='text-center'>
                    <p className='text-xl font-bold'>{examName}</p>
                    <p className='text-sm text-gray-500'>{examDes}</p>
                </div>
                <div className='mt-2'>
                    <p className='text-sm font-semibold'>Student Name: {studentName}</p>
                    <p className='text-sm font-semibold'>Student Email: {studentEmail}</p>
                </div>
                <div className="mt-4 px-2">
                    <h4 className='font-bold'>Proctor Data</h4>
                    <div>
                        <p className='text-sm font-semibold'>Left turn: {leftTurnCount} </p>
                        <p className='text-sm font-semibold'>Max. Left Turn Duration: {maxLeftDur}s </p>
                        <p className='text-sm font-semibold'>Right turn: {rightTurnCount} </p>
                        <p className='text-sm font-semibold'>Max. Right Turn Duration: {maxRightDur}s </p>
                        <p className='text-sm font-semibold'>Moved Out Of Frame: {movedOutOfFrame ? <span className='text-green-400'>True</span> : <span className='text-red-400'>False</span>} </p>
                        <p className='text-sm font-semibold'>Submitted: {isSubmitted ? <span className='text-green-400'>True</span> : <span className='text-red-400'>False</span>} </p>
                        <p className='text-sm font-semibold'>Last updated: {moment.utc(lastUpdated, "YYYY-MM-DD HH").local().format('YYYY-MMM-DD h:mm A')} </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProctorCard