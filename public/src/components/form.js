import React from "react";
import "./compo.css";
import { up_ga_a } from "./info";

export function AddBtn() {
  var click = () => {
    let val = document.getElementById("input").value;
    // input checks
    fetch("/info?F=mp3&URL=" + val)
      .then((res) => res.json())
      .then((data) => 
        up_ga_a()
      );
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
