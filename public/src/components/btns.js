import React , { useEffect } from 'react' ;
import './compo.css' ;


export function AddBtn (props) {
    var click = () => {
        let val = document.getElementById('input').value ;

        fetch("/info?URL="+val)
            .then((res) => res.json())
            .then((data) => console.log(data.data));

    }
    return(
        <button onClick={click} >add</button>
    )
}

export function DoAllBtn () {
    return (
        <button>do. all</button>
    )
}

export function DoBtn () {
    var click = e => {
        let val = document.getElementById('input').value ,
            loc = window.location.href ;
        window.location.href += 'download?URL=' + val
    }
    return (
        <button onClick={click} >do.</button>
    )
}