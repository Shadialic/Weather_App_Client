import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteFav, GetFavorites } from "../../Api/Apis";
import { TiWeatherWindyCloudy, TiWeatherSunny } from "react-icons/ti";

export default function Wishlist() {
  const [open, setOpen] = React.useState(false);
  const [wishlistData, setWishlistData] = React.useState([]);

  const handleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    fetchWishlistData();
  }, []);

  const fetchWishlistData = async () => {
    try {
      const response = await GetFavorites();
      if (response.success) {
        setWishlistData(response.favs);
      } 
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFav = async (id) => {
    try {
      await DeleteFav(id);
      fetchWishlistData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <IconButton onClick={handleDrawer} >
        <FavoriteIcon className='mt-2'/>
      </IconButton>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end backdrop-blur-sm overflow-visible">
          <div className="bg-white w-80 p-4 h-full shadow-lg">
            <div className="mb-0 flex flex-col items-center justify-between gap-10">
              <div className="flex flex-row items-center justify-between w-full">
                <h5 className="text-black font-bold text-2xl underline underline-offset-4 font-mono">
                  Favorites
                </h5>
                <IconButton onClick={handleDrawer}>
                  <CloseIcon />
                </IconButton>
              </div>
              {wishlistData.length === 0 ? (
                <p className="text-center text-xl font-semibold text-gray-500">
                  Your favorites list is empty
                </p>
              ) : (
                <>
                  {wishlistData.map((data, index) => (
                    <div
                      key={index}
                      className="relative border-2 border-b-black w-72 h-auto flex flex-col gap-4 p-2"
                    >
                      <div className="flex flex-row">
                        <h1 className="font-bold text-lg text-amber-950 underline-offset-8">
                          {data?.place}
                        </h1>
                        {data.description === "overcast clouds" ? (
                          <TiWeatherWindyCloudy className="absolute top-2 right-2 text-yellow-500 text-5xl" />
                        ) : (
                          <TiWeatherSunny className="absolute top-2 right-2 text-yellow-500 text-5xl" />
                        )}
                      </div>
                      <div className="">
                        <h1 className="text-black text-[15px]">
                          Temperature: <span>{data?.temperature}°C</span>
                        </h1>
                        <h1 className="text-black text-[15px]">
                          Description: {data?.description}
                        </h1>
                        <h1 className="text-black text-[15px]">
                          Humidity: {data?.humidity}%
                        </h1>
                      </div>
                      <button
                        className="bg-red-600 font-semibold hover:transition-transform hover:transform hover:scale-105"
                        onClick={() => handleDeleteFav(data?.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
