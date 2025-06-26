export const getRandomMalagaCenterCoords = () => {
  const lat = 36.721 + (Math.random() - 0.5) * 0.01;
  const lng = -4.421 + (Math.random() - 0.5) * 0.01;
  return { latitude: lat, longitude: lng };
};

export const getCoordinates = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve) => {
    const isProd = import.meta.env.MODE === "production"
    const useGps = isProd && import.meta.env.VITE_USE_GPS === 'true';
    if (useGps && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
        },
        () => {
          resolve(getRandomMalagaCenterCoords());
        }
      );
    } else {
      resolve(getRandomMalagaCenterCoords());
    }
  });
};
