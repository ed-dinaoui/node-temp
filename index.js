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
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname , '/public/build'), 'index.html')
});
//
//
class M_Array {
  constructor(  ){
    this._arr = new Array ;
  }
  set_media_info( params ){
    var ob = new Object ;
    for( let i = 0 ; i < params.length ; i++ ){
      ob[Object.keys(params)[i]] = Object.values(params)[i]
    }
    this._arr.push(ob)
  }
  get_media( id ){
    return this._arr.find( ob => {
      return ob.id === id
    })
  }
  rm_media_info( id ){
    let tar = this.get_media(id) ,
        t_p = "./output/" + tar.title ;
        
    this._arr.splice( this._arr.indexOf(tar) , 1) ;
    if( fs.existsSync( t_p ) ){
      fs.unlink( t_p , err => { if( err ){ throw err } })
    }
  }
}

var C_Media = new M_Array ;
//
app.get('/info' , (req,res) => {
  var URL = req.query.URL ;
  getVideoInfo( URL , req.query.F , data => {
    var newMedia = {
      url : URL ,
      id : data.channel_id + req.query.F ,
      title : data.title ,
      duration : data.duration_string ,
      size : (data.filesize / 1000000).toFixed(2) + 'MB' ,
      media_type : req.query.F 
    }
    C_Media.set_media_info(newMedia) ;
    res.json({ nM : newMedia }) 
  } )
}) ;

app.get('/media' , (req,res) => {
  res.json( { 
    media : (req.query.ID === 'all') ? C_Media._arr : C_Media.get_media(req.query.ID)
  } )
} )

app.get('/rm' , (req , res) => {
  C_Media.rm_media_info(req.query.ID)
})

app.get('/download' , async (req,res) => {
  res.download( './output/' + req.query.URL ) ;
})
//

app.listen(port, () => {
 console.log(` on port : ${port} `);
});

//var mf = ( p ) => {
//
//  if(fs.existsSync( p.t )){
//    fs.unlink( p.t , err => {
//      if(err) { throw err } ;
//      mf(p)
//    } )
//  }else{
//    youtubedl( p.url , Object.assign( p.opts , {
//      paths : './output/' 
//      } ) ).then(
//        r => p.c(p.d) ,
//        err => console.error(err)
//    )
//  }
//}


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
        //var n = data.title ,
        //    f = ( format === 'mp3' ) ? 'mp4' : 'mp3' ;
            
        youtubedl( videoUrl , Object.assign( options , {
          paths : './output/'
        } ) ).then(
          r => call(data) ,
          err => console.error(err)
        )
          
        //mf({
        //  url : videoUrl ,
        //  t : './output/'+ n + '.' + f , 
        //  d : data ,
        //  opts : options ,
        //  c : call
        //})
        
      }
      
       ,
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