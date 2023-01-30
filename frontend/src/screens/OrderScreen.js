import React, { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message, Loader, Layout } from '../components'
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
  successOrder,
} from '../redux/actions/orderActions'
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
  ORDER_SUCCESS_RESET,
} from '../redux/constants/orderConstants'

const OrderScreen = () => {
  const params = useParams()
  const history = useNavigate()

  const orderId = params.id

  const [sdkReady, setSdkReady] = useState(false)

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  const orderDeliver = useSelector((state) => state.orderDeliver)
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const orderSuccess = useSelector((state) => state.orderSuccess)
  const { loading: loadingSuccess, success: successOrderDeliver } = orderSuccess

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  useEffect(() => {
    if (!userInfo) {
      history('/login')
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }

    if (
      !order ||
      successPay ||
      successDeliver ||
      successOrderDeliver ||
      order._id !== orderId
    ) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch({ type: ORDER_SUCCESS_RESET })
      dispatch(getOrderDetails(orderId))
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [
    dispatch,
    orderId,
    successPay,
    successDeliver,
    order,
    history,
    userInfo,
    successOrderDeliver,
  ])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  const successHandler = () => {
    dispatch(successOrder(order))
  }
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Layout>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Username Process: </strong>
                {order.shippingProcess.username}
              </p>
              <p>
                <strong>Link Process: </strong>
                {order.shippingProcess.link}
              </p>
              {order.isProcess && !order.statusProcess ? (
                <Message variant='success'>
                  Process on {moment(order.processAt).format('l, h:mm:ss')}
                </Message>
              ) : order.statusProcess ? (
                <Message variant='success'>
                  Success {moment(order.processAt).format('l, h:mm:ss')}
                </Message>
              ) : (
                <Message variant='danger'>Not Process</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant='success'>
                  Paid on {moment(order.payAt).format('l, h:mm:ss')}
                </Message>
              ) : (
                <Message variant='danger'>Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={3}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>Rp {order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>Rp {order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>Rp {order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rp {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isProcess && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Process
                    </Button>
                  </ListGroup.Item>
                )}

              {loadingSuccess && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                order.isProcess &&
                !order.statusProcess && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={successHandler}
                    >
                      mark as success
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Layout>
  )
}

export default OrderScreen
