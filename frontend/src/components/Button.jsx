import React from 'react'

const Button = ({
  className = 'bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 py-2.5 px-5',
  icon,
  children,
  color,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${className} text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mr-2  focus:outline-none dark:focus:ring-blue-800 flex items-center gap-2`}
      style={{ backgroundColor: color }}
    >
      {icon}
      {children}
    </button>
  )
}

export default Button
