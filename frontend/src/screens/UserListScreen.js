import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Loader, Message } from '../components'
import { listUsers, deleteUser } from '../redux/actions/userActions'

const UserListScreen = () => {
  const history = useNavigate()

  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history('/login')
    }
  }, [dispatch, history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <Layout>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                NO
              </th>
              <th scope='col' className='px-6 py-3'>
                USERNAME
              </th>
              <th scope='col' className='px-6 py-3'>
                EMAIL
              </th>
              <th scope='col' className='px-6 py-3'>
                CREATED
              </th>
              <th scope='col' className='px-6 py-3'>
                ADMIN
              </th>
              <th scope='col' className='px-6 py-3'>
                EDIT
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                key={user._id}
              >
                <td className='px-6 py-2'>{i + 1}</td>
                <td className='px-6 py-2'>{user.username}</td>
                <td className='px-6 py-2'>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td className='px-6 py-2'>{user.createdAt.substring(0, 10)}</td>
                <td className='px-6 py-2'>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td className='flex justify-center gap-2 items-center py-2'>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='light'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash text-red-500 text-sm'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  )
}

export default UserListScreen
