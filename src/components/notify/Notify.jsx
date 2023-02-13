import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useRecoilState } from 'recoil';
import { details } from './details';
import { home } from './home';
import './notify.scss'

const Notify = ({ title, msg, hide, s }) => {
    let [ask, setAsk] = useState(null);
    let [askh, setAskh] = useRecoilState(home);
    let [askd, setAskd] = useRecoilState(details);

    function yes() {
        setAsk(true);
    }
    function no() {
        setAsk(false);
        hide();
    }
    
    useEffect(() => {
        if (ask == true) {
            // console.log(ask);
            setAskh(ask);
            setAskd(ask);
            hide();
        } else if (ask == false) {
            // console.log(ask);
            setAskh(ask);
            setAskd(ask);
       }
    },[ask])
    
    return (
        <div className='notify'id={s}>
            <div className="content">
            <div className="header">
                <h3 className="title"> {title?title:'Alert'} </h3>
                <button className="cancel" onClick={()=> hide()}>X</button>
            </div>
            <div className="body">
                <div className="message">
                    <h4 className='notification'> {msg?msg:'Successful'} </h4>
                </div>
                    <div className="btn">
                        <button className="yes" onClick={()=> yes()}>Yes</button>
                        <button className="no" onClick={()=> no()}>No</button>
                    </div>
            </div>

            </div>
    </div>
  )
}

export default Notify