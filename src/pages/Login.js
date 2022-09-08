import React, { useState } from 'react'
import '../axios';
import axios from 'axios';
import Navbar from '../components/Navbar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';

const Login = () => {

    const [input, setInput] = useState({ email: '', password: '', userType: "student" });
    const [isLoading, setIsLoading] = useState(false);

    const login = e => {
        e.preventDefault();
        setIsLoading(true)
        axios.post(`/auth/login`, {
            ...input
        }).then(res => {
            localStorage.setItem('userData', JSON.stringify(res.data))
            setIsLoading(false)
        }).catch(err => {
            console.log(err)
            setIsLoading(false)
        })

        setInput({
            email: '',
            password: '',
            userType: 'student'
        })
    }

    return (
        <div className=''>
            <Navbar
                btnText='Register'
                path='/signup'
                isLoading={isLoading}
            />
            <div className='flex flex-col justify-center items-center md:bg-gray-100' style={{ height: '93vh' }}>
                <div className='md:p-8 bg-white rounded-md'>
                    <h2 className='text-xl mx-2 md:text-2xl font-semibold'>Log in</h2>
                    <form onSubmit={login} className='flex flex-col justify-left items-center py-8 px-6 md:p-10 gap-y-8'>
                        <TextField type={'email'} required fullWidth id="outlined-basic" label="Email" variant="outlined" size='small' value={input.email} onChange={e => setInput({ ...input, email: e.target.value })} />
                        <TextField type={'password'} required fullWidth id="outlined-basic" label="Password" variant="outlined" size='small' value={input.password} onChange={e => setInput({ ...input, password: e.target.value })} />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={['student', 'examiner']}
                            sx={{ width: 300 }}
                            value={input.userType}
                            defaultValue={'student'}
                            onChange={(e, values) => setInput({ ...input, userType: values })}
                            renderInput={(params) => <TextField {...params} label="Category" />}
                            size='small'
                        />
                        <Button type='submit' variant="contained" size='small' className='self-start'>Login</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login