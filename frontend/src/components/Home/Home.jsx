import React, { useEffect, useState } from 'react';
import Menu from './Menu';
import Map from './Map';
import './style/Home.css'

function HomePage() {
// localStorage.removeItem('token')
  return (
    <div>
      <div className="Menu-Container">
        <Menu />
      </div>
     
      <div className="Map-container" >
  <Map />
</div>

    </div>
  );
}

export default HomePage;
