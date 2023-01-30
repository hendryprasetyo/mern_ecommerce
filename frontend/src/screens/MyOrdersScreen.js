import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Loader, Message } from '../components'
import { LinkContainer } from 'react-router-bootstrap'
import { listMyOrders } from '../redux/actions/orderActions'

const MyOrdersScreen = () => {
  const history = useNavigate()
  const dispatch = useDispatch()

  const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails
  useEffect(() => {
    if (!userInfo) {
      history('/login')
    } else {
      if (!user || !user.username) {
        dispatch(listMyOrders())
      }
    }
  }, [dispatch, history, userInfo, user])

  return (
    <Layout>
      <Row>
        <Col md={9}>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : (
            <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 '>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    ID
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
                  <th scope='col' className='px-6 py-3'>
                    STATUS
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
                    <td className='px-6 py-4'>
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className='px-6 py-4'>{order.totalPrice}</td>
                    <td className='px-6 py-4'>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td className='px-6 py-4'>
                      {order.isProcess ? (
                        order.processAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td className='px-6 py-4'>
                      {order.statusProcess ? (
                        <p className='bg-green-400 text-center rounded-lg  px-3 py-1 text-black'>
                          SUCESS
                        </p>
                      ) : (
                        <p className='bg-blue-500 text-center rounded-lg  px-3 py-1 text-black'>
                          PROCESS
                        </p>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Col>
      </Row>
    </Layout>
  )
}

export default MyOrdersScreen
