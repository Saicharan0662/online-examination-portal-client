import React from 'react'
import { useNavigate } from 'react-router'
import Button from '@mui/material/Button';

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className='min-h-screen w-full bg-white-200 flex justify-left items-center landing-bg'>
            <div className='mx-2 md:mx-10'>
                <div className='w-full md:w-1/2'>
                    <h1 className='text-4xl md:text-6xl font-semibold my-4 text-white'>Online Examination Portal</h1>
                    <p className='ml-2 my-4 font-light text-gray-200'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci laboriosam iure ab dolore quibusdam suscipit assumenda illum quam nemo iste recusandae, aspernatur rerum ipsum sint quaerat ipsa beatae. Sit, perspiciatis!</p>
                </div>
                <div className='my-2 flex gap-x-4'>
                    <Button variant='contained' onClick={() => navigate('/signup')}>Get Started</Button>
                    <Button variant='contained' onClick={() => navigate('/login')}>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default Home