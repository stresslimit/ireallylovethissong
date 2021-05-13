import React, { useState, useEffect } from "react";
import videos from '../tv/data';

import './playlist.scss';

export default (props) => {
  const {
    active,
    onClickVideoTitle,
  } = props;

  if (!active) {
    return null;
  }

  const [isOpenCloseRows, setIsOpenCloseRows] = useState([]);
      
  useEffect(() => {
    const result = videos.map(() => {
      return { isOpen: false };
    });
    setIsOpenCloseRows(result);
  }, []);

  const onClickToggleOpen = (index) => {
    // console.log('asdf', index)
    const new_isOpenCloseRows = [...isOpenCloseRows]
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
          {videos.length && videos.map((video, index) => {
            if (!video.items) {
              return null;
            }
            const isOpen = isOpenCloseRows[index].isOpen;
            return (
              <li key={index}>
                <div className="category" onClick={() => onClickToggleOpen(index)}>
                  <div
                    key={index}
                  >
                    {video.title ? video.title : ''}
                  </div>
                  <div>{isOpen ? 'close' : 'open'}</div>
                </div>
                {isOpen && (
                  <ul className="items">
                    {video.items.map((item, index2) => (
                      <li
                        key={index2}
                        onClick={() => onClickVideoTitle(index, index2)}
                      >
                         <img
                          src={item.image}
                        />
                        <div className="title">
                          {item.title ? item.title : ''}
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

