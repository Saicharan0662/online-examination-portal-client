import React from 'react'
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
import LinearProgress from '../components/LinearProgress';

const Navbar = ({ btnText = "text", path = "#", isLoading = false }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className='flex justify-between items-center px-4 md:px-10 py-2 bg-gray-800' style={{ height: '7vh' }}>
                <p className='text-white cursor-pointer' onClick={() => navigate('/')}>Online Examination Portal</p>
                <Button
                    variant='outlined'
                    size='small'
                    style={{ color: 'white' }}
                    onClick={() => {
                        if (btnText === 'Logout') localStorage.clear()
                        navigate(`${path}`)
                    }}
                >
                    {btnText}
                </Button>
            </div>
            {isLoading && <LinearProgress />}
        </>
    )
}

export default Navbar