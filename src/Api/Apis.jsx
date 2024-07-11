import userInterseption from "../utils/intercepter";
const UserApi = userInterseption;

export async function UserData(formData) {
    try {
      console.log(formData,'formData');
     
      const response = await UserApi.post("/register", formData);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error("Error in UserData:", err);
      throw err;
    }
  }

  export async function LoginData(userData) {
    try {
      const response = await UserApi.post("/login", userData);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error("Error in UserData:", err);
      throw err;
    }
  }
  export async function getWeatherByCity(city) {
    try {
      console.log(city,'city');
      const response = await UserApi.get(`/weather/current?city=${encodeURIComponent(city)}`);
      console.log(response.data);
      return response.data;
    } catch (err) {
      console.error("Error in getWeatherByCity:", err);
      throw err;
    }
  }
