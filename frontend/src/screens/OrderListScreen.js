import moment from 'moment'
import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Loader, Message } from '../components'
import { listOrders } from '../redux/actions/orderActions'
import { useNavigate } from 'react-router-dom'

const OrderListScreen = () => {
  const history = useNavigate()
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      history('/login')
    }
  }, [dispatch, history, userInfo])

  return (
    <Layout>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 '>
            <tr>
              <th scope='col' className='px-6 py-3'>
                ID
              </th>
              <th scope='col' className='px-6 py-3'>
                USER
              </th>
              <th scope='col' className='px-6 py-3'>
                DATE
              </th>
              <th scope='col' className='px-6 py-3'>
                TOTAL
              </th>
              <th scope='col' className='px-6 py-3'>
                PAID
              </th>
              <th scope='col' className='px-6 py-3'>
                PROCESS
              </th>
              <th scope='col' className='px-6 py-3'></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                key={order._id}
              >
                <td className='px-6 py-4'>{order._id}</td>
                <td className='px-6 py-4'>{}</td>
                <td className='px-6 py-4'>
                  {order.createdAt.substring(0, 10)}
                </td>
                <td className='px-6 py-4'>Rp {order.totalPrice}</td>
                <td className='px-6 py-4'>
                  {order.isPaid ? (
                    moment(order.payAt).format('l, h:mm:ss')
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td className='px-6 py-4'>
                  {order.isProcess ? (
                    moment(order.processAt).format('l, h:mm:ss')
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td className='px-6 py-4'>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='light' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  )
}

export default OrderListScreen
