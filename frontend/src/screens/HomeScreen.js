import React, { useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import {
  Message,
  Loader,
  Product,
  Meta,
  Paginate,
  ProductCarousel,
  Layout,
  Search,
} from '../components'
import { listProducts } from '../redux/actions/productActions'
import { BiArrowBack } from 'react-icons/bi'

const HomeScreen = () => {
  const history = useNavigate()
  const params = useParams()
  const { pathname } = useLocation()

  const keyword = params.keyword

  const pageNumber = params.pageNumber || 1

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <Layout>
      <Meta />
      <div className=''>
        {!keyword ? (
          <ProductCarousel />
        ) : (
          <Search
            pIcon='left-12'
            className='lg:hidden'
            pInput='pl-24'
            backIcon={
              <button
                onClick={() => history(-1)}
                className='absolute flex justify-center items-center w-11  bg-gray-100 rounded-l-lg h-full'
              >
                <BiArrowBack className='text-xl' />
              </button>
            }
          />
        )}
      </div>
      {pathname === '/' && (
        <h1 className='dark:text-gray-100  mt-10 '>All Porducts</h1>
      )}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row className='overflow-x-hidden'>
            {products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
            path=''
          />
        </>
      )}
    </Layout>
  )
}

export default HomeScreen
