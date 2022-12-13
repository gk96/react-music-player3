// const express = require("express");
// const router = express.Router();
// const bodyParser = require('body-parser');
// const youtubedl = require('youtube-dl-exec');
// const fs = require('fs');
// var http = require("https");
// var ySearch = require('./helpers/Youtube-Search-Helper/index');
// const jsonParser = bodyParser.json();
// var got = require('got');
// var gotResume = require('got-resume-next');
// const { response } = require("express");
// const ytdl = require("ytdl-core");
// const UUID = require('pure-uuid');



// router.get("/related-videos", async (req, res) => {
//   console.log(req.query.videoId)

//   const result = await ySearch.relatedVideos(req.query.videoId);

//   // console.log(result);
//   res.send(result);
// });

// router.get("/suggest-search", async (req, res) => {
//     console.log(req.query.q);

//     // let result = await ySearch.search(req.body.searchKey);
//     let response = await got(`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${req.query.q}`)
//     console.log(response.body)
//     res.send(response.body)
//     // console.log(result);
//     //res.send(200);

// })

// router.post("/search-by-id", jsonParser, async (req, res) => {
//   console.log(req.body);

//   const result = await ySearch.searchVideoById(req.body.videoId);

//   // console.log(result);
//   res.send(result);

// })


// router.post("/search", jsonParser, async (req, res) => {
//     console.log(req.body);

//     const result = await ySearch.search(req.body.searchKey);

//     // console.log(result);
//     res.send(result);

// })

// router.post("/download-video-parts", jsonParser, async (req, res) => {

//   console.log(req.body.videoUrl)

//   //got.stream(req.body.videoUrl).pipe(res);
//   //gotResume(req.body.videoUrl, { attempts: 0 }).pipe(res);
//   // got(req.body.videoUrl, {retry: 0, isStream: true}).pipe(res);
//   got(req.body.videoUrl, {retry: { limit: 0, methods: ["GET", "POST"] } , isStream: true}).pipe(res); 
//   //stream.pipe()
//   //http.get(req.body.videoUrl, res => res.pipe(fs.createWriteStream('some.mp3')));
  
// })

// router.post("/download-video-ytdl-player1", jsonParser, async (req, res) => {
//   console.log(req.query.videoUrl)

//   ytdl(req.query.videoUrl, { 
//     filter: "audioonly" ,
//     quality: "lowestaudio",
 
//   }).pipe(res)
// })

// router.get("/download-video-ytdl-player2", jsonParser, async (req, res) => {
//   console.log(req.query.videoUrl, "player2 - API")

//   const range = req.headers.range;
//   if (!range) {
//       res.status(400).send("Requires Range header");
//   }
//   const start = Number(range.replace(/\D/g, ""));
//   // const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

//   const CHUNK_SIZE = 10 ** 6;

//   ytdl(req.query.videoUrl, { 
//     filter: "audioonly" ,
//     quality: "lowestaudio",
//   }).once("response", response => {

//     const end = Math.min(start + CHUNK_SIZE, response.headers["content-length"] - 1);

//     const contentLength = end - start + 1;

//     console.log(start, end)
    
//     const headers = {
//       "Content-Range": `bytes ${start}-${end}/${response.headers["content-length"]}`,
//       "Accept-Ranges": "bytes",
//       "Content-Length": contentLength,
//       "Content-Type": "audio/webm",
//     };

//   res.writeHead(206, headers);

//     ytdl(req.query.videoUrl, { 
//       filter: "audioonly" ,
//       quality: "lowestaudio",
//       range: {
//         start: start,
//         end: end
//       }
//     }).pipe(res)

//   })

// })

// router.get("/download-video-ytdl-test", jsonParser, async (req, res) => {

//   console.log(req.query.videoUrl)

//   const range = req.headers.range;
//   if (!range) {
//       res.status(400).send("Requires Range header");
//   }
//   const start = Number(range.replace(/\D/g, ""));
//   // const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
//   const CHUNK_SIZE = 10 ** 6;
  
  
  
//   //const filePath = tempWrite.sync('unicorn');

//   const id = new UUID(4).format();
//   const path = `C:/Users/gauth/AppData/Local/Temp/${id}.mp3`

//   try{
//   ytdl(req.query.videoUrl, { 
//     filter: "audioonly" ,
//     quality: "lowestaudio",
 
//   }).pipe(fs.createWriteStream(path))
//   .on("finish", () =>{

//     console.log(path)

  
//   const audioSize = fs.statSync(path).size;
//   console.log(audioSize)

//   const end = Math.min(start + CHUNK_SIZE, audioSize - 1);

//   const contentLength = end - start + 1;

//   const headers = {
//     "Content-Range": `bytes ${start}-${end}/${audioSize}`,
//     "Accept-Ranges": "bytes",
//     "Content-Length": contentLength,
//     "Content-Type": "audio/webm",
//   };

//   res.writeHead(206, headers);

//   const audioStream = fs.createReadStream(path, {start, end});
//   console.log(start, end)
  
//   audioStream.pipe(res).on("finish", () => {
//       fs.unlinkSync(path)
//   });

//   })
// }
// catch(err){
//   console.log(err)
// }
// finally{
//   if(fs.existsSync(path))
//     fs.unlinkSync(path)
// }

  
  
  

  


//     //cleanup();

// //   ytdl(req.query.videoUrl, { 
// //       filter: "audioonly" ,
// //       quality: "lowestaudio",
// //   })
// //   .once("response", response => {
// //     // If you want to set size of file in header
// //     end = Math.min(start + CHUNK_SIZE, response.headers["content-length"] - 1);
// //     const headers = {
// //       "Content-Range": `bytes ${start}-${end}/${response.headers["content-length"]}`,
// //       "Accept-Ranges": "bytes",
// //       "Content-Length": end - start + 1,
// //       "Content-Type": response.headers["content-type"],
// //     };
// //     res.writeHead(206, headers);
// //   });
  
// //   ytdl(req.query.videoUrl, { 
// //     filter: "audioonly" ,
// //     quality: "lowestaudio",
// //     range: {
// //       start: start,
// //       end: end
// //     }
// // }).pipe(res);

  
//   //got.stream(req.body.videoUrl).pipe(res);

// })

// router.post("/download-video", jsonParser, async (req, res) => {

//   console.log(req.body.videoUrl)

//   got.stream(req.body.videoUrl).pipe(res);

// })

// router.post("/get-video-details", jsonParser, async (req, res) => {

//     console.log(req.body);
//     // https://www.youtube.com/watch?v=B2DGTD1Heg4
//     let youtube_url = req.body.url
//     var output = await youtubedl(youtube_url, {
//         dumpSingleJson: true,
//         noWarnings: true,
//         noCallHome: true,
//         noCheckCertificate: true,
//         preferFreeFormats: true,
//         youtubeSkipDashManifest: true,
//         cookies: './cookies.txt',
//         forceIpv4: true
//         //sourceAddress: '111.23.67.5'
//       })
    
//       for(var i=0; i < output.formats.length; i++)
//       {
//         if(output.formats[i].format_note == 'tiny')
//         {
//           // console.log(output.formats[i])
//           //console.log(output.formats[i])
//           //got.stream(output.formats[i].url).pipe(res);
//         }
        
//       }
//       res.send(output.formats[0])
//       //console.log(output.formats[0])

//       //got.stream(output.formats[0].url).pipe(res);
// 	// http.get(decodeURIComponent(output.formats[0].url), (response) => {
// 	// 	res.setHeader("Content-Length", response.headers["content-length"]);
// 	// 	let chunks = [];
//   //   if (response.statusCode >= 400) res.status(500).send("Error");
    
// 	// 	response.on("data", (chunk) => {
// 	// 		res.write(chunk);
// 	// 	});
// 	// 	response.on("end", () => {
// 	// 		res.end();
// 	// 	});
// 	// });


// });


// module.exports = router;