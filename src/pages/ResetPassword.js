import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import axios from 'axios';
import '../axios';
import Navbar from '../components/Navbar';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [userType, setUserType] = useState('student')
    const [isLoading, setIsLoading] = useState(false)

    const resetPassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert('Password does not match')
            return;
        }
        setIsLoading(true)
        axios.post(`/auth/reset-password/`, {
            newPassword,
            clientToken: token,
            userType
        }).then(res => {
            console.log(res.data.msg)
            setIsLoading(false)
            alert(res.data.msg)
            navigate('/login')
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })

        setNewPassword('')
        setconfirmPassword('')
    }

    return (
        <div>
            <Navbar
                showBtn={false}
                isLoading={isLoading}
            />
            <div className='flex flex-col justify-center items-center md:bg-gray-100' style={{ height: '93vh' }}>
                <div className='md:p-8 bg-white rounded-md'>
                    <h2 className='text-xl mx-2 md:text-2xl font-semibold'>Reset Password</h2>
                    <form onSubmit={resetPassword} className='flex flex-col justify-left items-center py-8 px-6 md:p-10 gap-y-8'>
                        <TextField type={'password'} required fullWidth id="outlined-basic" label="Password" variant="outlined" size='small' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        <TextField type={'password'} required fullWidth id="outlined-basic" label="Confirm Password" variant="outlined" size='small' value={confirmPassword} onChange={e => setconfirmPassword(e.target.value)} />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={['student', 'examiner']}
                            sx={{ width: 300 }}
                            value={userType}
                            defaultValue={'student'}
                            onChange={(e, values) => setUserType(values)}
                            renderInput={(params) => <TextField {...params} label="Category" />}
                            size='small'
                        />
                        <Button type='submit' variant="contained" size='small' className='self-start'>Reset Password</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword