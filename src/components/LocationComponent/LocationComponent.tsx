import React, { useState } from "react";

interface LocationButtonProps {
  onLocationUpdate: (latitude: number, longitude: number) => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onLocationUpdate }) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleClick = async () => {
    setIsFetching(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      onLocationUpdate(latitude, longitude);
    } catch (error) {
      console.error(error);
    }
    setIsFetching(false);
  };

  return (
    <button disabled={isFetching} onClick={handleClick} style={{
      background: 'transparent',
      border: 'none',
      color: 'inherit',
      cursor: 'pointer',
      outline: 'none',
      width:'200px',
      marginRight: '18px',
    }}>
      {isFetching ? "Fetching location..." : "use my current position"}
    </button>
  );
};

export default LocationButton;
