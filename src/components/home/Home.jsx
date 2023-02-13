import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { home } from '../notify/home';
import Notify from '../notify/Notify'
import { Diagbox } from '../notify/notify_class'; //? step:1
import './home.scss';

const Home =  ({ title, name, question }) => {
  // your js here
  let [s, setS] = useState('hide');
  let [askh, setAskh] = useRecoilState(home);
  let [style, setStyle] = useState('');
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

  function hide() {
      setS('hide');
  }
  function show() {
    setS('show');
  }

  useEffect(() => {
    if (askh == true) {
      setStyle('bg');
      setAskh(false);
    } else {
      setStyle('');
    }
  }, [s]);

  useEffect(() => { //?step:3
    if (clicked != null) {
      // console.log(clicked);
      
    }
    
  },[clicked])

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
      <div className={'home'}>
      <h1>Welcome to My Home page</h1>
      <p> Good morning {title} {name}! {question()} </p>
      <div>
        <button onClick={()=> show()} >show diag</button>
      </div>

      <Notify
        title={'Notification'}
        msg={'Do you realy want to Delete this Task?'}
        hide={hide}
        s={s}
          
      />
      
      <div className={style}>
        <h2>askh: {`${askh}`} </h2>
      </div>
      <hr />
      {
        myDiag.diag() //?step:4

      }
      <button onClick={() => myDiag.shows()}>show Diagbox</button> {/*//? step:5  */}

      {
        clicked && <div> 
          <h1>Blog Deleted Succesfully!</h1>{/*//?step:6  */}
        
        </div>
      }

      <hr />
     
      
      {
         htm("<h3> heading 3 </h3> <p> paragraph </p> <a> visit jw.org </a>")
        
      }

      {
        tag.current.p.map((x,index) => {
          return <p key={index}> {x} </p>
        })
        
      }
      {
        tag.current.h3.map((x,index) => {
          return <h3 key={index}> {x} </h3>
        })
        
      }
      {
        tag.current.a.map((x,index) => {
          return <a href='http://www.jw.org' target={'_blank'} key={index}> {x} </a>
        })
        
      }

     
     
      
      
      
      
     
      
    </div>
  )
}

export default Home