import axios from 'axios';
import React, { useEffect, useState ,useRef} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil';
import { allBlogs } from '../atom/allBlogs';
import { details } from '../notify/details';
import Notify from '../notify/Notify';
import Update from '../update/Update';
import { AiFillDelete } from 'react-icons/ai';
import { GrUpdate } from 'react-icons/gr';
import { Diagbox } from '../notify/notify_class'; //? step:1
import './details.scss'


import { ToastContainer, toast } from 'react-toastify'; //! toast step:1
import 'react-toastify/dist/ReactToastify.css';

const Details = () => {
    let { id } = useParams();
    let thisBlog = useRecoilValue(allBlogs);
    let history = useNavigate();
    let [show, setShow] = useState(false);
    let [blg, setBlg] = useState(null);
    let [disabled, setDisabled] = useState(false);
  let tag = useRef(null);


    let [view, setView] = useState('hide');  //?step:2
  let [clicked, setClicked] = useState(null);
  let myDiag = new Diagbox({
    view,
    setView,
    clicked,
    setClicked,
    ask: true,
    msg: 'Do you REALLY want to delete this Blog?'
  });
 
    const notify = () => toast.success('Blog Deleted Successfully!',
        { theme: 'dark',position: "bottom-center" }); //! toast step:2

    function handleDelete() {
        axios.delete(`http://localhost:8000/blogs/${id}`)
            .then(res => {
                // console.log(`blog with id of ${id} was deleted successfully!`);
                notify(); //! toast step:4

                setTimeout(() => {
                    history('/blog');
                    
                }, 5000);
            })
            .catch(err => {
                console.log(err.message);
        })
    }
    
    function showUpdate() { //? causes content of details to hide showing only 
                            //?Update component details
        setShow(true);
    }

    function hideUpdate() {
        setShow(false);
    }
    
    useEffect(() => { //?step:3
        if (clicked != null) {
            console.log(clicked);
      
        }
        
        if (clicked === true) {
            setDisabled(true);
            handleDelete();
        }
    
    }, [clicked]);

    function paras(str) {
        // let str = 'sdiosdisoids idsiods didosdisd s <br> kdosdisods io ds <br> iosdisodisodsodisso';
        let strs = str.includes('<br>' || '<br />');
        let pa='';
        if (strs) {
            let ps = str.split('<br>' || '<br />');
            // console.log(ps);
            // ps.map((p) => {
            //     pa+=`<p> ${p} </p> `;
            // })

            return ps;

    
        } else {
            return [str];
            
        }
    }
    
    function htm(str) {
    let p = [], h1 = [], a = [], h3 = [];
    let tags = ['<p>', '</p>', '<h3>', '</h3>', '<a>', '</a>','<h1>','</h1>'];
    for (let i = 0; i < tags.length;) {
      if (str.indexOf(tags[i]) != -1) {
          let otp= str.indexOf(tags[i]);
        let ctp = str.indexOf(tags[i + 1]);
        let L = tags[i].length + 1;
        let sliced = str.slice(otp, ctp+ L);
        //  delete the sliced from the original
        let txt = str.slice(otp + L, ctp);
        let remain =str.replace(sliced,' ');
        i++;
        switch (tags[i]) {
          case '</p>':
            p.push(txt);
            break;
          case '</h3>':
            h3.push(txt);
            break;
          case '</h1>':
            h1.push(txt);
            break;
          case '</a>':
            a.push(txt);
            break;
  
        }

      }
      i++;
    }
    
    tag.current = { p,h3,h1,a };
      
  }

  return (
      <div className='details'>
          {
            !show && thisBlog && thisBlog.map(blog => {
                if (blog.id == id) {
                    let para = paras(blog.content);
                      return <div key={blog.id} className={'detail'}> 
                          <h1>Blog Details for Blog No. {id} </h1>
                          <h2> {blog.title} </h2>
                          {
                              para.map(p => {
                                  return <div> 
                                      <p> {p} </p>
                                      </div>
                              })
                          }
                          <h5>Author: {blog.author} </h5>

                          <div className="btn">
                              <button onClick={() =>
                                  myDiag.shows()}
                                  title='Delete Blog'
                                  disabled={disabled}
                              > <AiFillDelete />
                                  </button>
                              <button>
                                  <GrUpdate
                                      onClick={() => showUpdate()} title="Update Blog"
                                      className='icon'
                                  />
                                  </button>
                          </div>
                          
                      </div>
                  }                 
             } )
          }
          {
             show && <Update hide={hideUpdate} id={id} upd={thisBlog && thisBlog.filter(blog=> blog.id == id)} />
          }

          {
        myDiag.diag() //?step:4

      }

          <ToastContainer /> {/*//! toast step:3  */}
    </div>
  )
}

export default Details