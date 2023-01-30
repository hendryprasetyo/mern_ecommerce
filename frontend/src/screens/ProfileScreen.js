import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message, Loader, Layout } from '../components'
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions'
import { listMyOrders } from '../redux/actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants'
import { toast } from 'react-hot-toast'
import { BiShow, BiHide } from 'react-icons/bi'

const ProfileScreen = () => {
  const history = useNavigate()
  const [showPass, setShowPass] = useState(false)
  const [cShowPass, setcShowPass] = useState(false)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history('/login')
    } else {
      if (!user || !user.username || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      } else {
        setUsername(user.username)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user, success])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, username, email, password }))
      toast.success('update successfuly')
    }
  }

  return (
    <Layout>
      <Row className='flex flex-col justify-center h-screen items-center'>
        <h2 className='-mt-40 mb-20'>User Profile</h2>
        <Col md={3} className='p-4'>
          {message && <Message variant='danger'>{message}</Message>}
          {}
          {success && <Message variant='success'>Profile Updated</Message>}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId='username'>
                <Form.Label className='dark:text-white'>Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email'>
                <Form.Label className='dark:text-white'>
                  Email Address
                </Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='password'>
                <Form.Label className='dark:text-white'>Password</Form.Label>
                <Form.Control
                  type={showPass ? 'text' : 'password'}
                  placeholder='Enter password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
                <button
                  type='button'
                  className='cursor-pointer absolute top-[13.5rem] right-9 z-50'
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? (
                    <BiHide className='text-lg' />
                  ) : (
                    <BiShow className='text-lg' />
                  )}
                </button>
              </Form.Group>

              <Form.Group controlId='confirmPassword'>
                <Form.Label className='dark:text-white'>
                  Confirm Password
                </Form.Label>
                <Form.Control
                  type={cShowPass ? 'text' : 'password'}
                  placeholder='Confirm password'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
                <button
                  type='button'
                  className='cursor-pointer absolute top-[18rem] right-9 z-50'
                  onClick={() => setcShowPass(!cShowPass)}
                >
                  {cShowPass ? (
                    <BiHide className='text-lg' />
                  ) : (
                    <BiShow className='text-lg' />
                  )}
                </button>
              </Form.Group>

              <Button
                type='submit'
                variant='primary'
                className='dark:bg-gray-300 dark:hover:bg-gray-200 dark:text-gray-600 rounded-lg mt-7 bg-gray-500 hover:bg-gray-400'
              >
                Update
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Layout>
  )
}

export default ProfileScreen
