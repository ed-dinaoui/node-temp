import React , { useState } from 'react' ;
import './compo.css' ;
import { DoBtn } from './btns' ;

var InfoCard = props => {
    const [ is , set_is ] = useState(true) ;
    const [ is_audio , set_is_audio ] = useState('var(--color-2)') ;

    return is ? (
        <div>
            <div>
                <p> { props.title } </p>
                <p onClick={ () => set_is(false) } >x</p>
            </div>
            <div>
                <p>{ props.duration }</p>
                <p>{ props.size } </p>
            </div>
            <div>
                <p onClick={ 
                    () => 
                    set_is_audio( is_audio ? false : true ) 
                } style={ { color : is_audio ? 
                        'var(--color)' :
                        'var(--color-2)' } } >mp3</p>
                <DoBtn />
            </div>
        </div>
    ) : []
}


function Info () {
    return (
        <div>

            <InfoCard title='video title - can be something' duration='3:15' size='16.1MB' />
            
        </div>
    )
}



export default Info 