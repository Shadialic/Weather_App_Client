import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Person2Icon from "@mui/icons-material/Person2";
import Today from "./Today";
import Week from "./Week";
import Whishlist from "../Modals/Whishlist";
import { GetFavorites } from "../../Api/Apis";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Body({ weatherData }) {
  const [activeComponent, setActiveComponent] = React.useState("Today");
  const [activeAvatar, setActiveAvatar] = React.useState(null);
  const wishlistRef = React.useRef();
  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  const handleAvatarClick = (avatar) => {
    setActiveAvatar(avatar);
    if (avatar === "Favorite" && wishlistRef.current) {
      wishlistRef.current.handleDrawer();
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between text-black font-prompt-semibold text-[20px] gap-4 p-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleButtonClick("Today")}
            className={activeComponent === "Today" ? "text-blue-500" : ""}
          >
            Today
          </button>
          <button
            onClick={() => handleButtonClick("Week")}
            className={activeComponent === "Week" ? "text-blue-500" : ""}
          >
            Week
          </button>
        </div>
        <div className="ml-auto flex gap-2">
          <IconButton
            onClick={() => handleAvatarClick("Celsius")}
            className={
              activeAvatar === "Celsius" ? "bg-blue-500 text-white" : ""
            }
          >
            °C
          </IconButton>
          <Whishlist ref={wishlistRef} />
          <IconButton
            onClick={() => handleAvatarClick("Profile")}
            className={activeAvatar === "Profile" ? "bg-black text-white" : ""}
          >
            <Person2Icon />
          </IconButton>
        </div>
      </div>

      <div className="p-4">
        {activeComponent === "Today" && <Today />}
        {activeComponent === "Week" && <Week weatherData={weatherData} />}
      </div>
      <div className="flex flex-col gap-4 p-3">
        <h1 className="text-black p-5 pr-4 text-[20px] font-prompt-semibold">
          Today's Highlights
        </h1>
        <div className="flex flex-row gap-6 pl-9 ">
          <div className="w-[28%] h-32 bg-gray-200 rounded-xl p-2 flex flex-col justify-between">
            <h1 className="text-gray-500 text-[20px]">Clouds</h1>
            <h1 className="text-gray-500 text-[20px] text-center">
              {weatherData?.clouds.all}
            </h1>
            <h1 className="text-black text-[14px] self-end">Very High</h1>
          </div>

          <div className="w-[28%] h-32 bg-gray-200 rounded-xl p-2 flex flex-col justify-between">
            <h1 className="text-gray-500 text-[20px]">Wind Status</h1>
            <h1 className="text-gray-500 text-[20px] text-center">
              {weatherData?.wind.speed}
            </h1>
            <h1 className="text-black text-[14px] self-end">km/h</h1>
          </div>
          <div className="w-[28%] h-32 bg-gray-200 rounded-xl p-2 flex flex-col justify-between">
            <h1 className="text-gray-500 text-[20px]">Sunrise & Sunset</h1>
            <h1 className="text-gray-500 text-[20px] text-center">
              {new Date(weatherData?.sys.sunrise * 1000).toLocaleTimeString()}
            </h1>
            <h1 className="text-black text-[14px] self-end">
              {new Date(weatherData?.sys.sunset * 1000).toLocaleTimeString()}
            </h1>
          </div>
        </div>
        <div className="flex flex-row gap-6 pl-9 ">
          <div className="w-[28%] h-32 bg-gray-200 rounded-xl p-2 flex flex-col justify-between">
            <h1 className="text-gray-500 text-[20px]">Humidity</h1>
            <h1 className="text-gray-500 text-[20px] text-center">
              {weatherData?.main.humidity}%
            </h1>
            <h1 className="text-black text-[14px] self-end">Moderate</h1>
          </div>
          <div className="w-[28%] h-32 bg-gray-200 rounded-xl p-2 flex flex-col justify-between">
            <h1 className="text-gray-500 text-[20px]">Visibility</h1>
            <h1 className="text-gray-500 text-[20px] text-center">
              {weatherData?.visibility}
            </h1>
            <h1 className="text-black text-[14px] self-end">Clear Air</h1>
          </div>
          <div className="w-[28%] h-32 bg-gray-200 rounded-xl p-2 flex flex-col justify-between">
            <h1 className="text-gray-500 text-[20px]">Air Quality</h1>
            <h1 className="text-gray-500 text-[20px] text-center">341</h1>
            <h1 className="text-black text-[14px] self-end">Hazardous😱</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
