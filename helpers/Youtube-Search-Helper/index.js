var searchHelper = require('./lib/search.js');
var relatedVideosHelper = require('./lib/relatedVideos.js')

function search(searchQuery) {
  return searchHelper.searchVideo(searchQuery);
}

function searchVideoById(videoId) {
  return searchHelper.searchVideoById(videoId);
}

function relatedVideos(videoId){
  return relatedVideosHelper.getRelatedVideos(videoId)
}

module.exports =  {search, relatedVideos, searchVideoById};