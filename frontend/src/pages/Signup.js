import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import '../axios';
import axios from 'axios';
import Navbar from '../components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';

const Signup = () => {

    const navigate = useNavigate();

    const [input, setInput] = useState({ name: '', email: '', password: '', userType: "student" })
    const [isLoading, setIsLoading] = useState(false);

    const signup = e => {
        e.preventDefault();
        setIsLoading(true)
        axios.post(`/auth/register`, {
            ...input
        }).then(res => {
            toast.success('Registeration Success')
            toast('Please confirm your email')
            setIsLoading(false)
        }).catch(err => {
            toast.error(err.response.data.msg)
            setIsLoading(false)
        })
        setInput({
            name: "",
            email: "",
            password: "",
            userType: "student"
        })
    }

    return (
        <div className=''>
            <Toaster />
            <div className='signup-signin-bg relative' style={{ height: '100vh' }}>
                <Navbar
                    btnText='Login'
                    path='/login'
                    isLoading={isLoading}
                />
                <div className='flex flex-col justify-center items-center ' style={{ height: '90vh' }}>
                    <div className='md:p-8 transparent-bg rounded-md'>
                        <h2 className='text-xl mx-2 md:text-2xl font-semibold'>Register</h2>
                        <form onSubmit={signup} className='flex flex-col justify-left items-center py-8 px-6 md:p-10 gap-y-6'>
                            <TextField type={'text'} required fullWidth id="outlined-basic" label="Name" variant="outlined" size='small' value={input.name} onChange={e => setInput({ ...input, name: e.target.value })} />
                            <TextField type={"email"} required fullWidth id="outlined-basic" label="Email" variant="outlined" size='small' value={input.email} onChange={e => setInput({ ...input, email: e.target.value })} />
                            <TextField type={"password"} required fullWidth id="outlined-basic" label="Password" variant="outlined" size='small' value={input.password} onChange={e => setInput({ ...input, password: e.target.value })} />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={['student', 'examiner']}
                                sx={{ width: 300 }}
                                defaultValue={"student"}
                                onChange={(e, values) => setInput({ ...input, userType: values })}
                                renderInput={(params) => <TextField {...params} label="Role" />}
                                size='small'
                            />
                            <p className='text-xs relative right-14 text-blue-500'>Already have an account{' '}
                                <span className='underline cursor-pointer' onClick={() => navigate('/login')}>login</span>
                                {' '}here
                            </p>
                            <Button type='submit' variant="contained" size='small' className='self-start'>Submit</Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup