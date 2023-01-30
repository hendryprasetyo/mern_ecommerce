import React from 'react'
import { BsQuestionCircle } from 'react-icons/bs'

export const ModalLog = ({ cancelBtnLog, okeBtnLog, textLog }) => {
  return (
    <div className='min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none'>
      <div className='absolute bg-black opacity-80 inset-0 z-0' />
      <div
        className='w-11/12 sm:w-full max-w-md relative mx-auto my-auto rounded-xl shadow-lg bg-gray-100 dark:bg-gray-900'
        data-aos='zoom-in'
        data-aos-duration='500'
      >
        {/*content*/}
        {/*body*/}
        <div className='text-center p-4 flex-auto justify-center'>
          <div className='text-[6rem] mb-[-10px] flex justify-center text-red-500 mx-auto'>
            <BsQuestionCircle />
          </div>
          <h2 className='text-xl font-bold mt-8 pb-2 text-gray-800 dark:text-gray-100'>
            Are you sure?
          </h2>
          <p className='text-base text-gray-500 dark:text-gray-400'>
            {textLog}
          </p>
        </div>
        {/*footer*/}
        <div className='text-center space-x-4 md:block mb-3'>
          <button
            className='mb-2 md:mb-0 bg-gray-300 dark:bg-gray-200 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-900 rounded-full hover:shadow-lg hover:bg-gray-200 dark:hover:bg-gray-300'
            onClick={() => cancelBtnLog()}
          >
            Cancel
          </button>
          <button
            className='mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600'
            onClick={() => okeBtnLog()}
          >
            Oke
          </button>
        </div>
      </div>
    </div>
  )
}

export const ModalDel = ({ cancelBtn, okeBtn, text }) => {
  return (
    <div className='min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none'>
      <div className='absolute bg-black opacity-80 inset-0 z-0' />
      <div
        className='w-11/12 sm:w-full max-w-md relative mx-auto my-auto rounded-xl shadow-lg bg-gray-100 dark:bg-gray-900'
        data-aos='zoom-in'
        data-aos-duration='500'
      >
        {/*content*/}
        {/*body*/}
        <div className='text-center p-4 flex-auto justify-center'>
          <div className='text-[6rem] mb-[-10px] flex justify-center text-red-500 mx-auto'>
            <BsQuestionCircle />
          </div>
          <h2 className='text-xl font-bold mt-8 pb-2 text-gray-800 dark:text-gray-100'>
            Are you sure?
          </h2>
          <p className='text-base text-gray-500 dark:text-gray-400'>{text}</p>
        </div>
        {/*footer*/}
        <div className='text-center space-x-4 md:block mb-3'>
          <button
            className='mb-2 md:mb-0 bg-gray-300 dark:bg-gray-200 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-900 rounded-full hover:shadow-lg hover:bg-gray-200 dark:hover:bg-gray-300'
            onClick={() => cancelBtn()}
          >
            Cancel
          </button>
          <button
            className='mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600'
            onClick={() => okeBtn()}
          >
            Oke
          </button>
        </div>
      </div>
    </div>
  )
}
