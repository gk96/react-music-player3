function parseVideo(data) {
      if (!data || !data.videoRenderer) return;
      let title = ''
      try{
          title = data.videoRenderer.title.runs[0].text;
          title = title.replace("\\\\", "\\");
        try{
          title = decodeURIComponent(title);
        }catch (e) {
          // @ts-ignore
        }
  
        return {
          id: {
            videoId: data.videoRenderer.videoId
          },
          url: `https://www.youtube.com/watch?v=${data.videoRenderer.videoId}`,
          title,
          description: data.videoRenderer.descriptionSnippet && data.videoRenderer.descriptionSnippet.runs[0] ? data.videoRenderer.descriptionSnippet.runs[0].text : "",
          duration_raw: data.videoRenderer.lengthText ? data.videoRenderer.lengthText.simpleText : null,
          snippet: {
            url: `https://www.youtube.com/watch?v=${data.videoRenderer.videoId}`,
            duration: data.videoRenderer.lengthText ? data.videoRenderer.lengthText.simpleText : null,
            publishedAt: data.videoRenderer.publishedTimeText ? data.videoRenderer.publishedTimeText.simpleText : null,
            thumbnails: {
              id: data.videoRenderer.videoId,
              url: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1].url,
              default: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1],
              high: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1],
              height: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1].height,
              width: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1].width
            },
            title,
            views: data.videoRenderer.viewCountText && data.videoRenderer.viewCountText.simpleText ? data.videoRenderer.viewCountText.simpleText.replace(/[^0-9]/g, "") : 0
          },
          views: data.videoRenderer.viewCountText && data.videoRenderer.viewCountText.simpleText ? data.videoRenderer.viewCountText.simpleText.replace(/[^0-9]/g, "") : 0
        };
      }catch (e){
        return undefined
      }
}

function parseRelatedVideos(data){
  if (!data || !data.compactVideoRenderer) return;
      // let title = ''
      try{
        //   title = data.compactVideoRenderer.title.runs[0].text;
        //   title = title.replace("\\\\", "\\");
        // try{
        //   title = decodeURIComponent(title);
        // }catch (e) {
        //   // @ts-ignore
        // }
  
        return {
          videoId: data.compactVideoRenderer.videoId,
          thumbnails: data.compactVideoRenderer.thumbnail.thumbnails,
          url: `https://www.youtube.com/watch?v=${data.compactVideoRenderer.videoId}`,
          title: data.compactVideoRenderer.title.simpleText,
          // description: data.videoRenderer.descriptionSnippet && data.videoRenderer.descriptionSnippet.runs[0] ? data.videoRenderer.descriptionSnippet.runs[0].text : "",
          // duration_raw: data.videoRenderer.lengthText ? data.videoRenderer.lengthText.simpleText : null,
          // snippet: {
          //   url: `https://www.youtube.com/watch?v=${data.videoRenderer.videoId}`,
          //   duration: data.videoRenderer.lengthText ? data.videoRenderer.lengthText.simpleText : null,
          //   publishedAt: data.videoRenderer.publishedTimeText ? data.videoRenderer.publishedTimeText.simpleText : null,
          //   thumbnails: {
          //     id: data.videoRenderer.videoId,
          //     url: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1].url,
          //     default: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1],
          //     high: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1],
          //     height: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1].height,
          //     width: data.videoRenderer.thumbnail.thumbnails[data.videoRenderer.thumbnail.thumbnails.length - 1].width
          //   },
          //   title,
          //   views: data.videoRenderer.viewCountText && data.videoRenderer.viewCountText.simpleText ? data.videoRenderer.viewCountText.simpleText.replace(/[^0-9]/g, "") : 0
          // },
          // views: data.videoRenderer.viewCountText && data.videoRenderer.viewCountText.simpleText ? data.videoRenderer.viewCountText.simpleText.replace(/[^0-9]/g, "") : 0
        };
      }catch (e){
        console.log(e)
        return undefined
      }

}

function parseVideoInfo(data){
  if (!data) return;
      // let title = ''
      try{
        //   title = data.compactVideoRenderer.title.runs[0].text;
        //   title = title.replace("\\\\", "\\");
        // try{
        //   title = decodeURIComponent(title);
        // }catch (e) {
        //   // @ts-ignore
        // }
  
        return {
          videoId: data.videoId,
          channelId: data.channelId,
          title: data.title,
          description: data.shortDescription,
          thumbnails: data.thumbnail.thumbnails,
          };
      }catch (e){
        console.log(e)
        return undefined
      }

}


module.exports = {parseVideo, parseRelatedVideos, parseVideoInfo};