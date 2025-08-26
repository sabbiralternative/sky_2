import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userToken } from "../../../redux/features/auth/authSlice";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";
import { Link } from "react-router-dom";

const SearchBox = () => {
  const [searchText, setSearchText] = useState("");
  const token = useSelector(userToken);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (searchText?.length > 2) {
      const getSearchData = async () => {
        const { data } = await AxiosSecure.post(API.searchEvent, {
          name: searchText,
        });

        if (data?.result?.length > 0) {
          setData(data?.result);
        }
      };
      getSearchData();
    }
  }, [searchText, token]);

  /* filter the search value */
  useEffect(() => {
    const categories = Array.from(new Set(data.map((item) => item.eventType)));

    setCategories(categories);
  }, [data]);

  /* hide the search modal */
  const handleHideDropdown = () => {
    setSearchText("");
    setData([]);
  };
  return (
    <div
      id="searchBox"
      className="text-text_color_primary2 relative hidden max-w-96 font-lato lg:block flex-grow search-box"
    >
      <div className="relative w-full max-w-[450px]">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border-1 peer w-full appearance-none text-xs pl-16 py-3 border rounded-full md:text-[14px]  text-text_color_primary1 border-border_color_primary"
          placeholder="Search Events(At least 3 letters)..."
          type="text"
        />
        <svg
          fill="var(--icon-color-primary)"
          className="absolute top-1/2 left-1 -translate-y-1/2"
          width={16}
          height={16}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z" />
        </svg>
      </div>

      {data?.length > 0 && searchText?.length > 2 && (
        <div className="search-list bg-bg_color_primary text-text_color_primary1">
          {categories.map((category) => (
            <>
              <div className="search-game-name">
                <b>{category}</b>
              </div>
              {data
                .filter((item) => item.eventType === category)
                .map((item, i) => (
                  <Link
                    className="group"
                    onClick={handleHideDropdown}
                    key={i}
                    to={`/event-details/${item?.eventTypeId}/${item?.eventId}`}
                  >
                    <div className="search-list-item">
                      <div className="search-tournament-name">
                        <b className="group-hover:underline">{item?.name}</b>
                      </div>
                      <div className="search-game-date group-hover:underline">
                        {item?.openDate}
                      </div>
                    </div>
                  </Link>
                ))}
            </>
          ))}
        </div>
      )}

      {data?.length === 0 && searchText?.length > 4 && (
        <div
          className=" absolute top-10 right-0 w-full peer gap-4 appearance-none text-xs py-3 border flex flex-col bg-bg_color_primary rounded-md shadow-md text-text_color_primary1 overflow-y-auto max-h-[300px] no-scrollbar"
          style={{ zIndex: 1000 }}
        >
          <div className="flex font-lato items-center justify-center w-full">
            No data found
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
