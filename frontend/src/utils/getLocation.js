import { sendLocation } from "../actions/userAction";

export const getLocationAndSendOnMapReady = async () => {

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log('latitude:', latitude, 'longitude:', longitude);

            // sendLocation(latitude, longitude);

            const location = {
              lat: latitude,
              lon: longitude
            };

            resolve(location); // Resolve the Promise with the location
          },
          (error) => {
            console.error('Error getting current position:', error);
            reject(error); // Reject the Promise with the error
          },
          { enableHighAccuracy: true }
        );
      } catch (error) {
        console.error('Error accessing geolocation:', error);
        reject(error); // Reject the Promise with the error
      }
    });
  };

  // Return the Promise from getLocation
  return getLocation();
};