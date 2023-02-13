import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { count } from '../atom/count'
import './nav.scss'
const Nav = () => {
  let goal = useRecoilValue(count);
  return (
      <div className='nav'>
          <div className="logo"><Link to={'/'} >Logo</Link></div>
          <div className="blog"><Link to={'/blog'} >blog</Link></div>
      <div className="about"><Link to={'/about'} >about</Link></div>
      <div className="goal">Goal [ {goal} ] </div>
      <div className="create"> <Link to={'/create'}>Create-Blog</Link> </div>
          <div className="more">&#9776;</div>
    </div>
  )
}

export default Nav