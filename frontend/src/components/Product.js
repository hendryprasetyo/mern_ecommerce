import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

import { FiShoppingCart } from 'react-icons/fi'
import { useStateContext } from '../context/ContextProvider'
import { toast } from 'react-hot-toast'

import Rating from './Rating'

const Product = ({ product }) => {
  const { handlerAddToCart, currentColor } = useStateContext()

  const handler = () => {
    handlerAddToCart(product._id)
    toast.success(`${product.name} added to the cart`)
  }

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`} className='bg-green-500'>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body className='relative'>
        <Link to={`/product/${product._id}`} className='bg-green-500'>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${' '}${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as='h3'>Rp {product.price}</Card.Text>
        <Card.Text
          as='button'
          className='absolute right-0 bottom-2 hover:bg-gray-500 p-2 rounded-full text-center z-40 focus:outline-none'
          onClick={handler}
        >
          <FiShoppingCart className='text-xl' style={{ color: currentColor }} />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
