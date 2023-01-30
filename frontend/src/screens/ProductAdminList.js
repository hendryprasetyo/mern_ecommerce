import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Message, Loader, Paginate, Rating, Layout } from '../components'
import { ModalDel } from '../components/PopupDialog'
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../redux/actions/productActions'
import { PRODUCT_CREATE_RESET } from '../redux/constants/productConstants'
import { useStateContext } from '../context/ContextProvider'

const ProductAdminList = () => {
  const { setLoading } = useStateContext()

  const [modal, setModal] = useState(false)
  const history = useNavigate()
  const params = useParams()

  const pageNumber = params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading: LoadingProduct, error, products, page, pages } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo || !userInfo.isAdmin) {
      history('/login')
    }

    if (successCreate) {
      history(`/admin/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts('', pageNumber))
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ])

  const deleteHandler = (id) => {
    setLoading(true)
    dispatch(deleteProduct(id))
    setLoading(false)
    setModal(false)
  }

  const createProductHandler = () => {
    dispatch(createProduct())
  }

  return (
    <Layout>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3 bg-green-400' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {LoadingProduct ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 '>
              <tr>
                <th scope='col' className='px-6 py-3'>
                  NO
                </th>
                <th scope='col' className='px-6 py-3'>
                  IMAGE
                </th>
                <th scope='col' className='px-6 py-3'>
                  NAME
                </th>
                <th scope='col' className='px-6 py-3'>
                  PRICE
                </th>
                <th scope='col' className='px-6 py-3'>
                  STOCK
                </th>
                <th scope='col' className='px-6 py-3'>
                  CATEGORY
                </th>
                <th scope='col' className='px-6 py-3'>
                  RATING
                </th>
                <th scope='col' className='px-6 py-3'>
                  UPDATE
                </th>
                <th scope='col' className='px-6 py-3'>
                  EDIT
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => (
                <>
                  {modal && (
                    <ModalDel
                      cancelBtn={() => setModal(false)}
                      okeBtn={() => deleteHandler(product._id)}
                      text='if you delete this product, then you will not see this again'
                    />
                  )}
                  <tr
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                    key={product._id}
                  >
                    <td className='px-6 py-4'>{i + 1}</td>
                    <td className='px-6 py-4'>
                      <img src={product.image} alt='product' className='w-40' />
                    </td>
                    <td className='px-6 py-4'>{product.name}</td>
                    <td className='px-6 py-4'>Rp {product.price}</td>
                    <td className='px-6 py-4'>{product.countInStock}</td>
                    <td className='px-6 py-4'>{product.category}</td>
                    <td className='px-6 py-4'>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </td>
                    <td className='px-6 py-4'>
                      {product.updatedAt.substring(0, 10)}
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex gap-2'>
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit`}
                        >
                          <Button
                            variant='light'
                            className='btn-sm flex items-center'
                          >
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <button
                          variant='danger'
                          className='text-red-500 p-3   hover:bg-gray-200'
                          onClick={() => setModal(true)}
                        >
                          <i className='fas fa-trash'></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </Layout>
  )
}

export default ProductAdminList
