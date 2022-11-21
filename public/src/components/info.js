import React , { useState } from 'react' ;
import { DoBtn } from './form' ;
import './compo.css' ;




var InfoCard = props => {
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
                <DoBtn tl={[info.title , info.id]} />
            </div>
        </div>
    ) : []
}


function Info (props) {
    var a = [] ;
    a.push(<InfoCard p={props.da} />) ;
    
    fetch("/media?ID=all")
    .then(res => res.json())
    .then(data => {
        data.media.forEach(ob => a.push(<InfoCard p={ob} />)) 
    }) ;
    
    console.log('a  : '+ a.toString())
    return (
        <div>
            {a}
        </div>
    )
}





export default Info ;