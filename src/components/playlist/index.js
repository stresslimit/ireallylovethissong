import React from "react";
import Link from 'gatsby-link';
import { CATEGORIES } from '../constants';
import './playlist.scss';

const Playlist = ({
  videos
}) => {
  return (
    <div id="playlist">
      <ul className="items">
        {videos.map((item, index) => (
          <li
            key={index}
          > 
            <Link to={`/${item.videoId}`}>
              <img
                src={`https://img.youtube.com/vi/${item.videoId}/1.jpg`}
                alt={`Thumbnail from video id ${item.videoId}`}
              />
              <div className="infos">
                <div className="title">
                  {item.author ? item.author : ''}
                </div>
                <div className="prompt">
                  {CATEGORIES[item.prompt] ? CATEGORIES[item.prompt].name : ''}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Playlist;
