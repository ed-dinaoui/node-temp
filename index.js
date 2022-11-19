'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path') ;
var fs = require('fs');
var youtubedl = require('youtube-dl-exec');
var async = require('async');
const { pathToFileURL } = require('url');
const port = process.env.PORT || 3000;

app.use(cors({ origin: true , credentials :  true}));

app.use(express.static(path.join(__dirname, 'public/build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/build', 'index.html'))
});

app.get('/info' , (req,res) => {
  var URL = req.query.URL ;
  getVideoInfo( URL , 'mp3' , (data) => { res.json({data : data}) } )
}) ;

app.get('/download' , cors({
      exposedHeaders: ['Content-Disposition'],
  }), (req,res) => {
  var URL = req.query.URL ;
  console.log( __dirname + '/output/' + URL) ;

  const stream = fs.createReadStream( pathToFileURL(__dirname + '/output/' + URL) );
  res.set({
    'Content-Disposition': `attachment; filename='${URL}'`,
    'Content-Type': 'audio/mp3',
  });
  stream.pipe(res);

})


app.listen(port, () => {
 console.log(` on port : ${port} `);
});




var is_audio = type => {
  return ( type === 'mp3' ) ? 
      { 
        extractAudio : true , 
        audioFormat : 'mp3' 
      } : 
      { format : 'best' } ;
}

var getVideoInfo = ( videoUrl , format , call ) => {
  youtubedl( videoUrl , Object.assign( is_audio(format) , {
    noCheckCertificates: true,
    noWarnings: true,
    addHeader: [
      'referer:youtube.com',
      'user-agent:googlebot'
    ] ,
    dumpSingleJson: true,
  })).then(
    data => {
      console.log('title : ' , data.title) ;
      call(data)
    } ,
    err => console.log(err)
  );
}


var getVideo = (videoURL , format , call) => {
  
  youtubedl( videoURL , Object.assign( is_audio(format) , {
    noCheckCertificates: true,
    noWarnings: true,
    addHeader: [
      'referer:youtube.com',
      'user-agent:googlebot'
    ] ,
    paths : __dirname + '/output/'
  })).then(
    err => console.log(err)
  );
  call()
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