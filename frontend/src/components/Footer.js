import React from 'react'
import { Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer className='absolute w-full bottom-0'>
      <Row>
        <Col className='text-center py-3 bg-gray-100'>
          Copyright &copy; HNPSTORE
        </Col>
      </Row>
    </footer>
  )
}

export default Footer
