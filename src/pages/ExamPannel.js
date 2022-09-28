import React from 'react'
import { useParams } from 'react-router'
import Button from '@mui/material/Button';

const ExamPannel = () => {

    const { examID } = useParams();
    console.log(examID)

    return (
        <div className='min-h-screen w-full flex flex-col items-center'>
            <div className='flex w-full justify-between items-center px-8 bg-gray-200 ' style={{ height: "50px" }}>
                <h1 className='text-lg font-semibold'>{"Operating System"}</h1>
                <span className='text-lg font-normal bg-gray-300 px-6' style={{ height: "50px" }}>
                    <p className='relative top-2'>{"120"}</p>
                </span>
                <Button variant='contained' className='rounded-md' size='small' color='success' onClick={() => { }}>Submit</Button>
            </div>
            <div className='min-h-screen bg-gray-100 w-1/4 absolute left-0 pt-16 px-2' style={{ zIndex: -1 }}>
                <h2>Questions</h2>

            </div>
            <div className='min-h-screen w-3/4 absolute right-0' style={{ zIndex: -1 }}>

            </div>
        </div>
    )
}

export default ExamPannel