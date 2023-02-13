import React from 'react'
import Nav from '../components/nav/Nav'
import './grid.css'

const Grid = () => {
  return (
      <div className='grid'>
      <div className="navs">
        <Nav />
          </div>
          <div className="content">contents</div>
          <div className="aside"> asides</div>
          <div className="ads">adverts</div>
          <div className="footer">footer</div>
    </div>
  )
}

export default Grid