
import React from 'react';

import CSSModules from 'react-css-modules';

import styles from './reviewEntryStyles.css';

import utils from '../utils.js';


const ReviewEntry = (props) => {
  const date = utils.formatDate(props.review.date);
  console.log(props.review);
  return (
    <div styleName='review-entry'>
      <div styleName='header-container'>
        <div styleName='photo-container'>
          <img styleName='avatar' src={props.review.photo} height='48' width='48'></img>
        </div>
        <div styleName='review-info'>
          <div styleName='user-name'>
            {props.review.user_name}
          </div>
          <div>
            <span styleName='review-date'>
              {date}
            </span>
          </div>
        </div>
      </div>
      <div styleName='content'>
        {props.review.content} 
      </div>
    </div>
  ); 
}

export default CSSModules(ReviewEntry, styles, {allowMultiple: true});
