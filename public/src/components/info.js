import React from 'react' ;
import './compo.css' ;


function Info (props) {
    return (
        <div>

            <div>
                <div><p> Title could be anything </p> <p>x</p> </div>
                <div><p>3:15</p><p>16.5MB</p></div>
                <div><p>mp3</p>{ props.btn }</div>
            </div>
            
        </div>
    )
}



export default Info 