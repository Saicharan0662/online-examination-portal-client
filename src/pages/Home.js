import React from 'react'
import { useNavigate } from 'react-router'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

const Home = () => {

    const navigate = useNavigate();

    return (
        <div className='min-h-screen w-full bg-blue-200'>
            <div className=''>
                <ButtonGroup
                    variant="contained"
                >
                    <Button>Get Started</Button>
                    <Button>Login</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default Home