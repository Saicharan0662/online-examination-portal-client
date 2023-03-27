import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import '../axios';
import axios from 'axios';
import Navbar from '../components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';

const Login = () => {

    const navigate = useNavigate();
    const [input, setInput] = useState({ email: '', password: '', userType: "student" });
    const [isLoading, setIsLoading] = useState(false);

    const login = e => {
        e.preventDefault();
        if (!input.email || !input.password) {
            toast.error('Please fill all the fields');
            return;
        }
        setIsLoading(true)
        axios.post(`/auth/login`, {
            ...input
        }).then(res => {
            localStorage.setItem('userData', JSON.stringify(res.data))
            setIsLoading(false)
            toast.success('Login success')
            navigate('/dashboard')
        }).catch(err => {
            toast.error(err.response.data.msg)
            setIsLoading(false)
        })

        setInput({
            email: '',
            password: '',
            userType: 'student'
        })
    }

    const getResetLink = e => {
        e.preventDefault();
        if (!input.email) {
            toast.error('Please enter email');
            return;
        }
        setIsLoading(true)
        axios.post(`/auth/forgot-password`, {
            email: input.email,
            userType: input.userType
        }).then(res => {
            toast.success(res.data.msg)
            setIsLoading(false)
        }).catch(err => {
            toast.error(err.response.data.msg)
            setIsLoading(false)
        })

    }

    return (
        <div className=''>
            <Toaster />
            <div className='signup-signin-bg relative' style={{ height: '100vh' }}>
                <Navbar
                    btnText='Register'
                    path='/signup'
                    isLoading={isLoading}
                />
                <div className='flex flex-col justify-center items-center' style={{ height: '90vh' }}>
                    <div className='md:p-8 transparent-bg rounded-md'>
                        <h2 className='text-xl mx-2 md:text-2xl font-semibold'>Log in</h2>
                        <form onSubmit={login} className='flex flex-col justify-left items-center py-8 px-6 md:p-10 gap-y-6'>
                            <TextField
                                type={'email'}
                                fullWidth
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                size='small'
                                value={input.email}
                                onChange={e => setInput({ ...input, email: e.target.value })}
                                style={{ color: 'white' }}
                            />
                            <TextField type={'password'} fullWidth id="outlined-basic" label="Password" variant="outlined" size='small' value={input.password} onChange={e => setInput({ ...input, password: e.target.value })} />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={['student', 'examiner']}
                                sx={{ width: 300 }}
                                value={input.userType}
                                defaultValue={'student'}
                                onChange={(e, values) => setInput({ ...input, userType: values })}
                                renderInput={(params) => <TextField {...params} label="Role" />}
                                size='small'
                            />
                            <p className='text-xs text-blue-500 font-normal self-end -my-4 cursor-pointer' onClick={getResetLink}>Forget password</p>
                            <p className='text-xs relative right-14 text-blue-500'>Dont have an account?{' '}
                                <span className='underline cursor-pointer' onClick={() => navigate('/signup')}>create</span>
                                {' '}here
                            </p>
                            <Button type='submit' variant="contained" size='small' className='self-start'>Login</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login