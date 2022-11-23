'use strict';

const express  = require( 'express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const youtubedl = require('youtube-dl-exec');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: true , credentials :  true}));
app.use(express.static(path.join(__dirname + '/public/build')));
app.get('/',  res => {
  res.sendFile(path.join(__dirname , '/public/build'), 'index.html')
});
//
class M_Array {
  constructor(  ){
    this._arr = new Array ;
  }
  set_media_info( params ){
    this._arr.push(params)
  }
  get_media( id ){
    return this._arr.find( ob => {
      return ob.id === id
    })
  }
  rm_media_info( id ){
    let tar = this.get_media(id) ;
        
    this._arr.splice( this._arr.indexOf(tar) , 1) ;
    fs.unlinkSync( tar.name )
  }
}

var C_Media = new M_Array ;
//
app.get('/info' , (req,res) => {
  var URL = req.query.URL ;
  getVideoInfo( URL , req.query.F , data => {
    var newMedia = {
      url : URL ,
      id : data.display_id ,
      title : data.title ,
      duration : data.duration_string ,
      size : ((
        ( data.filesize !== null ) ? data.filesize : data.filesize_approx
      ) / 1000000).toFixed(2) + 'MB' ,
      media_type : req.query.F ,
      name  : ( req.query.F === 'mp4' ) ?
        data.requested_downloads[0]._filename :
        '.' + (data.requested_downloads[0]._filename.split('.')[1]) + '.' + data.acodec
         
    } ;
    C_Media.set_media_info(newMedia) ;
    res.json({ nM : newMedia }) 
  } )
}) ;

app.get('/media' , (req,res) => {
  res.json( { 
    media : C_Media._arr 
  } )
} )

app.get('/rm' , (req , res) => {
  C_Media.rm_media_info(req.query.ID) ;
  res.end() ;
})

app.get('/download' , async (req,res) => {
  let tar = C_Media.get_media(req.query.ID) ;
  res.download( tar.name ) ;
})

////
app.listen(port, () => {
 console.log(` on port : ${port} `);
});
//

function getVideoInfo ( videoUrl , format , call ) {
  var is_audio = type => {
    return ( type === 'mp3' ) ?
      {
        extractAudio : true ,
        audioFormat : 'best' ,
      } :
      {
        format : 'best'
      }
  } , options = Object.assign( is_audio(format) , {
        noCheckCertificates: true,
        noWarnings: true,
        addHeader: [
          'referer:youtube.com',
          'user-agent:googlebot'
        ] ,
      } );


  youtubedl( videoUrl , Object.assign( options , {
          paths : './output/'  
        } ) ) ;

  youtubedl( videoUrl , Object.assign( options , {
    dumpSingleJson: true ,
    } ) ).then(
      data => {
        call(data)
      } ,
      err => console.error(err)
  );
}

//   https://www.youtube.com/watch?v=MftJQN2f2M0 

////

//var getArgV = str => {
//  let v = process.argv.find( st => {
//    return st === str
//  } )
//  return ( v !== undefined ) ? true : false 
//}

//fs.readFile( __dirname + '/list.txt' , (err, data) => {
//  if (err) {
//    throw err;
//  }
//  
//  async.each( data.toString().split('\n') ,
//    (videoUrl, callback) => {
//      if( videoUrl !== '' ) getVideo(videoUrl , 'download' ,getArgV('mp3') ? 'mp3' : 'mp4' ) ;
//      callback() ;
//    } , 
//    err => { return err ? console.log(err) : '' }
//  )

//});