import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../state/authSlice'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const { loading, error, userInfo } = useSelector((state) => state.auth)

  const loginHandler = (e) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
    setEmail('')
    setPassword('')
  }

  return (
    <form
      className='border-2 border-gray-200 max-w-[600px] mx-auto mt-[200px] p-5'
      onSubmit={loginHandler}
    >
      <h2 className='text-center text-green-500 text-3xl mb-3 font-bold'>
        Login
      </h2>

      {error && <p className='text-red-500'>{error}</p>}
      {userInfo && <p className='text-green-500'>Login Successful!</p>}

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
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}

export default LoginScreen
