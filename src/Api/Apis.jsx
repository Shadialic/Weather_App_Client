import userInterseption from "../utils/intercepter";
const UserApi = userInterseption;

export async function UserData(formData) {
  try {
    const response = await UserApi.post("/register", formData);
    return response.data;
  } catch (err) {
    console.error("Error in UserData:", err);
    throw err;
  }
}

export async function LoginData(userData) {
  try {
    const response = await UserApi.post("/login", userData);
    return response.data;
  } catch (err) {
    console.error("Error in UserData:", err);
    throw err;
  }
}
export async function getWeatherByCity(city) {
  try {
    const response = await UserApi.get(
      `/weather/current?city=${encodeURIComponent(city)}`
    );
    return response.data;
  } catch (err) {
    console.error("Error in getWeatherByCity:", err);
    throw err;
  }
}
export async function GetCityDailyForcast(city) {
  try {
    const response = await UserApi.get(
      `/weather/forecast?city=${encodeURIComponent(city)}`
    );
    return response.data;
  } catch (err) {
    console.error("Error in getWeatherByCity:", err);
    throw err;
  }
}

export async function AddtoFavorites(data) {
  try {
    const response = await UserApi.post("/favorites", data);
    return response.data;
  } catch (err) {
    console.error("Error in getWeatherByCity:", err);
    throw err;
  }
}
export async function GetFavorites() {
  try {
    const response = await UserApi.get("/favorites");
    return response.data;
  } catch (err) {
    console.error("Error in getWeatherByCity:", err);
    throw err;
  }
}

export async function DeleteFav(id) {
  try {
    const response = await UserApi.put(`/deleteFavorites/${id}`);
    return response.data;
  } catch (err) {
    console.error("Error in getWeatherByCity:", err);
    throw err;
  }
}
