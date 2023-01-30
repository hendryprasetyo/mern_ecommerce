import React from 'react'
import ThemeSettings from './ThemeSettings'
import { useStateContext } from '../context/ContextProvider'
import { FiSettings } from 'react-icons/fi'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  const {
    currentMode,
    themeSettings,
    currentColor,
    setThemeSettings,
    activeMenu,
    setActiveMenu,
  } = useStateContext()

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className='flex relative dark:bg-[#20232A]'>
        <div className='fixed right-4 sm:bottom-4 bottom-10 z-[100]'>
          <button
            type='button'
            className='text-2xl p-2 sm:text-3xl sm:p-3 hover:drop-shadow-xl hover:bg-gray-200 text-black animate-spin'
            style={{ background: currentColor, borderRadius: '50%' }}
            onClick={() => setThemeSettings(!themeSettings)}
          >
            <FiSettings />
          </button>
        </div>
        {activeMenu ? (
          <div className='sm:w-72 w-60 z-50 md:z-40 dark:bg-secondary-dark-bg bg-gray-100 fixed'>
            <Sidebar />
          </div>
        ) : (
          <div className='w-0 dark:bg-secondary-dark-bg '>
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-[#20232A] bg-[#FAFBFB] min-h-screen w-screen  '
              : 'bg-[#FAFBFB] dark:bg-[#20232A]  w-screen min-h-screen flex-2 '
          }
        >
          <div className='fixed z-40 md:z-50 p-0 left-0 bg-gray-100 dark:bg-[#33373E] w-full'>
            <Header />
          </div>
          <div
            className='mt-10 p-4 md:p-5 mb-14 max-w-6xl mx-auto'
            onClick={() => setActiveMenu(false)}
          >
            {themeSettings && <ThemeSettings />}
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Layout
