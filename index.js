'use strict';

const express  = require( 'express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const youtubedl = require('youtube-dl-exec');
const app = express();
const port = process.env.PORT || 3000;
const fo_ms = [ 'mp3' , 'mp4' ] ;

app.use(cors({ origin: true , credentials :  true}));
app.use(express.static(path.join(__dirname + '/public/build')));
//

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname , '/public/build'), 'index.html')
});

app.get('/info' , (req,res) => {
  var URL = req.query.URL ;
  getVideoInfo( URL , req.query.F , data =>  res.json({data : data , url : URL})  )
}) ;

app.get('/download' , async (req,res) => {
  res.download( './output/' + req.query.URL ) ;
})

//

app.listen(port, () => {
 console.log(` on port : ${port} `);
});
//

var mf = ( p ) => {

  if(fs.existsSync( p.t )){
    fs.unlink( p.t , err => {
      if(err) { throw err } ;
      mf(p)
    } )
  }else{
    youtubedl( p.url , Object.assign( p.opts , {
      paths : './output/' 
      } ) ).then(
        r => p.c(p.d) ,
        err => console.error(err)
    )
  }
}


function getVideoInfo ( videoUrl , format , call ) {
  var is_audio = type => {
    return ( type === 'mp3' ) ?
      {
        extractAudio : true ,
        audioFormat : 'mp3' ,
      } :
      {
        format : 'mp4'
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
    dumpSingleJson: true ,
    } ) ).then(
      data => {
        var n = data.title ,
            f = ( format === 'mp3' ) ? 'mp4' : 'mp3' ;
        
        mf({
          url : videoUrl ,
          t : './output/'+ n + '.' + f , 
          d : data ,
          opts : options ,
          c : call
        })
      } ,
      err => console.error(err)
  );
}



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

//// donwload
//app.get('/download' , (req,res) => {
//  var URL = req.query.URL ;
//  getVideo( URL , 'not_info' , 'mp3' )
//})
////