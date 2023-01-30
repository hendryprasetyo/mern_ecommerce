import React from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { AiOutlineHome, AiOutlineClose, AiFillHome } from 'react-icons/ai'
import { BiRocket } from 'react-icons/bi'
import { FaShoppingCart, FaRocket, FaClipboardList } from 'react-icons/fa'
import { MdOutlineCreate, MdCreate } from 'react-icons/md'
import {
  HiOutlineClipboardList,
  HiUserGroup,
  HiOutlineUserGroup,
} from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import { NavButton } from './Header'
import Search from './Search'
import { useLocation } from 'react-router-dom'
const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu } = useStateContext()
  const { pathname } = useLocation()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const totalQty = cartItems.reduce((acc, item) => acc + item.qty, 0)

  const activeLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2 hover:no-underline'
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-gray-100 dark:hover:bg-gray-500 m-2 hover:bg-gray-300 hover:no-underline'

  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      {activeMenu && (
        <>
          <div className='md:mt-[3.6rem]'>
            <div>
              <div className='flex md:hidden mt-[0.6rem] gap-12 '>
                <Link
                  to={'/'}
                  className='items-center flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900 hover:no-underline ml-3'
                >
                  <span>HNPSTORE</span>
                </Link>
                <NavButton
                  title='Menu'
                  customFunc={() => setActiveMenu(false)}
                  color={currentColor}
                  icon={<AiOutlineClose />}
                />
              </div>
              <div className='md:hidden flex items-center my-2 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5'></div>

              <Search pInput='pl-11' className='lg:hidden pt-3 ml-1' />
              <p className='text-gray-400 dark:text-gray-400 m-3 md:pt-6 uppercase'>
                Dashboard
              </p>
              <NavLink
                to={'/'}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                onClick={() => setActiveMenu(false)}
              >
                {pathname === '/' ? (
                  <AiFillHome className='text-black' />
                ) : (
                  <AiOutlineHome />
                )}
                <span className='capitalize'>home</span>
              </NavLink>
              <NavLink
                to={'/cart'}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                onClick={() => setActiveMenu(false)}
              >
                {pathname === '/cart' ? (
                  <FaShoppingCart className='text-black' />
                ) : (
                  <FiShoppingCart />
                )}
                <span className='capitalize '>Cart</span>
                {totalQty !== 0 ? (
                  <span
                    className={
                      'w-5 h-5 bg-red-500 text-white text-center rounded-full ml-12 md:ml-28'
                    }
                  >
                    {totalQty}
                  </span>
                ) : (
                  ''
                )}
              </NavLink>
              <NavLink
                to={'/productlist'}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : '',
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
                onClick={() => setActiveMenu(false)}
              >
                {pathname === '/productlist' ? (
                  <FaClipboardList className='text-black' />
                ) : (
                  <HiOutlineClipboardList />
                )}
                <span className='capitalize '>Product</span>
              </NavLink>
              {userInfo && (
                <>
                  <NavLink
                    to={'/myorders'}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    onClick={() => setActiveMenu(false)}
                  >
                    {pathname === '/myorders' ? (
                      <FaRocket className='text-white' />
                    ) : (
                      <BiRocket />
                    )}
                    <span className='capitalize '>My Order</span>
                  </NavLink>
                </>
              )}
            </div>
          </div>
          {userInfo && userInfo.isAdmin && (
            <div className='mt-10 '>
              <div>
                <p className='text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase'>
                  Admin Dashboard
                </p>
                <NavLink
                  to={'/admin/userlist'}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : '',
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  onClick={() => setActiveMenu(false)}
                >
                  {pathname === '/admin/userlist' ? (
                    <HiUserGroup className='text-black' />
                  ) : (
                    <HiOutlineUserGroup />
                  )}
                  <span className='capitalize '>User List</span>
                </NavLink>
                <NavLink
                  to={'/admin/orderlist'}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : '',
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  onClick={() => setActiveMenu(false)}
                >
                  {pathname === '/admin/orderlist' ? (
                    <FaRocket className='text-black' />
                  ) : (
                    <BiRocket />
                  )}
                  <span className='capitalize '>Orde List</span>
                </NavLink>
                <NavLink
                  to={'/admin/productlist'}
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? currentColor : '',
                  })}
                  className={({ isActive }) =>
                    isActive ? activeLink : normalLink
                  }
                  onClick={() => setActiveMenu(false)}
                >
                  {pathname === '/admin/productlist' ? (
                    <MdCreate className='text-black' />
                  ) : (
                    <MdOutlineCreate />
                  )}
                  <span className='capitalize '>Create Product</span>
                </NavLink>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Sidebar
