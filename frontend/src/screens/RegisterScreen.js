import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components'
import { register } from '../redux/actions/userActions'
import { toast } from 'react-hot-toast'
import { BiShow, BiHide } from 'react-icons/bi'
import '../style/register.css'

const RegisterScreen = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [cShowPass, setcShowPass] = useState(false)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, success } = userRegister

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
    } else {
      dispatch(register(username, email, password))
    }
  }

  return (
    <div className=' flex w-full justify-center h-screen'>
      <div className='flex justify-center items-center'>
        {loading && <Loader />}
        <div className='hidden'>{error && toast.error(error)}</div>
        {success && toast.success('Register Successfully')}
        <div className='box-register'>
          <form
            onSubmit={submitHandler}
            className='form-register dark:bg-secondary-dark-bg bg-gray-100'
          >
            <div className='w-full flex justify-center mt-[-16px]'>
              <h1 className='dark:text-[#45f3ff] text-2xl'>Sign Up</h1>
            </div>
            <div className='inputBox-register'>
              <input
                type='text'
                value={username}
                pattern='[a-z0-9{3,16}'
                onChange={(e) => setUsername(e.target.value)}
              />
              <span className='dark:text-[#45f3ff] text-[#23242a]'>
                Username
              </span>
              <i className='dark:bg-[#8ee0e6] bg-gray-50 border-1 border-gray-400'></i>
            </div>
            <div className='inputBox-register'>
              <input
                type='email'
                value={email}
                pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$'
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className='dark:text-[#45f3ff] text-[#23242a]'>Email</span>
              <i className='dark:bg-[#8ee0e6] bg-gray-50 border-1 border-gray-400'></i>
            </div>
            <div className='inputBox-register'>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className='dark:text-[#45f3ff] text-[#23242a]'>
                Password
              </span>
              <button
                type='button'
                className='cursor-pointer absolute right-5 z-50 top-5 focus:outline-none'
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? (
                  <BiShow className='text-lg' />
                ) : (
                  <BiHide className='text-lg' />
                )}
              </button>
              <i className='dark:bg-[#8ee0e6] bg-gray-50 border-1 border-gray-400'></i>
            </div>
            <div className='inputBox-register'>
              <input
                type={cShowPass ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span className='dark:text-[#45f3ff] text-[#23242a]'>
                Confirm Password
              </span>
              <button
                type='button'
                className='cursor-pointer absolute right-5 z-50 top-5 focus:outline-none'
                onClick={() => setcShowPass(!cShowPass)}
              >
                {cShowPass ? (
                  <BiShow className='text-lg' />
                ) : (
                  <BiHide className='text-lg' />
                )}
              </button>
              <i className='dark:bg-[#8ee0e6] bg-gray-50 border-1 border-gray-400'></i>
            </div>

            <div className='links mb-[-10px]  pt-3 mr-3 '>
              <Link to='/login' className='dark:text-[#45f3ff] text-base'>
                Sign In
              </Link>
            </div>
            <button
              type='submit'
              className='py-2.5 font-medium justify-center text-lg hover:bg-gray-200 dark:bg-cyan-300 border-gray-400 rounded-lg flex items-center w-full mt-7 dark:hover:bg-transparent border-1 dark:text-gray-900 transition-all dark:hover:text-cyan-300'
            >
              Register
            </button>
            <div className='dark:text-gray-100 pt-3 text-base'>
              Have an Account? <Link to={'/login'}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterScreen
