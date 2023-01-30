import React, { useEffect } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { FiShoppingCart } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { useStateContext } from '../context/ContextProvider'
import { Link } from 'react-router-dom'
import Dropdown from './Dropdown'
import Search from './Search'
import CartHover from './CartHover'

export const NavButton = ({ customFunc, icon, color, dotColor, className }) => {
  const addClassName = className ? `${className}` : ''
  return (
    <button
      type='button'
      onClick={() => customFunc()}
      style={{ color }}
      className={`focus:outline-none text-2xl space-x-1 rounded-full p-2 ${addClassName}`}
    >
      <span
        style={{ background: dotColor }}
        className='absolute inline-flex rounded-full h-2 w-2 right-1 top-1'
      />
      {icon}
    </button>
  )
}

const Header = () => {
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0)

  // const userLogin = useSelector((state) => state.userLogin)
  // const { userInfo } = userLogin
  const { currentColor, activeMenu, setActiveMenu, setScreenSize } =
    useStateContext()

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [setScreenSize])

  return (
    <>
      <div className='flex justify-between p-2 relative w-full'>
        {/* left content */}
        <div className='flex md:gap-20'>
          <Link
            to={'/'}
            className='hidden items-center md:flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900 hover:no-underline ml-9'
          >
            <span className=''>HNPSTORE</span>
          </Link>
          <NavButton
            title='Menu'
            customFunc={() => setActiveMenu(!activeMenu)}
            color={currentColor}
            icon={<AiOutlineMenu />}
          />

          {/* content center */}
          <Search pInput='pl-11' className='hidden lg:flex ' />
        </div>
        {!activeMenu && (
          <Link
            to={'/'}
            className='items-center flex md:hidden text-xl font-extrabold tracking-tight dark:text-white text-slate-900 hover:no-underline'
          >
            <span className=''>HNPSTORE</span>
          </Link>
        )}

        {/* right content */}
        <div className='flex gap-2'>
          <>
            <Link to={'/cart'} className='relative'>
              <NavButton
                title='Cart'
                color={currentColor}
                icon={<FiShoppingCart />}
                className={`hover:[${(<CartHover />)}]`}
              />
              {totalQty !== 0 ? (
                <span
                  className={`w-5 h-5 bg-red-500  text-white absolute top-[-2px] text-center flex items-center justify-center rounded-full right-[-5px]`}
                >
                  {totalQty}
                </span>
              ) : (
                ''
              )}
            </Link>
          </>
          <div>
            <Dropdown />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
