import React from 'react'
import Button from '@mui/material/Button';

const Navbar = ({ btnText = "text" }) => {
    return (
        <div className='flex justify-between items-center px-10 py-2 bg-gray-800'>
            <p className='text-white'>Online Examination Portal</p>
            <Button variant='outlined' size='small' style={{ color: 'white' }}>{btnText}</Button>
        </div>
    )
}

export default Navbar