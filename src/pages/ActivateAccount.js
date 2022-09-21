import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../axios';
import toast, { Toaster } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router'

const ActivateAccount = () => {
    const { userType, token } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

    const activateAccount = () => {
        setIsLoading(true)
        axios.post(`/auth/activate`, {
            clientToken: token,
            userType
        }).then(res => {
            toast.success(res.data.msg)
            setIsLoading(false)
            navigate('/login')
        }).catch(err => {
            toast.error(err.response.data.msg)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        activateAccount()
    }, [])


    return (
        <>
            <Toaster />
            <div className='min-h-screen justify-center items-center'>{isLoading ? "Loading..." : "Done"}</div>
        </>
    )
}

export default ActivateAccount