import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, path, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <Pagination className='flex gap-2'>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `${path}/page/${x + 1}`
                : `/admin/productlist/page/${x + 1}`
            }
          >
            <button
              className={`${
                x + 1 === page
                  ? 'bg-gray-500 w-8 h-8 text-white'
                  : 'bg-gray-200 w-8 h-8 hover:bg-gray-300 text-gray-800'
              }`}
            >
              {x + 1}
            </button>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
