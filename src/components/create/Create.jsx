import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import './create.scss';

import { ToastContainer, toast } from 'react-toastify'; //! toast step:1
import 'react-toastify/dist/ReactToastify.css';


const Create = () => {
    // console.log(upd);    
    let [title, setTitle] = useState('');
    let [author, setAuthor] = useState('Mr. Chile');
    let [content, setContent] = useState('');
    let history = useNavigate();
    let [disabled, setDisabled] = useState(false);


    const notify = () => toast.success('Blog Created Successfully!',
        { theme: 'dark',position: "top-center" }); //! toast step:2

    function hide() {
        history('/blog');
    }

    function handleSubmit(e) {
        e.preventDefault(e);
        setDisabled(true);
        let toUpd = {
            title,
            author,
            content
        }
        // console.log(toUpd);
        axios.post(`http://localhost:8000/blogs`, toUpd)
            .then(res => {
                // console.log(`blog created successfully!`);
                notify(); //! toast step:4

                setTimeout(() => {
                    history('/blog');
                    
                }, 5000);
            })
            .catch(err => {
                console.log(err.message);
        })
        
    }

  return (
      <div className='create'>
          <h1>Create a New Blog Post </h1>
          <div className="form">
              <form onSubmit={(e)=> handleSubmit(e)}>
                  <label htmlFor="">Title</label>
                  <div></div>
                  <input
                      type="text"
                      name='title'
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      required

                  />
                  <div></div>

                  <label htmlFor="">Content</label>
                  <div></div>
                  <textarea
                      name="content" 
                      cols="60"
                      rows="10"
                      onChange={(e) => setContent(e.target.value)}
                      value={content}
                      required
                  ></textarea>
                  <div></div>

                  <label htmlFor="">Authors: </label>
                  <select
                      name="author"
                      onChange={(e) => setAuthor(e.target.value)}
                      value={author}

                  >
                      <option value="Mr. Chile">Mr. Chile</option>
                      <option value="Mr. Richmond">Mr. Richmond</option>
                      <option value="Mrs. Obi">Mrs. Obi</option>
                      <option value="Mr. Amadi">Mr. Amadi</option>
                      <option value="Mr. Seth">Mr. Seth</option>
                  </select>
                  
          
          <div className="btn">
              <button onClick={()=> hide()}>Cancel</button>
              <button disabled={disabled} >Create Blog</button>
          </div>
                  
              </form>
          </div>

          <ToastContainer /> {/*//! toast step:3  */}
          {/* 
                        //? project 
//? (1) create a prumpt notification componet with the following
//? characteristis: 
    //? a: should pop up only when clicked
    //? b: if yes was clicked, delete a blog post
    //? c: if no was clicked, do not delete any blog post
    //? d: the component true/false states should be able to work independently
        //? even when used by other components
    //? the notofication title and message should be dynamic

//? (2) make the create/update button to switch from working state to
       //? disabled state once the button is clicked. this is meant to
       //? prevent user from sending same resquest many times before redirect
          
          */}
       
      </div>
    
  )
}

export default Create