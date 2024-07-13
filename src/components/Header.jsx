import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../state/authSlice'

const Header = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state) => state.auth.userInfo)

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <ul className='bg-neutral-700 h-[50px] flex items-center gap-3 pl-10'>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/login'>LogIn</Link>
        </li>
        <li>
          <Link to='/signup'>Register</Link>
        </li>
        <div className='item-end'>
          {userInfo ? (
            <>
              <span className='mr-4 text-green-300 font-bold font-2xl'>
                Hello, {userInfo.username}
              </span>
              <button
                onClick={logoutHandler}
                className='bg-red-500 px-3 py-2 rounded'
              >
                Logout
              </button>
            </>
          ) : (
            <h5>Please log in</h5>
          )}
        </div>
      </ul>
    </>
  )
}

export default Header
