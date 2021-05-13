import React, { useState, useEffect } from "react";
import videos from './data';
import Playlist from '../playlist';
import './tv.scss';
import logoSrc from '../../../static/logo.png';

const Tv = () => {
  const [firstVideoIndex, setFirstVideoIndex] = useState();
  const [secondVideoIndex, setSecondVideoIndex] = useState();
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isLanding, setIsLanding] = useState(true);
  const [imageArray, setImageArray] = useState([]);
  const [toggleVideo, setToggleVideo] = useState(true);
  const [isTransition, setIsTransition] = useState(false);
  const [videoInfos, setVideoInfos] = useState({
    id: '',
    title: '',
    categoryName: '',
  });
  const videoMainUrl = 'https://www.youtube-nocookie.com/embed/';
  const videoParams = '?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0&cc_load_policy=1';

  // const videoParams = '?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0&autoplay=1&cc_load_policy=1';

  const getVideoInfos = (index, subIndex = undefined) => {
    if (subIndex === undefined) {
      return videos[index];
    }
    return {
      categoryName: videos[index].title,
      ...videos[index].items[subIndex]
    };
  }

  const onClickVideoTitle = (index, subIndex) => {
    setIsLanding(false);
    setVideoInfos(getVideoInfos(index, subIndex))
    // Add transition
    setIsTransition(true);

    // Start new video
    setTimeout(() => {
      if (toggleVideo) {
        setSecondVideoIndex(index);
        setFirstVideoIndex();
      } else {
        setFirstVideoIndex(index);
        setSecondVideoIndex();
      }
      setToggleVideo(!toggleVideo);
    }, 500);

    // Remove transition
    setTimeout(() => {
      setIsTransition(false);
    }, 1500);
  }
  
  const getImageArray = () => {
    console.log('getVideoInfos')
    const result = [];
    videos.map(video => {
      if (video.items) {
        video.items.map(item => {
          if (item.image) {
            result.push({
              image: item.image,
              top: Math.floor(Math.random() * 80) + '%',
              left: Math.floor(Math.random() * 80) + '%'
            });
          }   
        })
      }
    })
    return result;
  }

  useEffect(() => {
    setIsTransition(true);
    setTimeout(() => {
      setFirstVideoIndex(0);
      setIsTransition(false);
      setToggleVideo(true);
    }, 1500);
    setImageArray(getImageArray());
  }, []);

  const firstVideoId = firstVideoIndex !== undefined ? videos[firstVideoIndex].id : '';
  const firstVideoStart = firstVideoIndex !== undefined ? videos[firstVideoIndex].start : '';
  const secondVideoId = secondVideoIndex !== undefined ? videos[secondVideoIndex].id : '';
  const secondVideoStart = secondVideoIndex !== undefined ? videos[secondVideoIndex].start : '';

  const onClickOpenPlaylist = () => {
    setIsPlaylistOpen(!isPlaylistOpen);
  }

  return (
    <div id="tv">
      {isLanding && (
        <div className="landing">
          <div>
            <img src={logoSrc} />
          </div>
          <div className="mosaic">
            {imageArray.map(item => (
              <button
                style={{
                  top: item.top,
                  left: item.left,
                }}
              >
                <img
                  src={item.image}
                />
              </button>
            ))}
          </div>
        </div>
      )}
      <iframe
        className={`${!isLanding && toggleVideo ? 'active' : ''}`}
        title="iframe-first-video"
        src={`${videoMainUrl}${firstVideoId}${videoParams}&start=${firstVideoStart}`}
        frameBorder="0"
        allowFullScreen
        // allow="autoplay"
      ></iframe>
      <iframe
        className={`${!isLanding && !toggleVideo ? 'active' : ''}`}
        title="iframe-second-video"
        src={`${videoMainUrl}${secondVideoId}${videoParams}&start=${secondVideoStart}`}
        frameBorder="0"
        allowFullScreen
        // allow="autoplay"
      ></iframe>
      <div 
        className={`transition ${isTransition ? 'active' : ''}`}
      ></div>
      <Playlist
        active={isPlaylistOpen}
        onClickVideoTitle={onClickVideoTitle}
      />
      <div
        className="bottom-nav"
        onClick={onClickOpenPlaylist}
      >
        <div className="infos">
          <div className="image">{videoInfos.image && <img src={videoInfos.image} />}</div>
          <div>
            <div className="category">{videoInfos.categoryName}</div>
            <div className="video-title">{videoInfos.title}</div>
          </div>
        </div>
        <div className="actions">
          <button>hide show playlist</button>
        </div>
      </div>
    </div>
  )
}

export default Tv;
