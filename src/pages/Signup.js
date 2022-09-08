import React from 'react'
import Navbar from '../components/Navbar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';

const Signup = () => {

    const signup = e => {
        e.preventDefault();
        console.log('signup')
    }

    return (
        <div className=''>
            <Navbar
                btnText='Login'
                path='/login'
            />
            <div className='flex flex-col justify-center items-center md:bg-gray-100' style={{ height: '93vh' }}>
                <div className='md:p-8 bg-white rounded-md'>
                    <h2 className='text-xl mx-2 md:text-2xl font-semibold'>Register</h2>
                    <form onSubmit={signup} className='flex flex-col justify-left items-center py-8 px-6 md:p-10 gap-y-8'>
                        <TextField fullWidth id="outlined-basic" label="Name" variant="outlined" size='small' />
                        <TextField fullWidth id="outlined-basic" label="Email" variant="outlined" size='small' />
                        <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" size='small' />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={['student', 'examiner']}
                            sx={{ width: 300 }}
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