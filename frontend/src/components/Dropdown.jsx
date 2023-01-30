import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/userActions'

import { Menu } from '@headlessui/react'
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Link } from 'react-router-dom'

import Loading from './Loader'
import { ModalLog } from './PopupDialog'
import { useStateContext } from '../context/ContextProvider'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Dropdown = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const { loading, setLoading, modal, setModal } = useStateContext()

  function handleOke() {
    setModal(false)
    dispatch(logout())
    setLoading(true)
  }

  return (
    <>
      {loading && <Loading />}
      {modal && (
        <ModalLog
          cancelBtnLog={() => setModal(false)}
          okeBtnLog={() => handleOke()}
          textLog='Are you sure you want to exit? after this you have to log back in.'
        />
      )}

      {userInfo ? (
        <Menu as='div'>
          <Menu.Button className='flex items-center gap-2 cursor-pointer p-1 rounded-lg ml-2 focus:outline-none dark:hover:bg-gray-600 transition-all'>
            <img
              className='rounded-full w-8 h-8'
              src='/images/user.png'
              alt='user-profile'
            />
            <p>
              <span className='hidden md:inline dark:text-gray-300 text-gray-400 text-base transition-all ease-in-out hover:text-gray-300'>
                Hi,
              </span>
              <span className='hidden md:inline dark:text-gray-300 text-gray-500 text-lg font-semibold ml-1 hover:text-gray-400 transition-all ease-in-out'>
                {' '}
                {userInfo.username}
              </span>
            </p>
            <MdKeyboardArrowDown className='hidden md:inline text-gray-400 text-14' />
          </Menu.Button>
          <Menu.Items
            className='dropdown_menu nav-item rounded-lg before:bg-gray-200 bg-gray-200 dark:bg-[#42464D] dark:before:bg-[#42464D] '
            data-aos='fade-down'
          >
            <div className='flex flex-col items-center'>
              <h3 className='text-xl tracking-wide font-medium text-gray-600 dark:text-gray-200'>
                {userInfo.username}
              </h3>
              <span className='text-lg text-gray-700 dark:text-gray-300'>
                Silver
              </span>
            </div>
            <div className='py-1 mt-10'>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to='/profile'
                    className={classNames(
                      active
                        ? 'bg-gray-400 rounded-lg text-gray-900 hover:no-underline'
                        : 'text-gray-700  dark:text-gray-100 border-t border-gray-500 dark:border-gray-100',
                      ' px-4 py-2 text-sm flex gap-3'
                    )}
                  >
                    <AiOutlineUser className='text-lg' />
                    My Profile
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    className={classNames(
                      active
                        ? 'bg-gray-400 rounded-lg text-gray-900 hover:no-underline'
                        : 'text-gray-700  dark:text-gray-100 ',
                      'flex border-t border-gray-500 dark:border-gray-100 hover:border-none border-b w-full px-4 py-2 text-left text-sm gap-3'
                    )}
                    onClick={() => setModal(true)}
                  >
                    <AiOutlineLogout className='text-lg' />
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
          {/* </Transition> */}
        </Menu>
      ) : (
        <Link
          to='/login'
          className='flex items-center ml-2 mt-[2px] cursor-pointer py-1 px-2 hover:bg-cyan-200 rounded-xl'
        >
          <h2 className='text-lg lowercase text-gray-600  dark:text-gray-200  dark:hover:text-gray-600'>
            log in
          </h2>
        </Link>
      )}
    </>
  )
}

export default Dropdown
