import React from 'react' ;
import './compo.css' ;


export function AddBtn () {
    var click = () => {
        let val = document.getElementById('input').value ,
            fom = document.getElementById('input').value ;

        fetch("/info?F=mp3&URL=" + val )
            .then((res) => res.json())
            .then((data) => console.log(data.data));

    }
    return <button onClick={click} >add</button>
}

export function DoAllBtn () {
    return <button>do. all</button>
}

export function DoBtn (props) {
    return <button onClick={() => window.open( "download?URL=" + props.url , '_blank' )} >do.</button>
}

export function Input () {
    return <input type={'url'} id={'input'} placeholder={'Youtube video URL'} />
}