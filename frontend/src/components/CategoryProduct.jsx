import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FB, TK, YT, TELE, TWIT, IG } from '../assets/images'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

// import required modules
import { Pagination } from 'swiper'
const CategoryProduct = () => {
  const history = useNavigate()
  const { pathname } = useLocation()

  const handleClick = (category) => {
    history(`/productlist/${category}`)
  }

  const isActive =
    'dark:bg-gray-700 bg-gray-300 px-3 py-2 font-semibold dark:text-gray-100 text-gray-900 inline-flex items-center space-x-2 rounded w-32 h-10 justify-center focus:outline-none'
  const isNoActive =
    'bg-transparent border-1 border-blue-400 px-3 py-1 font-semibold dark:text-white text-gray-600 dark:hover:bg-blue-400 inline-flex items-center space-x-2 rounded w-32 justify-center h-10'
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        modules={[Pagination]}
        className='mySwiper'
      >
        <SwiperSlide>
          <button
            className={`${pathname === '/productlist' ? isActive : isNoActive}`}
            onClick={() => history('/productlist')}
          >
            <span>All Category</span>
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className={`${
              pathname === '/productlist/instagram' ? isActive : isNoActive
            }`}
            onClick={() => handleClick('instagram')}
          >
            <img src={IG} alt='ig' className='w-7' />
            <span>Instagram</span>
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className={`${
              pathname === '/productlist/facebook' ? isActive : isNoActive
            }`}
            onClick={() => handleClick('facebook')}
          >
            <img src={FB} alt='fb' className='w-7' />
            <span>Facebook</span>
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className={`${
              pathname === '/productlist/youtube' ? isActive : isNoActive
            }`}
            onClick={() => handleClick('youtube')}
          >
            <img src={YT} alt='ig' className='w-7' />
            <span>YouTube</span>
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className={`${
              pathname === '/productlist/tiktok' ? isActive : isNoActive
            }`}
            onClick={() => handleClick('tiktok')}
          >
            <img src={TK} alt='ig' className='w-7' />
            <span>Tiktok</span>
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className={`${
              pathname === '/productlist/telegram' ? isActive : isNoActive
            }`}
            onClick={() => handleClick('telegram')}
          >
            <img src={TELE} alt='ig' className='w-7' />
            <span>Telegram</span>
          </button>
        </SwiperSlide>
        <SwiperSlide>
          <button
            className={`${
              pathname === '/productlist/twitter' ? isActive : isNoActive
            }`}
            onClick={() => handleClick('twitter')}
          >
            <img src={TWIT} alt='ig' className='w-7' />
            <span>Twitter</span>
          </button>
        </SwiperSlide>
      </Swiper>
    </>
  )
}

export default CategoryProduct
