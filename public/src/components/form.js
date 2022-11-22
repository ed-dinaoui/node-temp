import React from "react";
import "./compo.css";
import { up_ga_a } from "./info";

export function AddBtn() {
  var click = () => {
    let val = document.getElementById("input").value ;
        
    if(val.length > 20){
      let s = val.slice(0 , 8).split('/')[0] ,
          va = ( s.length <= 8 ) ? s.replace('.' , '') : s.split('.')[1] ;
      if( va === 'youtube' ){
        fetch("/info?F=mp3&URL=" + val)
          .then((res) => res.json())
          .then((data) => 
            up_ga_a()
          );
      }else{ console.log(' only youtube , if this a yt video url you better watch a tutorial on how to retrive a valid one ') }
    }else{ console.log('type a valid URL') }
    
  };
  return (
    <button onClick={click} id={"add_"}>
      add
    </button>
  );
}

export function DoAllBtn() {
  return <button>do. all</button>;
}

export function DoBtn(props) {
  return (
    <button
      onClick={() => {
        window.open("download?ID=" + props.tl, "_blank");

        fetch("/rm?ID=" + props.tl);
      }}
    >
      do.
    </button>
  );
}

export function Input() {
  return <input type={"url"} id={"input"} placeholder={"Youtube video URL"} />;
}
