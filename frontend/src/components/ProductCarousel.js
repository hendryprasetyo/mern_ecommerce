import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../redux/actions/productActions'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Autoplay, Pagination, Navigation } from 'swiper'

const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper mt-3'
      >
        {products.map((product) => (
          <SwiperSlide
            key={product._id}
            className='flex justify-center items-center w-20'
          >
            <img src={product.image} alt='' className='' />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <Link to={`/product/${product._id}`}> */}
    </>
  )
}

export default ProductCarousel
