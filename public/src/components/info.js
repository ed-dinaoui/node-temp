import React , { useState } from 'react' ;
import { DoBtn } from './form' ;
import './compo.css' ;

export var up_ga_a ;


function InfoCard (props) {
    const [ is , set_is ] = useState(true) ;
    const [ info , set_info ] = useState(props.p) ;
    

    return is ? (
        <div className={info.id} >
            <div>
                <p> { info.title } </p>
                <p onClick={ () => {
                    set_is(false) ;
                    fetch("/rm?ID="+info.id) ;
                } } >x</p>
            </div>
            <div>
                <p>{ info.duration }</p>
                <p>{ info.size } </p>
            </div>
            <div>
                <p onClick={ 
                    () => {
                        let f = ( info.media_type === 'mp3' ) ? 'mp4' : 'mp3' ;
                        fetch('/rm?ID=' + info.id ) ;
                        fetch(`/info?F=${f}&URL=${info.url}`)
                            .then(res => res.json())
                            .then(
                                data =>   
                                    set_info(data.nM) 
                            ) ;
                        
                        
                    }
                } style={ { color : ( info.media_type === 'mp3' ) ?
                     'var(--color)' : 
                    'var(--color-2)'  } } >mp3</p>
                <DoBtn tl={info.id} />
            </div>
        </div>
    ) : []
}


function Info () {
    const [ a , set_a ] = useState([])
    
    up_ga_a = () => {
        fetch("/media")
        .then(res => res.json())
        .then(data => {
            data.media.forEach(ob => {
                set_a( a.concat(<InfoCard p={ob} />) ) ;
            } ) 
        }) ;
    } ;
    
    
    
    
    
    
    return (
        <div>
            {a}
        </div>
    )
}





export default Info ;