import React from 'react' ;
import './compo.css' ;


export function AddBtn (props) {
    var click = () => {
        let val = document.getElementById('input').value ;
        // input checks
        fetch("/info?F=mp3&URL=" + val )
        .then(res => res.json())
        .then(data => {
            console.log('addbtn.sw  :  '+data.nM)
            props.sw(data.nM)
        })

    }
    return <button onClick={click} id={"add_"} >add</button>
}

export function DoAllBtn () {
    return <button>do. all</button>
}

export function DoBtn (props) {
    return <button onClick={() => {
        window.open( "download?URL=" + props.tl[0] , '_blank' ) ;
        
        fetch( "/rm?ID=" + props.tl[1] )
        
    }} >do.</button>
}

export function Input () {
    return <input type={'url'} id={'input'} placeholder={'Youtube video URL'} />
}