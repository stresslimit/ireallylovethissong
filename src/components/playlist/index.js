import React, { useState, useEffect } from "react";
import videos from '../tv/data';
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
      
  useEffect(() => {
    const result = CATEGORIES_IDS.map(() => {
      return { isOpen: false };
    });
    setIsOpenCloseRows(result);
  }, []);

  const onClickToggleOpen = (index) => {
    // console.log('asdf', index)
    const new_isOpenCloseRows = [...isOpenCloseRows]
  console.log('=====',isOpenCloseRows)

    new_isOpenCloseRows[index].isOpen = !new_isOpenCloseRows[index].isOpen;
    setIsOpenCloseRows(new_isOpenCloseRows);
    // console.log(isOpenCloseRows)
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
                    {videos.filter(item => item.categoryId === ID).map((item, index2) => (
                      <li
                        key={index2}
                        onClick={() => onClickVideo(item)}
                      >
                        <img
                          src={item.image}
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
