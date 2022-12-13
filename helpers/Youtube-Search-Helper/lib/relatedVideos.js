var parserService = require('./parser.service.js');
var got = require('got');

async function getRelatedVideos(videoId) {
  const YOUTUBE_URL = 'https://www.youtube.com';

  const results = [];
  let details = [];
  let fetched = false;
  const options = { type: "video", limit: 0 };

  const searchRes = await got.get(encodeURI(`${YOUTUBE_URL}/watch?v=${videoId}&hl=en&gl=in`));
  let html = await searchRes.body;
  // try to parse html
  try {
    const data = html.split("ytInitialData = ")[1].split(";</script>")[0];
    // @ts-ignore
    // html = data.replace(/\\x([0-9A-F]{2})/ig, (...items) => {
    //   return String.fromCharCode(parseInt(items[1], 16));
    // });
    // html = html.replaceAll("\\\\\"", "");
    html = JSON.parse(data)
    // console.log(html)
  } catch(e) { /* nothing */}

  if(html &&
    html.contents &&
    html.contents.twoColumnWatchNextResults && 
    html.contents.twoColumnWatchNextResults.secondaryResults && 
    html.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults &&
    html.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results.length > 0){
    details = html.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results;
    fetched = true;
    // console.log(details[0])
  }
  // backup/ alternative parsing
//   if (!fetched) {
//     try {
//       details = JSON.parse(html.split('{"itemSectionRenderer":{"contents":')[html.split('{"itemSectionRenderer":{"contents":').length - 1].split(',"continuations":[{')[0]);
//       fetched = true;
//     } catch (e) { /* nothing */
//     }
//   }
//   if (!fetched) {
//     try {
//       details = JSON.parse(html.split('{"itemSectionRenderer":')[html.split('{"itemSectionRenderer":').length - 1].split('},{"continuationItemRenderer":{')[0]).contents;
//       fetched = true;
//     } catch(e) { /* nothing */ }
//   }

  if (!fetched) return [];

  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < details.length; i++) {
    // if (typeof options.limit === "number" && options.limit > 0 && results.length >= options.limit) break;
    const data = details[i];
    // console.log(data)
    // const parserService = new ParserService();
    const parsed = parserService.parseRelatedVideos(data);
    if (!parsed) continue;
    const res = parsed;

    results.push(res);
  }

return results;
}

module.exports = {getRelatedVideos};