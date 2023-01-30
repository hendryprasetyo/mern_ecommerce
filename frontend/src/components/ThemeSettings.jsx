import React from 'react'
import { MdOutlineCancel } from 'react-icons/md'
import { BsCheck } from 'react-icons/bs'

import { themeColors } from '../data/dummy'
import { useStateContext } from '../context/ContextProvider'
import '../style/toggleDarkmode.css'

const ThemeSettings = () => {
  const {
    setColor,
    checked,
    setChecked,
    setCurrentMode,
    currentColor,
    setThemeSettings,
  } = useStateContext()

  const handleChange = () => {
    setChecked(!checked)
    setCurrentMode(!checked ? 'Dark' : 'Light')
  }

  return (
    <div className='w-screen fixed nav-item top-0 right-[-32px] z-50 flex  justify-between'>
      <div
        className='bg-half-transparent w-full h-screen'
        onClick={() => setThemeSettings(false)}
      ></div>
      <div className='float-right h-screen dark:text-gray-200  bg-gray-100 dark:bg-[#484B52] w-[300px] sm:w-[400px]'>
        <div className='flex justify-between items-center p-4 ml-4'>
          <p className='font-semibold text-lg'>Settings</p>
          <button
            type='button'
            onClick={() => setThemeSettings(false)}
            style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
            className='text-2xl p-3 hover:drop-shadow-xl hover:bg-[#f7f7f7]'
          >
            <MdOutlineCancel />
          </button>
        </div>
        <div className='flex-col border-t-1 border-color p-4 ml-4'>
          <p className='font-semibold text-xl '>Theme Option</p>
          <label className='switch'>
            <input
              type='checkbox'
              onChange={handleChange}
              name='theme'
              value='Dark'
              checked={checked}
            />
            <span className='slider' />
          </label>
        </div>
        <div className='p-4 border-t-1 border-color ml-4 '>
          <p className='font-semibold text-xl '>Theme Colors</p>
          <div className='flex gap-3'>
            {themeColors.map((item, index) => (
              <div
                className='relative mt-2 cursor-pointer flex gap-5 items-center'
                key={index}
              >
                <button
                  type='button'
                  className='h-10 w-10 rounded-full cursor-pointer'
                  style={{ backgroundColor: item.color }}
                  onClick={() => setColor(item.color)}
                >
                  <BsCheck
                    className={`ml-2 text-2xl text-black ${
                      item.color === currentColor ? 'block' : 'hidden'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeSettings
