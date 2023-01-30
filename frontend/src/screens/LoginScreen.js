import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../components'
import { login, loginGoogle } from '../redux/actions/userActions'
import { BiShow, BiHide } from 'react-icons/bi'
import { toast } from 'react-hot-toast'
import { useGoogleLogin } from '@react-oauth/google'
import '../style/login.css'

const LoginScreen = () => {
  const history = useNavigate()
  const location = useLocation()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo, success } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) {
      history(redirect)
    }
  }, [history, redirect, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(username, password))
  }
  const logGo = (e) => {
    e.preventDefault()
    dispatch(loginGoogle())
  }

  const showHandler = (e) => {
    e.preventDefault()
    setShowPass(!showPass)
  }

  return (
    <div className=' flex w-full justify-center h-screen '>
      <div className='flex justify-center items-center'>
        {loading && <Loader />}
        <div className='hidden'>{error && toast.error(error)}</div>
        {success && toast(`Welcome Back ${username}`)}
        <div className='dark:bg-[#1c1c1c] box'>
          <form
            onSubmit={submitHandler}
            className='form dark:bg-secondary-dark-bg bg-gray-100'
          >
            <div className='w-full flex justify-center mt-[-16px]'>
              <h1 className='dark:text-[#45f3ff] text-2xl'>Sign In</h1>
            </div>
            <div className='inputBox'>
              <input
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
              />
              <span className='dark:text-[#45f3ff] text-[#23242a]'>
                Username
              </span>
              <i className='dark:bg-[#8ee0e6] bg-gray-50 border-1 border-gray-400'></i>
            </div>
            <div className='inputBox'>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className='dark:text-[#45f3ff] text-[#23242a]'>
                password
              </span>
              <button
                type='button'
                className='cursor-pointer absolute right-5 z-50 top-[2.8rem] focus:outline-none'
                onClick={showHandler}
              >
                {showPass ? (
                  <BiShow className='text-lg' />
                ) : (
                  <BiHide className='text-lg' />
                )}
              </button>
              <i className='dark:bg-[#8ee0e6] bg-gray-50 border-1 border-gray-400'></i>
            </div>
            <div className='flex  justify-between mt-6 mb-[-10px]'>
              <Link to={'#'} className='dark:text-[#45f3ff] text-gray-700'>
                Forgot Password
              </Link>
              <Link to={'/register'} className='sign dark:text-[#45f3ff]'>
                Signup
              </Link>
            </div>
            <button
              type='onsubmit'
              className='py-2.5 font-medium justify-center text-lg  hover:bg-gray-200 dark:bg-cyan-300 border-gray-400 rounded-lg flex items-center w-full mt-7 dark:hover:bg-transparent border-1 dark:text-gray-900 transition-all dark:hover:text-cyan-300'
            >
              Login
            </button>
            <div className='flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'>
              <p className='text-center font-semibold mx-4 mb-0'>OR</p>
            </div>
          </form>
          <button
            onClick={logGo}
            className='py-2.5 font-medium justify-center text-lg  hover:bg-gray-200 z-50 absolute bottom-10 border-gray-400 rounded-lg flex items-center w-full dark:hover:bg-transparent border-1 dark:text-gray-900 transition'
          >
            <svg
              width={19}
              height={20}
              viewBox='0 0 19 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z'
                fill='#4285F4'
              />
              <path
                d='M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z'
                fill='#34A853'
              />
              <path
                d='M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z'
                fill='#FBBC05'
              />
              <path
                d='M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z'
                fill='#EB4335'
              />
            </svg>
            <p className='text-base font-medium ml-4 dark:text-cyan-200 text-gray-800'>
              Login with Google
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
