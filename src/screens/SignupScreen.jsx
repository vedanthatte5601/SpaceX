import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../state/authSlice'

const SignupScreen = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const { loading, success, error } = useSelector((state) => state.auth)

  const registerHandler = (e) => {
    e.preventDefault()
    dispatch(registerUser({ username, email, password }))
    setEmail('')
    setPassword('')
    setUsername('')
  }

  return (
    <form
      className='border-2 border-gray-200 max-w-[600px] mx-auto mt-[200px] p-5'
      onSubmit={registerHandler}
    >
      <h2 className='text-center text-green-500 text-3xl mb-3 font-bold'>
        Register
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {success && <p className='text-green-500'>Registration Successful!</p>}

      <div className='flex flex-col my-2'>
        <label htmlFor=''>Username</label>
        <input
          type='text'
          className='bg-slate-300 p-2'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className='email flex flex-col my-2'>
        <label htmlFor=''>Email Id</label>
        <input
          type='email'
          className='bg-slate-300 p-2'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='password flex flex-col my-2'>
        <label htmlFor=''>Password</label>
        <input
          type='password'
          className='bg-slate-300 p-2'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        className='my-2 bg-black text-white px-3 py-2'
        type='submit'
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
      </button>
    </form>
  )
}

export default SignupScreen
