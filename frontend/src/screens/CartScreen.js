import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../redux/actions/cartActions'
import { toast } from 'react-hot-toast'
import { Layout } from '../components'

const CartScreen = () => {
  const history = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const removeFromCartHandler = (id, name) => {
    dispatch(removeFromCart(id))
    toast.error(`${name} product is removed`)
  }

  const checkoutHandler = () => {
    history('/shipping')
  }

  return (
    <Layout>
      <div className='pt-4'>
        <h1 className='mb-8 text-center text-2xl font-bold dark:text-gray-200 text-gray-700'>
          Cart Items
        </h1>
        <div className='justify-center md:flex md:space-x-6 xl:px-0'>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to='/'>Go Back</Link>
            </Message>
          ) : (
            <>
              <div className='rounded-lg md:w-2/3'>
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className='mb-6 bg-gray-100 dark:bg-gray-700 p-2 shadow-md flex justify-start'
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className='rounded-lg w-16 sm:w-20'
                    />

                    <div className='flex justify-between w-full ml-3 sm:ml-4'>
                      <div className='flex flex-col justify-center gap-3'>
                        <Link
                          to={`/product/${item.product}`}
                          className='text-lg font-bold text-gray-900 dark:text-gray-100'
                        >
                          {item.name}
                        </Link>
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                          className='cursor-pointer w-10 h-7'
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className='flex items-center gap-2'>
                        <span className=' items-center flex  dark:text-white text-gray-900'>
                          Rp {item.price} x {item.qty}
                        </span>
                        <button
                          type='button'
                          variant='light'
                          onClick={() =>
                            removeFromCartHandler(item.product, item.name)
                          }
                          className='text-red-400 h-8 w-8 md:h-10 md:w-10 hover:bg-gray-400 dark:hover:bg-gray-100 text-base rounded-lg transition-all'
                        >
                          <i className='fas fa-trash'></i>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className='mt-6 h-full rounded-lg border dark:bg-gray-700 bg-gray-100 p-4 shadow-md md:mt-0 md:w-1/3'>
                <h2 className='text-center mb-3 '>Subtotal</h2>
                <div className='mb-2 flex justify-between'>
                  <p className='text-gray-700 text-base dark:text-white'>Qty</p>
                  <p className='text-gray-700 text-base dark:text-white'>
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} items
                  </p>
                </div>
                <div className='mb-2 flex justify-between'>
                  <p className='text-gray-700 text-base dark:text-white'>
                    Price
                  </p>
                  <p className='text-gray-700 text-base dark:text-white'>
                    Rp{' '}
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </p>
                </div>
                <div className='flex justify-between'>
                  <p className='text-gray-700 text-base dark:text-white'>
                    Shipping
                  </p>
                  <p className='text-gray-700 text-base dark:text-white'>
                    Rp 0
                  </p>
                </div>
                <hr className='my-3' />
                <div className='flex justify-between'>
                  <p className='text-lg font-bold text-gray-700 dark:text-white'>
                    Total
                  </p>
                  <div className>
                    <p className='mb-1 text-lg font-bold text-gray-700 dark:text-white'>
                      Rp{' '}
                      {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  className='mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600'
                  onClick={checkoutHandler}
                >
                  Check out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default CartScreen
