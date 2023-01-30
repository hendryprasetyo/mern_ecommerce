import React, { useState } from 'react'
import { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useParams, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  Product,
  Loader,
  Message,
  Paginate,
  CategoryProduct,
  Layout,
} from '../components'
import { listProducts } from '../redux/actions/productActions'
import axios from 'axios'

const ProductListScreen = () => {
  const [category, setCategory] = useState([])

  const params = useParams()

  const keyword = params.keyword

  const pageNumber = params.pageNumber || 1

  const dispatch = useDispatch()
  const { pathname } = useLocation()
  console.log(pathname)
  const cat = pathname.split('/')[2]

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await axios.get(`/api/products/category/${cat}`)
        const data = await res.data.products
        setCategory(data)
      } catch (error) {}
    }
    getCategory()
  }, [cat])

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  return (
    <Layout>
      <CategoryProduct />
      <Row>
        {category.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>

      {pathname === '/productlist' ||
      pathname === `/productlist/page/${pageNumber}` ||
      pathname === `/productlist/search/${keyword}` ? (
        <>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))}
              </Row>
              <Paginate
                pages={pages}
                page={page}
                keyword={keyword ? keyword : ''}
                path='/productlist'
              />
            </>
          )}
        </>
      ) : (
        ''
      )}
    </Layout>
  )
}

export default ProductListScreen
