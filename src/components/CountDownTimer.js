import React, { useState, useEffect } from 'react'

const CountDownTimer = ({ minutes, handleSubmit }) => {

    const [[mins, secs], setTime] = useState([parseInt(minutes), 0])
    const tick = () => {
        if (mins === 0 && secs === 0) {
            handleSubmit()
        } else if (secs === 0) {
            setTime([mins - 1, 59]);
        } else {
            setTime([mins, secs - 1]);
        }
    };

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => {
            return clearInterval(timerID);
        }
    })


    return (
        <span className='text-white'>{`${mins.toString()}:${secs.toString()}`}</span>
    )
}

export default CountDownTimer