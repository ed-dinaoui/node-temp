import React , { useState } from "react";
import "./compo.css";
import { up_ga_a } from "./info";

export function AddBtn() {
  const [ load , set_load ] = useState(false) ;
  
  var click = () => {
    let val = document.getElementById("input").value ,
        v_l = val.length ;
        
    if(v_l > 20){
      let s = val.slice(8 , v_l ).split('/')[0] ,
          va = ( s.length <= 8 ) ? s.replace('.' , '') : s.split('.')[1] ;
      if( va === 'youtube' ){
        set_load(true) ;
        fetch("/info?F=mp4&URL=" + val)
          .then((res) => res.json())
          .then( d => {
            up_ga_a() ;
            set_load(false) ;
          } ) ;
          
      }else{ alert(' Only youtube , if this a yt video url you better watch a tutorial on how to retrive a Valid one ') }
    }else{ alert('Try again with a valid Url') }
    
  };
  
  return load ? <button>...</button> : (
    <button onClick={click} id={"add_"}>
      add
    </button>
  )
}

export function DoAllBtn() {
  return <button>do. all</button>;
}

export function DoBtn(props) {
  return (
    <button
      onClick={() => {
        window.open("download?ID=" + props.tl, "_blank");
      }}
    >
      do.
    </button>
  );
}

export function Input() {
  return <input type={"url"} id={"input"} placeholder={"Youtube video URL"} />;
}
