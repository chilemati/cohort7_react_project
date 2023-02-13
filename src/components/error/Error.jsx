import React from 'react'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
      <div>
          <h1>404</h1>
          <h3>Ooops!, Page does not exist <Link to={'/'} >Home</Link> </h3>
    </div>
  )
}

export default Error