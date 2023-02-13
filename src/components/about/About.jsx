import React, {useRef} from 'react'
import { useRecoilValue } from 'recoil'
import { count } from '../atom/count'

const About = () => {
  let goal = useRecoilValue(count);
  let tag= useRef('<h1> heading one </h1>')
  return (
      <div>
      <h1>Welcome to My About Page</h1>
      <h2>Goal is: {goal} </h2>
      <hr />
      <div ref={tag}>
        {
          tag.current='<h3> heading three </h3>'
          }
      </div>
    </div>
  )
}

export default About