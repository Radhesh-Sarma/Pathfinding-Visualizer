import rover from './media/mars-rover.svg';
import React from 'react';
import PropTypes from 'prop-types';
export const currentPointer = function(props, i, j) {
  return (<div
    key={i + j}
    style={{width: '35px', height: '35px', border: '1.5px solid black',
      backgroundColor: '#69fff1', WebkitUserSelect: 'none',
    }}
    onClick={() => {
      if (props.changeSource)props.toggleSource(i, j);
      else props.changeState(i, j);
    }}
  >
    <img src={rover} alt="start" style={{width: '25px', height: '25px'}}/>
  </div>);
};

export const finalShortestPath = function(props, i, j) {
  return ( <div
    key={i + j}
    style={{width: '35px', height: '35px', border: '1.5px solid black',
      backgroundColor: '#fee440', WebkitUserSelect: 'none',
    }}
    onClick={() => {
      if (props.changeSource) props.changesourcefunc(i, j);
      else if (props.changeDestination) props.changedestfunc(i, j);
      else props.changeState(i, j);
    }}
  >
  </div>);
};
export const startPoint = function(props, i, j) {
  return (
    <div
      key={i + j}
      style={{width: '35px', height: '35px', border: '1.5px solid black',
        backgroundColor: '#00ee00', WebkitUserSelect: 'none',
      }}
      onClick={() => {
        if (props.changeSource) props.changesourcefunc(i, j);
        else if (props.changeDestination) props.changedestfunc(i, j);
        else props.changeState(i, j);
      }
      }
    >
    </div>);
};
export const endPoint = function(i, j) {
  return (
    <div
      key={i + j}
      style={{
        width: '35px', height: '35px', border: '1.5px solid black',
        backgroundColor: '#ee0000', WebkitUserSelect: 'none',
      }}
    >
    </div>
  );
};
export const wall = function(props, i, j) {
  return (
    <div
      key={i + j}
      style={{
        width: '35px', height: '35px', border: '1.5px solid black',
        backgroundColor: '#540b0e', WebkitUserSelect: 'none',
      }}
      onClick={() => {
        if (props.changeSource)props.changesourcefunc(i, j);
        else if (props.changeDestination) props.changedestfunc(i, j);
        else props.changeState(i, j);
      }}
      onTouchStart={(e) => {
        if (window.event.buttons === 1) props.changeState(i, j);
      }
      }
      onMouseEnter={(e) => {
        if (window.event.buttons === 1) props.changeState(i, j);
      }
      }
    >
    </div>
  );
};
export const visited = function(props, i, j) {
  return (
    <div
      key={i + j}
      style={{
        width: '35px', height: '35px', border: '1.5px solid black',
        backgroundColor: '#e09891', WebkitUserSelect: 'none',
      }}
      onClick={() => {
        if (props.changeSource) props.changesourcefunc(i, j);
        else if (props.changeDestination) props.changedestfunc(i, j);
        else props.changeState(i, j);
      }}
    >
    </div>
  );
};
export const empty = function(props, i, j) {
  return ( <div
    key={i + j}
    style={{
      width: '35px', height: '35px', border: '1.5px solid black',
      WebkitUserSelect: 'none',
    }}
    onClick={() => {
      if (props.changeSource) props.changesourcefunc(i, j);
      else if (props.changeDestination)props.changedestfunc(i, j);
      else props.changeState(i, j);
    }}
    onTouchStart={(e) => {
      if (window.event.buttons === 1)props.changeState(i, j);
    }
    }
    onMouseEnter={(e) => {
      if (window.event.buttons === 1)props.changeState(i, j);
    }
    }
  >
  </div>);
};