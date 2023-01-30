import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { FormContainer, CheckoutSteps, Layout } from '../components'
import { saveShippingProcess } from '../redux/actions/cartActions'
import { Button } from '../components'
import { useStateContext } from '../context/ContextProvider'

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart)
  const { currentColor } = useStateContext()

  const history = useNavigate()

  const { shippingProcess } = cart

  const [username, setUsername] = useState(shippingProcess.username)
  const [link, setLink] = useState(shippingProcess.link)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingProcess({ username, link }))
    history('/payment')
  }

  return (
    <Layout>
      <FormContainer>
        <CheckoutSteps step1 step2 />
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter username'
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='link'>
            <Form.Label>Link</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter link'
              value={link}
              required
              onChange={(e) => setLink(e.target.value)}
            ></Form.Control>
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

export default ShippingScreen
