import { useEffect, useState } from "react";
import SidebarLayout from "../../layout/SidebarLayout";
import { useGroupQuery } from "../../redux/features/events/events";
import { useNavigate, useParams } from "react-router-dom";

const Sports = () => {
  const { id } = useParams();
  const { data } = useGroupQuery(
    { sportsType: Number(id) },
    {
      pollingInterval: 1000,
    }
  );

  const [categories, setCategories] = useState([]);
  const eventName = { 4: "Cricket", 2: "Tennis", 1: "Football" };
  const navigate = useNavigate();
  const navigateGameList = (keys) => {
    navigate(`/event-details/${data[keys]?.eventTypeId}/${keys}`);
  };

  useEffect(() => {
    if (data) {
      const categories = Array.from(
        new Set(
          Object.values(data)
            .filter((item) => item.visible)
            .map((item) => item.eventTypeId)
        )
      );
      const sortedCategories = categories.sort((a, b) => {
        const order = { 4: 0, 1: 1, 2: 2 };
        return order[a] - order[b];
      });
      setCategories(sortedCategories);
    }
  }, [data]);
  return (
    <div>
      <SidebarLayout>
        <div className="match-menu">
          <div className="popup-button">
            <ul className="nav nav-pills es-tabs-ui">
              <li className="nav-item">
                <button className="nav-link active">Exchange</button>
              </li>
              <li className="nav-item">
                <button type="button" className="nav-link">
                  sportsbook
                </button>
              </li>
            </ul>
          </div>
          <div className="match-days-tab">
            {id == 0 && (
              <div className="match-days-head">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      <span>In-Play</span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      <span>Today</span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="contact-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#contact"
                      type="button"
                      role="tab"
                      aria-controls="contact"
                      aria-selected="false"
                    >
                      <span>Tomorrow</span>
                    </button>
                  </li>
                </ul>
                <div className="search-icon-popup in-play-popup">
                  <a
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#search-event-modal"
                  >
                    <i className="fa-sharp fa-solid fa-magnifying-glass" />
                  </a>
                </div>
              </div>
            )}

            <div className="play-days-match">
              {categories?.map((category) => {
                const filteredData = Object.entries(data)
                  .filter(
                    ([, value]) =>
                      value.eventTypeId === category && value.visible === true
                  )
                  .reduce((obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                  }, {});
                return (
                  <div key={category} className="tab-set top-p">
                    <div className="tab-panel hero-img">
                      <div className="match-play">
                        <div className="ng-star-inserted">
                          <div className="competition-head inplay-header-filter">
                            <h3 className="text-capitalize">
                              {" "}
                              {eventName[category]}
                            </h3>
                            <ul className="live_virtual">
                              <li>
                                <input
                                  type="checkbox"
                                  className="filter-checkbox"
                                  defaultValue="Order one"
                                />
                                <label>LIVE</label>
                              </li>
                              <li>
                                <input
                                  type="checkbox"
                                  className="filter-checkbox"
                                  defaultValue="Order Two"
                                />
                                <label>VIRTUAL</label>
                              </li>
                            </ul>
                          </div>
                          <div className="oneX2">
                            <div className="container-fluid">
                              <div className="row">
                                <div className="col-md-7" />
                                <div className="col-md-4">
                                  <div className="oddsEventlist">
                                    <div className="btn-group">
                                      <span>1</span>
                                    </div>
                                    <div className="btn-group">
                                      <span>X</span>
                                    </div>
                                    <div className="btn-group">
                                      <span>2</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-1" />
                              </div>
                            </div>
                          </div>
                          <div className="ng-star-inserted">
                            <div className="ng-star-inserted">
                              {data &&
                                Object.values(data).length > 0 &&
                                Object.keys(filteredData)
                                  .sort(
                                    (keyA, keyB) =>
                                      data[keyA].sort - data[keyB].sort
                                  )
                                  .map((keys, index) => {
                                    if (!data?.[keys]?.visible) {
                                      return null;
                                    }

                                    return (
                                      <div
                                        onClick={() => navigateGameList(keys)}
                                        key={index}
                                        className="row-my"
                                      >
                                        <div className="container-fluid">
                                          <div className="row">
                                            <div className="col-md-7 col-10">
                                              <p className="matchname">
                                                <a
                                                  style={{
                                                    display: "flex",
                                                    gap: "10px",
                                                    alignItems: "center",
                                                  }}
                                                >
                                                  {data?.[keys]?.inPlay ===
                                                    1 && (
                                                    <img
                                                      style={{
                                                        height: "8px",
                                                      }}
                                                      rel="preload"
                                                      src="data:image/webp;base64,UklGRn4CAABXRUJQVlA4WAoAAAAwAAAABwAABwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBINQAAAAEvQBZgMoL5c6STSF8aERHcLlAUSYorqAoHA9w/OcDBJQEpov+R95eAluA4dIee4AS0vL8AAFZQOCBSAAAAsAIAnQEqCAAIAAFAJiWoAnS6AS38PEBDlEQWVlwAAP2/tcP1uvKr57eKep+mlTM4vgK9McG9xR8txvf/6bGg4x/Ah4f8jSnw2/R2WW9rbPkAAA=="
                                                      className="img-fluid ng-star-inserted"
                                                    />
                                                  )}
                                                  {data[keys]?.player1} v{" "}
                                                  {data[keys]?.player2}
                                                </a>
                                                <b>
                                                  {data?.[keys]?.inPlay ===
                                                    1 && (
                                                    <span className="in_play img-fluid ng-star-inserted">
                                                      In-Play
                                                    </span>
                                                  )}
                                                  {data?.[keys]?.isFancy ===
                                                    1 && (
                                                    <span className="game-fancy ng-star-inserted">
                                                      <img
                                                        rel="preload"
                                                        src="data:image/webp;base64,UklGRtACAABXRUJQVlA4WAoAAAAwAAAAFwAAFwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIegAAAAFHIBBI4SYXEREGuI1tW1W+f3IPKcEl1AIICSnBJXTYdf97n3UQ0X9Fbts29Km7/kYUlDOSXOxQUvGC2XA4jMUXCnPlX71kkpcMPSA2zAFzvIH7et1Q9qpVR3nA/XYrlbcxa1SsBVfsAolZ11mxYlbcRuZgOKxHgYkAVlA4IGAAAABwAwCdASoYABgAPm0sk0akIiGhMBgIAIANiUAYaAKqBKxXlQAA/vjasyAPnrGXpErQL135u5qqODUVE20X/0u9clcbLuFdzuTkd8X+l9xg3DelzHD+OJwZIrr/+z4QAAA="
                                                        className="img-fluid"
                                                      />
                                                    </span>
                                                  )}
                                                  <span className="game-bm ng-star-inserted">
                                                    <img
                                                      rel="preload"
                                                      src="data:image/webp;base64,UklGRtoCAABXRUJQVlA4WAoAAAAwAAAAFwAAFwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIeAAAAAFHIBBI4SYXEREGuI1s202OvEJbgIQPfU5IGYSU8EM8t2305SuI6L/atm0Yey2J3mAiJ2p6BWxbMsBZMrN9U1fp8o82dZc2zSg8pLgZhbcUNaPwkYr0Y6PQ3nK7EG9NRJNWkpwa0c6VEyOuZ68ayyK2hrwuxBMTGVZQOCBsAAAA8AMAnQEqGAAYAD5tMpVHpCKiISgIAIANiWgAnS/VjALtg3kYCD6WgAD++bJNAoMiTeQ2qlcqfLc1DgGLpfsiGfHen+GiIbcZD6NiTTtRk1X42Mn9BvdZ1OsVRo85+q8/yQnUf7bkywYLQCAA"
                                                      className="img-fluid"
                                                    />
                                                  </span>

                                                  <span className="timer-on">
                                                    {data[keys]?.date}
                                                  </span>
                                                </b>
                                              </p>
                                            </div>
                                            <div className="col-md-4 col">
                                              <div className="oddsEventlist">
                                                <div className="btn-group">
                                                  <button className="back">
                                                    {" "}
                                                    {data?.[keys]?.[0]?.ex
                                                      ?.availableToBack[0]
                                                      ?.price || "-"}
                                                  </button>
                                                  <button className="lay">
                                                    {" "}
                                                    {data?.[keys]?.[0]?.ex
                                                      ?.availableToBack?.[0]
                                                      ?.size || "-"}
                                                  </button>
                                                </div>
                                                <div className="btn-group">
                                                  <button className="back">
                                                    {" "}
                                                    {data?.[keys]?.[2]?.ex
                                                      ?.availableToBack?.[0]
                                                      ?.price || "-"}
                                                  </button>
                                                  <button className="lay">
                                                    {" "}
                                                    {data?.[keys]?.[2]?.ex
                                                      ?.availableToBack?.[0]
                                                      ?.size || "-"}
                                                  </button>
                                                </div>
                                                <div className="btn-group">
                                                  <button className="back">
                                                    {" "}
                                                    {data?.[keys]?.[1]?.ex
                                                      ?.availableToBack?.[0]
                                                      ?.price || "-"}
                                                  </button>
                                                  <button className="lay">
                                                    {" "}
                                                    {data?.[keys]?.[1]?.ex
                                                      ?.availableToBack?.[0]
                                                      ?.size || "-"}
                                                  </button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="condition-footer">
            <div className="row">
              <div className="col-md-12">
                <div className="inner-footer">
                  <div className="support-wrap">
                    <div className="support-mail">
                      <a className="rules-btn-home">Privacy Policy</a>
                      <a className="rules-btn-home arrow">KYC</a>
                      <a className="rules-btn-home arrow">
                        Terms and Conditions
                      </a>
                      <a className="rules-btn-home arrow">
                        Rules and Regulations
                      </a>
                      <a className="rules-btn-home arrow">
                        Responsible Gambling
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default Sports;
