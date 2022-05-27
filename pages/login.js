import React, { useState } from 'react'
import { signIn } from 'next-auth/react'

const Login = () => {
  const [email, setEmail] = useState('')

  const sendLoginVerification = e => {
    e.preventDefault()
    
    // Notice, we are also redirecting users to the protected route instead of the homepage after signing in. 
    signIn('email', { callbackUrl: '/success', email })
  }

  return (
    <div>
      <h1>Login</h1>
      <h3>
        Enter your NUS email address, and we will send you a verification link to log in.
      </h3>
      <form onSubmit={sendLoginVerification}>
        <input
          type='email'
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
        />
        <button type='submit'>Send Magic Link 🪄</button>
      </form>
    </div>
  )
}

export default Login