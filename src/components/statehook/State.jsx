import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { count } from '../atom/count';
import './state.scss'

const State = () => {
    // ! All hooks must be decleared here b4 any other codes
    //* useState template:
    //? let [changingValue,setChangingvalue] = useState(inial_value_of_changingValue);
    //? let [count, setCount] = useState(0);
    //? to update count, use setCount(c=c+1);
    let [c, setC] = useState(0);
    let [name, setName] = useState('Chile');
    let names = ['Richmond', 'Seth', 'Lilian', 'Godfirst'];
    let inialStyle = {
        backgroundColor: 'red',
        padding: '1rem',
        margin: '1rem',
        fontSize: '2vw',
        color: 'white',
    };
    let [styling, setStyling] = useState(inialStyle);
    let [cart, setCart] = useState(0);
    let [goal, setGoal] = useRecoilState(count);
    let [state, setState] = useState('state');

    useEffect(() => {
        // setInterval(() => {
        //     setCart(cart = cart + 1);
        
        // }, 1000);
            setCart(cart = cart + 1);
    },[styling,c])


    function add() {
        c++;
        setC(c);
        // console.log(c);
    }
    let i = 0;
    function updateName() {
        i++;
        setName(names[i]);
    }
    function greenStyle() {
        setStyling({ ...inialStyle, ...{backgroundColor:'green'}});
    }
    function grayStyle() {
        setStyling({ ...inialStyle, ...{backgroundColor:'gray',color:'blue'}});
    }
    function brownStyle() {
        setStyling({ ...inialStyle, ...{backgroundColor:'brown'}});
    }
    function defaultStyle() {
        setStyling({ ...inialStyle, ...{backgroundColor:'red'}});
    }
    function handleGoal() {
        if (goal % 2 == 0) {
            setState('dark');
            
        } else if (goal % 3 == 0) {
            setState('purple');
        } else if (goal % 2 == 1) {
            setState('state');
        } else if (goal % 4 == 1) {
            setState('white');
        }
        setGoal(goal = goal + 1);
    }

  return (
      <div className={state}>
          <hr />

          <h1>Learning how to use State Hook</h1>
          {/* <h1>Count: {c} </h1>
          <button onClick={() => add()}>++</button>
          <hr />
          <h1>My first Name is {name} </h1>
          <button onClick={() => updateName()}>Change Name</button>
          <hr />
          <div className="box" style={styling}>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi corrupti assumenda pariatur tempora recusandae in iste quam distinctio voluptas impedit fugit, fugiat eum inventore alias aliquam! Molestiae velit vel reprehenderit?</p>
              <button onClick={()=> greenStyle()}>Green Style</button>
              <button onClick={()=> brownStyle()}>Brown Style</button>
              <button onClick={()=> grayStyle()}>Gray Style</button>
              <button onClick={()=> defaultStyle()}>Default Style</button>
          </div>
           <hr />
          <div className="useEffect">
              <h1>useEffect</h1>
              <h3>Cart [{cart}]</h3>
          </div> */}

          <div className="atom">
              <h2>Goal: {goal} </h2>
              <button onClick={()=> handleGoal() }>add Goal</button>
          </div>

          <hr />
    </div>
  )
}

export default State