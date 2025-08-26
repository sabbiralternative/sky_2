import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userToken } from "../../../redux/features/auth/authSlice";
import { AxiosSecure } from "../../../lib/AxiosSecure";
import { API } from "../../../api";
import { Link } from "react-router-dom";

const MobileSearch = ({ setShowMobileSearch }) => {
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
    setShowMobileSearch(false);
    setSearchText("");
    setData([]);
  };

  return (
    <div className="transition-all ease-in-out duration-300 origin-top-right relative ml-2 w-full popUpOpenAnimation flex items-center">
      <input
        autoFocus
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        id="searchEventsMobile"
        className="relative z-1 bg-transparent text-text_Quaternary outline-none border-none focus-none w-full pr-6 font-lato text-white"
        type="text"
        placeholder=" Search Events(At least 3 letters)..."
      />
      <button
        onClick={handleHideDropdown}
        className="pl-4 flex items-center justify-center opacity-95 hover:opacity:100 absolute top-1/2 right-1 active:scale-150 -translate-y-1/2"
        aria-label="Cancel Search"
      >
        <svg
          width="14"
          height="19"
          viewBox="0 0 13 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.96881 6.99994L12.448 2.70994C12.6441 2.52164 12.7543 2.26624 12.7543 1.99994C12.7543 1.73364 12.6441 1.47825 12.448 1.28994C12.2518 1.10164 11.9858 0.99585 11.7084 0.99585C11.431 0.99585 11.165 1.10164 10.9688 1.28994L6.50006 5.58994L2.03131 1.28994C1.83516 1.10164 1.56912 0.99585 1.29173 0.99585C1.01433 0.99585 0.748292 1.10164 0.552142 1.28994C0.355992 1.47825 0.245796 1.73364 0.245796 1.99994C0.245796 2.26624 0.355992 2.52164 0.552142 2.70994L5.03131 6.99994L0.552142 11.2899C0.454508 11.3829 0.377014 11.4935 0.32413 11.6154C0.271246 11.7372 0.244019 11.8679 0.244019 11.9999C0.244019 12.132 0.271246 12.2627 0.32413 12.3845C0.377014 12.5064 0.454508 12.617 0.552142 12.7099C0.648978 12.8037 0.764188 12.8781 0.891124 12.9288C1.01806 12.9796 1.15421 13.0057 1.29173 13.0057C1.42924 13.0057 1.56539 12.9796 1.69233 12.9288C1.81926 12.8781 1.93447 12.8037 2.03131 12.7099L6.50006 8.40994L10.9688 12.7099C11.0656 12.8037 11.1809 12.8781 11.3078 12.9288C11.4347 12.9796 11.5709 13.0057 11.7084 13.0057C11.8459 13.0057 11.9821 12.9796 12.109 12.9288C12.2359 12.8781 12.3511 12.8037 12.448 12.7099C12.5456 12.617 12.6231 12.5064 12.676 12.3845C12.7289 12.2627 12.7561 12.132 12.7561 11.9999C12.7561 11.8679 12.7289 11.7372 12.676 11.6154C12.6231 11.4935 12.5456 11.3829 12.448 11.2899L7.96881 6.99994Z"
            fill="white"
          ></path>
        </svg>
      </button>
      <div
        className="absolute top-12  search-box "
        style={{ display: "block" }}
      >
        {data?.length > 0 && searchText?.length > 2 && (
          <div className="search-list" style={{ left: "-15px" }}>
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
      </div>
      {data?.length === 0 && searchText?.length > 4 && (
        <div
          className="lg:hidden absolute top-8 right-10 w-full peer gap-4 appearance-none text-xs py-3 border flex flex-col bg-bg_color_primary rounded-md shadow-md text-text_color_primary1 overflow-y-auto max-h-[300px] no-scrollbar"
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

export default MobileSearch;
