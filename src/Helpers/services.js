const API_KEY =  import.meta.env.VITE_API_KEY;
const BASE_URL =  import.meta.env.VITE_URL;

export const getWeatherByCoords = async (latitude, longitude) => {
    const response = await fetch(`${BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }
    return await response.json();
};
