import React, { useState, useEffect } from "react";
import * as FirestoreService from '../../firestoreService';
import { CATEGORIES } from '../constants';
import './playlist.scss';

const Playlist = ({
  onClickVideo
}) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    FirestoreService.getVideos()
      .then(querySnapshot => {
        let result = []
        querySnapshot.forEach(x => {
          if(x.data().active){
            result.push(x.data());
          }
        })
        setVideos(result);
      })
      .catch(() => {});
  }, []);

  return (
    <div id="playlist">
      <ul className="items">
        {videos.map((item, index2) => (
          <li
            key={index2}
            onClick={() => onClickVideo(item)}
          >
            <img
              src={`https://img.youtube.com/vi/${item.videoId}/1.jpg`}
            />
            <div className="infos">
              <div className="title">
                {item.author ? item.author : ''}
              </div>
              <div className="prompt">
                {CATEGORIES[item.prompt] ? CATEGORIES[item.prompt].name : ''}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Playlist;
