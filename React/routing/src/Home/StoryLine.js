import React from 'react';

function StoryLine(props) {    
    return (
        <span>
          <h2>Story line of {props.movie.title}</h2>
          <p>{props.movie.storyLine}</p>
        </span>
    );    
}

export default StoryLine;