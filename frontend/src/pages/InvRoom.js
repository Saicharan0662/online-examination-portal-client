import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import ProctorCard from '../components/ProctorCard';

const InvRoom = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState(null)

    const getData = () => {
        setIsLoading(true)
        axios.get('/proctor/data')
            .then(res => {
                // console.log(res.data.data)
                setData(res.data.data)
                setIsLoading(false)
            })
            .catch(err => {
                toast.error(err.response.data.msg)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        getData()
        const intervalId = setInterval(() => {
            getData()
        }, 5 * 1000)

        return () => {
            clearInterval(intervalId)
        }
    }, [])

    return (
        <>
            <Navbar
                btnText='Logout'
                path='/'
                isLoading={isLoading}
            />
            <div className='min-h-screen w-full flex flex-col items-center bg-gray-100'>
                <Toaster />
                <div className='dashboard-width'>
                    {data && data.map((item, index) => {
                        return (
                            <ProctorCard
                                key={index}
                                examName={item.examDetails[0].name}
                                examDes={item.examDetails[0].description}
                                studentName={item.username}
                                studentEmail={item.useremail}
                                leftTurnCount={item.left_turn_count}
                                rightTurnCount={item.right_turn_count}
                                maxLeftDur={item.max_left_turn_duration}
                                maxRightDur={item.max_right_turn_duration}
                                movedOutOfFrame={item.moved_out_of_frame}
                                isSubmitted={item.is_submitted}
                                lastUpdated={item.timestamp}
                            />
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default InvRoom