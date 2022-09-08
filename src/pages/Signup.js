import React from 'react'

const Signup = () => {

    const signup = e => {
        e.preventDefault();
        console.log('signup')
    }

    return (
        <div className='login-container'>
            <div className='login-content'>
                <form onSubmit={signup}>
                    <label htmlFor="name">Name
                        <input type="text" id='email' required />
                    </label>
                    <label htmlFor="email">Email
                        <input type="email" id='email' required />
                    </label>
                    <label htmlFor="password">Password
                        <input type="text" id='password' required />
                    </label>
                    <label htmlFor="password">Password
                        <input type="text" id='password' required />
                    </label>
                    <button type='submit'>Log in</button>
                </form>
            </div>
        </div>
    )
}

export default Signup