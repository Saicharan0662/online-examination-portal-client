import React, { useState } from 'react'
import '../axios';
import axios from 'axios';
import Navbar from '../components/Navbar';
import toast, { Toaster } from 'react-hot-toast';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';

const Signup = () => {

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
            <Navbar
                btnText='Login'
                path='/login'
                isLoading={isLoading}
            />
            <div className='flex flex-col justify-center items-center md:bg-gray-100' style={{ height: '93vh' }}>
                <div className='md:p-8 bg-white rounded-md'>
                    <h2 className='text-xl mx-2 md:text-2xl font-semibold'>Register</h2>
                    <form onSubmit={signup} className='flex flex-col justify-left items-center py-8 px-6 md:p-10 gap-y-8'>
                        <TextField type={'text'} required fullWidth id="outlined-basic" label="Name" variant="outlined" size='small' value={input.name} onChange={e => setInput({ ...input, name: e.target.value })} />
                        <TextField type={"email"} required fullWidth id="outlined-basic" label="Email" variant="outlined" size='small' value={input.email} onChange={e => setInput({ ...input, email: e.target.value })} />
                        <TextField type={"password"} required fullWidth id="outlined-basic" label="Password" variant="outlined" size='small' value={input.password} onChange={e => setInput({ ...input, password: e.target.value })} />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={['student', 'examiner']}
                            sx={{ width: 300 }}
                            defaultValue={"student"}
                            onChange={(e, value) => setInput({ ...input, userType: value })}
                            renderInput={(params) => <TextField {...params} label="Category" />}
                            size='small'
                        />
                        <Button type='submit' variant="contained" size='small' className='self-start'>Submit</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup