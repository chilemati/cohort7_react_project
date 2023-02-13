import React from 'react'
import './blog.scss';
// import { blogs } from '../oflline/blogs';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { allBlogs } from '../atom/allBlogs';

const Blog = () => {
  let [blogs, setBlogs] = useState(null);
  let [blogx, setBlogx] = useRecoilState(allBlogs);

  useEffect(() => {
    axios.get('http://localhost:8000/blogs') // this reqest takes time or asynchonous or is a promise, so we need to wait for to get the data or not
      .then(res => {
        // console.log(res.data);
        setBlogs(res.data);
        setBlogx(res.data);
      })
      .catch(err => {
        console.log(err);
    })
  
  }, []);


  return (
      <div className='blogs'>
      <h1>Latest Blogs</h1>
      {/* to use the data in blogs, map through it and render them accordingly */}
      {
       blogs && blogs.map(blog => (
          <div className="blog" key={blog.id}>
            <h2> {blog.title} </h2>
            <p> {blog.content.slice(0,80)}... </p>
            <h5>Author: {blog.author} </h5>
            <Link to={`/blog/${blog.id}`} >Read More</Link>
          </div>
        ))
      }
    </div>
  )
}

export default Blog