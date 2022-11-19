import React , { useEffect } from 'react' ;
import './compo.css' ;
import Axios from 'axios' ;


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
        let val = document.getElementById('input').value ;

        var url = 'Hilary Hahn - J.S. Bach： Partita for Violin Solo No. 1 in B Minor, BWV 1002 - 4. Doubl... [iEBX_ouEw1I].mp3' ;
        const response = Axios.get('/download?URL=' + url, { responseType: 'blob' });
        if (response.data.error) {
            console.log(response.data.error)
        }

        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        const fileName = response.headers['content-disposition'].substring(22, 52);
        fileLink.setAttribute('download', fileName);
        document.body.appendChild(fileLink);
        fileLink.click();
        fileLink.parentNode.removeChild(fileLink)
        
    }
    return (
        <button onClick={click} >do.</button>
    )
}