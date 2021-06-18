import React, { useState, useEffect } from "react";
import * as FirestoreService from '../../pages/firestoreService';
import { CATEGORIES, CATEGORIES_IDS } from '../constants';
import arrowIcon from '../../../static/icon-arrow.svg';
import './playlist.scss';

export default (props) => {
  const {
    active,
    onClickVideo,
  } = props;

  if (!active) {
    return null;
  }

  const [isOpenCloseRows, setIsOpenCloseRows] = useState([]);
  const [videos, setVideos] = useState([]);
      
  useEffect(() => {
    const result = CATEGORIES_IDS.map((item, index) => {
      return { isOpen: index === 0 ? true : false };
    });
    setIsOpenCloseRows(result);

    FirestoreService.getVideos()
      .then(querySnapshot => {
        let result = []
        querySnapshot.forEach(x => {
          console.log('=====',x.data().active)
          if(x.data().active){
            result.push(x.data());
          }
        })
        setVideos(result);
      })
      .catch(() => {});
  }, []);

  const onClickToggleOpen = (index) => {
    const new_isOpenCloseRows = [...isOpenCloseRows]
    new_isOpenCloseRows[index].isOpen = !new_isOpenCloseRows[index].isOpen;
    setIsOpenCloseRows(new_isOpenCloseRows);
  }

  if (!isOpenCloseRows.length) {
    return null;
  }

  return (
    <div id="playlist">
        <ul>
          {CATEGORIES_IDS.map((ID, index) => {
            const isOpen = isOpenCloseRows[index].isOpen;
            return (
              <li key={index}>
                <div className="category" onClick={() => onClickToggleOpen(index)}>
                  <div className="category-name">
                    {CATEGORIES[ID].name}
                  </div>
                  <div className={`arrow ${isOpen ? 'close' : 'open'}`}>
                    <img src={arrowIcon} />
                  </div>
                </div>
                {isOpen && (
                  <ul className="items">
                    {videos.filter(item => item.prompt === ID).map((item, index2) => (
                      <li
                        key={index2}
                        onClick={() => onClickVideo(item)}
                      >
                        <img
                          src={`https://img.youtube.com/vi/${item.videoId}/1.jpg`}
                        />
                        <div className="title">
                          {item.author ? item.author : ''}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}   
              </li>
            );
          })}
        </ul>
    </div>
  )
}
