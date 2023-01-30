import React, { useState } from 'react'
import { Form, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer, CheckoutSteps, Layout } from '../components'
import { savePaymentMethod } from '../redux/actions/cartActions'
import { Button } from '../components'
import { useStateContext } from '../context/ContextProvider'

const PaymentScreen = () => {
  const history = useNavigate()
  const { currentColor } = useStateContext()

  const cart = useSelector((state) => state.cart)
  const { shippingProcess } = cart

  if (!shippingProcess.username) {
    history('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    history('/placeorder')
  }

  return (
    <Layout>
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              {/* <Form.Check
              type='radio'
              label='Stripe'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check> */}
            </Col>
          </Form.Group>

          <Button
            type='onSubmit'
            color={currentColor}
            className='px-3 py-2 mt-2'
          >
            Continue
          </Button>
        </Form>
      </FormContainer>
    </Layout>
  )
}

export default PaymentScreen
