import React, { useState, useEffect } from "react";
import videos from './data';
import Playlist from '../playlist';
import logoSrc from '../../../static/IRLTS_main_logo.png';
import { CATEGORIES } from '../constants';
import menuIcon from '../../../static/icon-menu.svg';
import './tv.scss';

const Tv = () => {
  const [firstVideo, setFirstVideo] = useState({
    id: '',
    start: '',
  });
  const [secondVideo, setSecondVideo] = useState({
    id: '',
    start: '',
  });
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

  const onClickVideo = (videoInfos) => {
    setIsLanding(false);
    setVideoInfos({
      categoryName: CATEGORIES[videoInfos.categoryId].name,
      ...videoInfos
    });
  
    // Add transition
    setIsTransition(true);

    // Start new video
    setTimeout(() => {
      if (toggleVideo) {
        setSecondVideo(videoInfos);
      } else {
        setFirstVideo(videoInfos);
      }
      setToggleVideo(!toggleVideo);
    }, 500);

    // Remove transition
    setTimeout(() => {
      setIsTransition(false);
    }, 1500);
  }

  const getImageArray = () => {

    const tileWidth =  210;
    const tileHeight = 120;
    const viewPortWidth = document.documentElement.clientWidth;
    const viewPortHeight = document.documentElement.clientHeight - (tileHeight * 2);

    const gridColumn = Math.floor(viewPortWidth / tileWidth);
    const gridRow = Math.floor(viewPortHeight / tileHeight);

    const gridSize = gridColumn * gridRow;
    console.log(viewPortHeight, gridRow, gridSize)

    const grid = new Array(gridSize)
      .join().split(',')
      .map(function(item, index){ return ''});

    const unshuffled = [].concat([...videos].slice(0, gridSize), grid.slice([...videos].length ));
    let shuffled = unshuffled
      .map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)


    const getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
    }

    let col = 0;
    let row = 0;
    return shuffled.map((item, index) => {
      if (index === 0) {
        return {
          ...item,
          x: getRandomInt(2) + '%',
          y: getRandomInt(2) + '%',
        }
      }
      if (col + 1 === gridColumn) {
        col = 0;
      } else {
        col = col + 1;
      }

      if (col === 0) {
        row = row + 1;
      }

      //Math.random() < 0.5 ? -1 : 1
      return {
        ...item,
        x: (100/gridColumn * col) + getRandomInt(10) + '%',
        y: (100/gridRow * row) + getRandomInt(10) + '%',
      }
    })
  }

  useEffect(() => {
    setIsTransition(true);
    setTimeout(() => {
      setIsTransition(false);
      setToggleVideo(true);
    }, 1500);
    setImageArray(getImageArray());
  }, []);

  const onClickOpenPlaylist = () => {
    setIsPlaylistOpen(!isPlaylistOpen);
  }

  return (
    <div id="tv">
      {isLanding && (
        <div className="landing">
          <div className="center-logo">
            <img alt="Logo of I really loge that song" src={logoSrc} />
          </div>
          <div className="mosaic">
            {imageArray.map((item, index) => (
              <button
                key={index}
                style={{
                  left: item.x,
                  top: item.y,
                }}
                onClick={() => onClickVideo(item)}
              >
                {item.image && (
                  <img
                    alt={`Thumbnail of the video from ${item.author}`}
                    src={item.image}
                  />
                )}
                
              </button>
            ))}
          </div>
        </div>
      )}
      <iframe
        className={`${!isLanding && toggleVideo ? 'active' : ''}`}
        title="iframe-first-video"
        src={`${videoMainUrl}${firstVideo.id}${videoParams}&start=${firstVideo.start}`}
        frameBorder="0"
        allowFullScreen
        // allow="autoplay"
      ></iframe>
      <iframe
        className={`${!isLanding && !toggleVideo ? 'active' : ''}`}
        title="iframe-second-video"
        src={`${videoMainUrl}${secondVideo.id}${videoParams}&start=${secondVideo.start}`}
        frameBorder="0"
        allowFullScreen
        // allow="autoplay"
      ></iframe>
       <div 
        className={`transition ${isTransition ? 'active' : ''}`}
      ></div>
      <Playlist
        active={isPlaylistOpen}
        onClickVideo={onClickVideo}
      />
      <div
        className="bottom-nav"
        onClick={onClickOpenPlaylist}
      >
        <div className="infos">
          <div className="image">{videoInfos.image && <img alt={`Thumbnail of the video from ${videoInfos.author}`} src={videoInfos.image} />}</div>
          <div>
            <div className="category">{videoInfos.categoryName}</div>
            <div className="video-title">{videoInfos.author}</div>
          </div>
        </div>
        <div className="actions">
          <button>
            <img alt="Menu icon" src={menuIcon} />
          </button>
        </div>
      </div> 
    </div>
  )
}

export default Tv;
