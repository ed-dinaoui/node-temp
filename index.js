'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path') ;
var fs = require('fs');
var youtubedl = require('youtube-dl-exec');
var async = require('async');
const port = process.env.PORT || 3000;

app.use(cors({ origin: true , credentials :  true}));
//
//
//app.listen(4000, () => {
//    console.log('Server Works !!! At port 4000');
//});
//
//app.use(express.static(path.join(__dirname, 'public')));
//
//
app.use(express.static(path.join(__dirname, 'public/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/build', 'index.html'))
});

app.listen(port, () => {
 console.log(`on port :${port}`);
});


/////

// add

app.get( '/info' , (req,res) => {
  var URL = req.query.URL ;
  getVideo( URL , 'info' , 'mp3' )
} )


//
// donwload

app.get('/download' , (req,res) => {
  var URL = req.query.URL ;
  getVideo( URL , 'not_info' , 'mp3' )
})

//


var getVideo = (videoURL, operation ,format , output) => {

  let is_audio = ( format === 'mp3' ) ? 
      { 
        extractAudio : true , 
        audioFormat : 'mp3' 
      } : 
      { format : 'best' } ,
      what = ( operation === 'info' ) ? 
      { dumpSingleJson : true } : 
      { } ;
  
  //
  youtubedl( videoURL , Object.assign( is_audio , {
    noCheckCertificates: true,
    noWarnings: true,
    addHeader: [
      'referer:youtube.com',
      'user-agent:googlebot'
    ] ,
  }, what )).then(
    data => {
      if( operation === 'info' ) {
        output = data
      }
    }
    , err => console.log(err)
  );

  //youtubedl( videoURL , Object.assign( { dumpSingleJson: true } , is_audio ) ).then(data => console.log(data.title) , err => console.log(err))
}

var getArgV = str => {
  let v = process.argv.find( st => {
    return st === str
  } )
  return ( v !== undefined ) ? true : false 
}

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

module.exports = { getVideo } ;