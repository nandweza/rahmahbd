import React from 'react';
import './balloons.css';
import ballon from '../../media/balloon.png';
import background from '../../media/bd-background.jpg';

const Balloons = () => {
  return (
    <div className="balloons-container">
      <img src={background} alt="Balloons Background" className="balloons-background" />
      <div className="balloon-group left">
        <div className="balloon">
          <img src={ballon} alt="Balloon" className="balloon-image" />
          <div className="balloon-text">Rahmah</div>
        </div>
      </div>
      <div className="balloon-group right">
        <div className="balloon">
          <img src={ballon} alt="Balloon" className="balloon-image" />
          <div className="balloon-text">Rahmah</div>
        </div>
      </div>
    </div>
  );
};

export default Balloons;
