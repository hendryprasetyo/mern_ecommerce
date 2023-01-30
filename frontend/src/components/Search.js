import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'

const Search = ({ backIcon, className, pIcon, pInput }) => {
  const addClassName = className ? `${className}` : ''
  const pIconClassName = pIcon ? `${pIcon}` : ''
  const pInputClassName = pInput ? `${pInput}` : ''
  const { currentColor, setActiveMenu } = useStateContext()

  const [keyword, setKeyword] = useState('')

  const history = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    setActiveMenu(false)
    if (keyword.trim()) {
      history(`/search/${keyword}`)
    } else {
      history(`/`)
    }
    e.target.reset()
  }

  return (
    <>
      <form
        onSubmit={submitHandler}
        className={`flex items-center ${addClassName}`}
      >
        <label htmlFor='voice-search' className='sr-only'>
          Search
        </label>
        <div className='relative w-11/12 lg:w-[300px]  xl:w-[450px] 2xl:w-[550px]'>
          {backIcon}
          <div
            className={`absolute inset-y-0  ${pIconClassName}  flex items-center pl-3 pointer-events-none`}
          >
            <svg
              aria-hidden='true'
              className='w-5 h-5'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
              style={{ color: currentColor }}
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <input
            type='text'
            id='voice-search'
            className={`bg-gray-50 border focus:outline-none text-gray-900 text-sm rounded-lg block w-full ${pInputClassName} p-2.5  dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white `}
            placeholder='Search Product . . .'
            required
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='hidden lg:inline-flex items-center py-2 px-2 ml-2 text-base font-medium text-white  rounded-lg border focus:outline-none'
          style={{ backgroundColor: currentColor }}
        >
          Search
        </button>
      </form>
    </>
  )
}

export default Search
