import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import '../create/create.scss'

import { ToastContainer, toast } from 'react-toastify'; //! toast step:1
import 'react-toastify/dist/ReactToastify.css';

const Update = ({ id, hide, upd }) => {
    // console.log(upd);    
    let [title, setTitle] = useState(upd[0].title);
    let [author, setAuthor] = useState(upd[0].author);
    let [content, setContent] = useState(upd[0].content);
    let history = useNavigate();
    let [disabled, setDisabled] = useState(false);

    const notify = () => toast.success('Blog Updated Successfully!',
        { theme: 'dark',position: "bottom-center" }); //! toast step:2

    function handleSubmit(e) {
        e.preventDefault(e);
        setDisabled(true);
        let toUpd = {
            title,
            author,
            content
        }
        // console.log(toUpd);
        axios.patch(`http://localhost:8000/blogs/${id}`, toUpd)
            .then(res => {
                // console.log(`blog with id of ${id} was updated successfully!`);
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
          <h1>Blog Update for Blog No. {id} </h1>
          <div className="form">
              <form onSubmit={(e)=> handleSubmit(e)}>
                  <label htmlFor="">Title</label>
                   <div></div>
                  <input
                      type="text"
                      name='title'
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}

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
              <button disabled={disabled} >Update Blog</button>
          </div>
                  
              </form>
          </div>
           <ToastContainer /> {/*//! toast step:3  */}
    </div>
  )
}

export default Update