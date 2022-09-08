import React from 'react'

const Login = () => {

    const login = e => {
        e.preventDefault();
        console.log('login')
    }

    return (
        <div className='login-container'>
            <div className='login-content'>
                <form onSubmit={login}>
                    <label htmlFor="email">Email
                        <input type="email" id='email' required />
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

export default Login