// MapContext.js
import { createContext, useContext, useState } from 'react';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [isUserInsideCircle, setIsUserInsideCircle] = useState(false);

  return (
    <MapContext.Provider value={{ isUserInsideCircle, setIsUserInsideCircle }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => { 
  return useContext(MapContext);
};


