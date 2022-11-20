import React from 'react' ;
import './compo.css' ;
import { S_Media } from './info' ;


export function AddBtn () {
    var click = () => {
        let val = document.getElementById('input').value ;

        fetch("/info?F=mp3&URL=" + val )
            .then((res) => res.json())
            .then((data) => S_Media.set_media(data.data , data.url) );

    }
    return <button onClick={click} id={"add_"} >add</button>
}

export function DoAllBtn () {
    return <button>do. all</button>
}

export function DoBtn (props) {
    return <button onClick={() => {
        window.open( "download?URL=" + props.url , '_blank' ) ;
        props.c()
    }} >do.</button>
}

export function Input () {
    return <input type={'url'} id={'input'} placeholder={'Youtube video URL'} />
}