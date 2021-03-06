import React, { useState, useEffect } from "react";
import YouTube from '@u-wave/react-youtube';
import { Link } from "@reach/router"  
import * as FirestoreService from '../../firestoreService';
import Playlist from '../playlist';
import { CATEGORIES } from '../constants';
import menuIcon from '../../../static/icon-menu.svg';
import './tv.scss';

const Tv = ({ pathname }) => {
  const defaultVideoInfos = {
    id: '',
    title: '',
    categoryName: '',
    videoId: '',
  };
  const [videos, setVideos] = useState([]);
  const [videoSlug, setVideoSlug] = useState(pathname);
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [isLanding, setIsLanding] = useState(true);
  const [imageArray, setImageArray] = useState([]);
  const [videoInfos, setVideoInfos] = useState(defaultVideoInfos);

  useEffect(() => {
    FirestoreService.getVideos()
      .then(querySnapshot => {
        let result = [];
        querySnapshot.forEach(x => {
          if(x.data().active) {
            result.push(x.data())
          }
        })
        setImageArray(getImageArray(result));
        setVideos(result.reverse());
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setVideoSlug(pathname)
  }, [pathname]);

  useEffect(() => {
    console.log(videos.length, videoSlug)
    if (videos.length && videoSlug){
      loadVideo(videos.find(x => x.videoId === videoSlug))
    } else if (videos.length && !videoSlug) {
      setIsLanding(true);
      setVideoInfos(defaultVideoInfos);
    }
   
  }, [videos, videoSlug]);


  const loadVideo = (videoInfos) => {
    // Close playlist after clicking video
    // TODO: let it open on Desktop
    setIsPlaylistOpen(false);

    // Hide landing since the video will be on top of it anyway
    setIsLanding(false);

    // Set video infos that will be displayed in the bottom nav
    setVideoInfos({
      categoryName: CATEGORIES[videoInfos.prompt].name,
      ...videoInfos
    });
  }

  const onEnd = () => {
    const randomVideoIndex = Math.floor(Math.random() * videos.length);
    loadVideo(videos[randomVideoIndex]);
  }

  const getImageArray = (videos) => {
    let tileWidth =  210;
    let tileHeight = 120;

    const viewPortWidth = document.documentElement.clientWidth;
    const viewPortHeight = document.documentElement.clientHeight - (tileHeight * 2);

    if (viewPortWidth < 700) {
      tileWidth =  100;
      tileHeight = 57;
    }

    const gridColumn = Math.floor(viewPortWidth / tileWidth);
    const gridRow = Math.floor(viewPortHeight / tileHeight);

    const gridSize = gridColumn * gridRow;

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

      return {
        ...item,
        x: (100/gridColumn * col) + getRandomInt(10) + '%',
        y: (100/gridRow * row) + getRandomInt(10) + '%',
        width: tileWidth,
        height: tileHeight,
      }
    })
  }

  const onClickOpenPlaylist = () => {
    setIsPlaylistOpen(!isPlaylistOpen);
  }

  return (
    <div id="tv">
      <div className="youtube-container">
        <YouTube
          id='youtube-player'
          video={videoInfos.videoId}
          autoplay
          autohide
          modestbranding
          showCaptions
          onEnd={onEnd}
        />
      </div>
      {isLanding && (
        <div className="landing">
          <div className="center-logo">
            <img alt="Zong heart animated" src="zong-animated.gif" />
            ireallylovethissong
          </div>
          <div className="mosaic">
            {imageArray.map((item, index) => (
              <Link
                key={index}
                style={{
                  left: item.x,
                  top: item.y,
                }}
                to={`/${item.videoId}`}
              >
                {item.videoId && (
                  <img
                    alt={`Thumbnail of the video from ${item.author}`}
                    src={`https://img.youtube.com/vi/${item.videoId}/1.jpg`}
                    style={{
                      width: item.width,
                      height: item.height,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
      {isPlaylistOpen && (
        <Playlist
          {...{
            videos,
          }}
        />
      )}
      <div
        className="bottom-nav"
        onClick={onClickOpenPlaylist}
      >
        <div className="left">
          <div className="image">
            {/* <img src="favicon.png" className="favicon" /> */}
            {videoInfos.videoId && (
              <img
                className="thumb"
                alt={`Thumbnail of the video from ${videoInfos.author}`}
                src={`https://img.youtube.com/vi/${videoInfos.videoId}/1.jpg`}
              />
            )}
          </div>
          <div className="infos">
            <div className="video-title">{videoInfos.author}</div>
            <div className="prompt">
              <a
                href={`https://www.youtube.com/watch?v=${videoInfos.videoId}`}
                target="_blank"
                rel="noreferrer"
              >
                {videoInfos.categoryName}
              </a>
            </div>
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
