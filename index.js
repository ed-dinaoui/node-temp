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
//

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname , '/public/build'), 'index.html')
});

app.get('/info' , (req,res) => {
  getVideoInfo( req.query.URL , req.query.F , data =>  res.json({data : data})  )
}) ;

app.get('/download' , async (req,res) => {
  res.download( './output/' + req.query.URL ) ;
})
//

app.listen(port, () => {
 console.log(` on port : ${port} `);
});
//




function getVideoInfo ( videoUrl , format , call ) {
  var options = Object.assign( is_audio(format) , {
    noCheckCertificates: true,
    noWarnings: true,
    addHeader: [
      'referer:youtube.com',
      'user-agent:googlebot'
    ] ,
      } ) , is_audio = type => {
        return ( type === 'mp3' ) ?
          {
            extractAudio : true ,
            audioFormat : 'mp3' ,
          } :
          {
            format : 'best'
          }
      } ;

  youtubedl( videoUrl , Object.assign( options , {
    dumpSingleJson: true ,
    } ) ).then(
      data => {
        youtubedl( videoUrl , Object.assign( options , {
          paths : './output/'
          } ) ).then(
            r => call(data) ,
            err => console.error(err)
        )
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