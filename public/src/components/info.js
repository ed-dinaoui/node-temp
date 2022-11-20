import React , { useState } from 'react' ;
import { DoBtn } from './form' ;
import './compo.css' ;
var g_up_fn ;

class M_Array {
    constructor(){
        this._arr = new Array ;
    } ;
    set_media(params , ur){
        var newMedia = {
            title : params.title ,
            url : ur ,
            size : (params.filesize / 1000000).toFixed(2) + 'MB' ,
            duration : params.duration_string ,
        }
        this._arr.push(newMedia) ;
        this.get_media(params.title)['_div'] = <InfoCard p={newMedia} /> ;
        g_up_fn() ;
        console.log(params._type)
    }
    remove_media(n){
        this._arr.splice( this._arr.indexOf(this.get_media(n)) , 1 ) ;
        document.querySelector("."+tr(n)).remove() ;
    }
    get_media(name){
        return this._arr.find(ob => {
            return ob.title === name
        })
    }
}

var tr  = str => {
    return str.split(" ").join("")
}

export var S_Media = new M_Array ;

var InfoCard = props => {
    const [ is , set_is ] = useState(true) ;
    const [ is_audio , set_is_audio ] = useState(true) ;

    return is ? (
        <div className={tr(props.p.title)} >
            <div>
                <p> { props.p.title } </p>
                <p onClick={ e => {
                    set_is(false) ;
                    S_Media.remove_media(props.p.title)
                } } >x</p>
            </div>
            <div>
                <p>{ props.p.duration }</p>
                <p>{ props.p.size } </p>
            </div>
            <div>
                <p onClick={ 
                    e => {
                        set_is_audio( is_audio ? false : true ) ;
                        S_Media.remove_media(props.p.title) ;
                        fetch("/info?F="+ (is_audio ? "mp3" : "mp4") +"&URL=" + props.p.url )
                            .then((res) => res.json())
                            .then((data) => S_Media.set_media(data.data , props.p.url) );
                    }
                } style={ { color : is_audio ? 
                        'var(--color)' :
                        'var(--color-2)' } } >mp3</p>
                <DoBtn url={ props.p.title } c={() => S_Media.remove_media(props.p.title) } />
            </div>
        </div>
    ) : []
}


function Info () {
    const [ up , set_up ] = useState(true) ;
    

    g_up_fn = () =>  set_up(up ? false : true) ;

    var a = [] ;

    S_Media._arr.forEach( ob => {
        a.push( ob._div )
    } )

    return (
        <div>
            {a}
        </div>
    )
}


export default Info ;