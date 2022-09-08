import React from 'react'
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';

const Navbar = ({ btnText = "text", path = "#" }) => {
    const navigate = useNavigate();

    return (
        <div className='flex justify-between items-center px-4 md:px-10 py-2 bg-gray-800' style={{ height: '7vh' }}>
            <p className='text-white cursor-pointer' onClick={() => navigate('/')}>Online Examination Portal</p>
            <Button
                variant='outlined'
                size='small'
                style={{ color: 'white' }}
                onClick={() => navigate(`${path}`)}
            >
                {btnText}
            </Button>
        </div>
    )
}

export default Navbar