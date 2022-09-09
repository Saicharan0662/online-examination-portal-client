import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../axios';
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
            console.log(res.data)
            setIsLoading(false)
            alert(res.data)
            navigate('/login')
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })
    }

    useEffect(() => {
        activateAccount()
    }, [])


    return (
        <div className='min-h-screen justify-center items-center'>{isLoading ? "Loading..." : "Done"}</div>
    )
}

export default ActivateAccount