import { useSelector } from "react-redux";
import { useGroupQuery } from "../../../redux/features/events/events";

const InPlay = () => {
  const { group } = useSelector((state) => state.global);

  const { data } = useGroupQuery(
    { sportsType: group },
    {
      pollingInterval: 1000,
    }
  );

  return (
    <div>
      <div
        className="tab-pane fade hero-img show active"
        id="pills-home"
        role="tabpanel"
        aria-labelledby="pills-home-tab"
        tabIndex={0}
      >
        <div className="time-dropdown">
          <div className="ng-star-inserted">
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
                  Object.keys(data)
                    .sort((keyA, keyB) => data[keyA].sort - data[keyB].sort)
                    .map((keys, index) => {
                      if (!data?.[keys]?.visible) {
                        return null;
                      }

                      return (
                        <div key={index} className="row-my">
                          <div className="container-fluid">
                            <div className="row">
                              <div className="col-md-7 col-10">
                                <p className="matchname">
                                  <a>
                                    <img
                                      rel="preload"
                                      src="data:image/webp;base64,UklGRn4CAABXRUJQVlA4WAoAAAAwAAAABwAABwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBINQAAAAEvQBZgMoL5c6STSF8aERHcLlAUSYorqAoHA9w/OcDBJQEpov+R95eAluA4dIee4AS0vL8AAFZQOCBSAAAAsAIAnQEqCAAIAAFAJiWoAnS6AS38PEBDlEQWVlwAAP2/tcP1uvKr57eKep+mlTM4vgK9McG9xR8txvf/6bGg4x/Ah4f8jSnw2/R2WW9rbPkAAA=="
                                      className="img-fluid ng-star-inserted"
                                    />
                                    {data[keys]?.player1} v{" "}
                                    {data[keys]?.player2}
                                  </a>
                                  <b>
                                    <span className="in_play img-fluid ng-star-inserted">
                                      In-Play
                                    </span>
                                    <span className="game-fancy ng-star-inserted">
                                      <img
                                        rel="preload"
                                        src="/img/P-alphavat.5ef198fe.svg"
                                        className="img-fluid"
                                      />
                                    </span>
                                    <span className="game-fancy ng-star-inserted">
                                      <img
                                        rel="preload"
                                        src="data:image/webp;base64,UklGRtACAABXRUJQVlA4WAoAAAAwAAAAFwAAFwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIegAAAAFHIBBI4SYXEREGuI1tW1W+f3IPKcEl1AIICSnBJXTYdf97n3UQ0X9Fbts29Km7/kYUlDOSXOxQUvGC2XA4jMUXCnPlX71kkpcMPSA2zAFzvIH7et1Q9qpVR3nA/XYrlbcxa1SsBVfsAolZ11mxYlbcRuZgOKxHgYkAVlA4IGAAAABwAwCdASoYABgAPm0sk0akIiGhMBgIAIANiUAYaAKqBKxXlQAA/vjasyAPnrGXpErQL135u5qqODUVE20X/0u9clcbLuFdzuTkd8X+l9xg3DelzHD+OJwZIrr/+z4QAAA="
                                        className="img-fluid"
                                      />
                                    </span>
                                    <span className="game-bm ng-star-inserted">
                                      <img
                                        rel="preload"
                                        src="data:image/webp;base64,UklGRtoCAABXRUJQVlA4WAoAAAAwAAAAFwAAFwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIeAAAAAFHIBBI4SYXEREGuI1s202OvEJbgIQPfU5IGYSU8EM8t2305SuI6L/atm0Yey2J3mAiJ2p6BWxbMsBZMrN9U1fp8o82dZc2zSg8pLgZhbcUNaPwkYr0Y6PQ3nK7EG9NRJNWkpwa0c6VEyOuZ68ayyK2hrwuxBMTGVZQOCBsAAAA8AMAnQEqGAAYAD5tMpVHpCKiISgIAIANiWgAnS/VjALtg3kYCD6WgAD++bJNAoMiTeQ2qlcqfLc1DgGLpfsiGfHen+GiIbcZD6NiTTtRk1X42Mn9BvdZ1OsVRo85+q8/yQnUf7bkywYLQCAA"
                                        className="img-fluid"
                                      />
                                    </span>
                                    {/**/}
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
                                      {data?.[keys]?.[0]?.ex?.availableToBack[0]
                                        ?.price || "-"}
                                    </button>
                                    <button className="lay">
                                      {" "}
                                      {data?.[keys]?.[0]?.ex
                                        ?.availableToBack?.[0]?.size || "-"}
                                    </button>
                                  </div>
                                  <div className="btn-group">
                                    <button className="back">
                                      {" "}
                                      {data?.[keys]?.[2]?.ex
                                        ?.availableToBack?.[0]?.price || "-"}
                                    </button>
                                    <button className="lay">
                                      {" "}
                                      {data?.[keys]?.[2]?.ex
                                        ?.availableToBack?.[0]?.size || "-"}
                                    </button>
                                  </div>
                                  <div className="btn-group">
                                    <button className="back">
                                      {" "}
                                      {data?.[keys]?.[1]?.ex
                                        ?.availableToBack?.[0]?.price || "-"}
                                    </button>
                                    <button className="lay">
                                      {" "}
                                      {data?.[keys]?.[1]?.ex
                                        ?.availableToBack?.[0]?.size || "-"}
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
};

export default InPlay;
