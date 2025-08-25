import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useExposure } from "../../../hooks/exposure";
import { useGetLadderMutation } from "../../../redux/features/events/events";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import images from "../../../assets/images";
import BetSlip from "./BetSlip";

const Fancy = ({ data }) => {
  const fancyData = data?.filter(
    (fancy) =>
      fancy.btype === "FANCY" &&
      fancy.tabGroupName === "Normal" &&
      fancy?.visible == true
  );
  const [marketName, setMarketName] = useState("");
  const [ladderData, setLadderData] = useState([]);
  const { eventId } = useParams();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { runnerId } = useSelector((state) => state.event);
  const { data: exposure } = useExposure(eventId);
  const [getLadder] = useGetLadderMutation();

  const handleBetSlip = (betType, games, runner, price, bottomValue) => {
    if (token) {
      let selectionId;
      let runnerId;
      let eventTypeId;
      if (!price) {
        return;
      }

      let pnlBySelection;
      const updatedPnl = [];

      if (exposure?.pnlBySelection) {
        const obj = exposure?.pnlBySelection;
        pnlBySelection = Object?.values(obj);
      }

      if (games?.btype == "FANCY") {
        selectionId = games?.id;
        runnerId = games?.id;
        eventTypeId = games?.eventTypeId;
      } else if (games?.btype && games?.btype !== "FANCY") {
        selectionId = runner?.id;
        runnerId = games.runners.map((runner) => runner.id);
        eventTypeId = games?.eventTypeId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === runner?.id);
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      } else {
        selectionId = runner?.selectionId;
        eventTypeId = games?.marketId;
        games?.runners?.forEach((runner) => {
          const pnl = pnlBySelection?.find(
            (p) => p?.RunnerId === runner?.selectionId
          );
          if (pnl) {
            updatedPnl.push(pnl?.pnl);
          }
        });
      }

      const betData = {
        price,
        side: betType === "back" ? 0 : 1,
        selectionId,
        btype: games?.btype,
        eventTypeId,
        betDelay: games?.betDelay,
        marketId: games?.id,
        lay: betType === "lay",
        back: betType === "back",
        selectedBetName: runner?.name,
        name: games.runners.map((runner) => runner.name),
        runnerId,
        isWeak: games?.isWeak,
        maxLiabilityPerMarket: games?.maxLiabilityPerMarket,
        isBettable: games?.isBettable,
        maxLiabilityPerBet: games?.maxLiabilityPerBet,
        pnl: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
        bottomValue,
      };
      if (games?.btype == "FANCY") {
        dispatch(setRunnerId(games?.id));
      } else if (games?.btype && games?.btype !== "FANCY") {
        dispatch(setRunnerId(runner?.id));
      } else {
        dispatch(setRunnerId(runner?.selectionId));
      }

      dispatch(setPlaceBetValues(betData));
    } else {
      dispatch(setShowLoginModal(true));
    }
  };

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }

  const handleGetLadder = async (pnl, marketName) => {
    if (!pnl?.MarketId) {
      return;
    }
    setMarketName(marketName);
    const res = await getLadder({ marketId: pnl?.MarketId }).unwrap();

    if (res.success) {
      setLadderData(res.result);
    }
  };

  return (
    <>
      {fancyData?.length > 0 && (
        <div data-v-27b97780 className="dScreen fancy_odds fancy-primium-tabs">
          <ul
            data-v-27b97780
            className="nav nav-pills fancy-primium-tabs-pills"
            id="pills-tab"
            role="tablist"
          >
            <li data-v-27b97780 className="nav-item" role="presentation">
              <button
                data-v-27b97780
                className="nav-link active"
                id="fancy-all-tab"
                data-bs-toggle="pill"
                data-bs-target="#fancy-all"
                type="button"
                role="tab"
                aria-controls="fancy-all"
                aria-selected="true"
              >
                Fancy
              </button>
            </li>
            <li data-v-27b97780 className="nav-item" role="presentation">
              <button
                data-v-27b97780
                className="nav-link"
                id="premium-tab"
                data-bs-toggle="pill"
                data-bs-target="#premium-market"
                type="button"
                role="tab"
                aria-controls="premium-market"
                aria-selected="true"
              >
                Premium{" "}
                <em data-v-27b97780 className="blink-soft">
                  new
                </em>
              </button>
            </li>
            <li data-v-27b97780 className="nav-item" role="presentation">
              <button
                data-v-27b97780
                className="nav-link"
                id="line-tab"
                data-bs-toggle="pill"
                data-bs-target="#fancy-all"
                type="button"
                role="tab"
                aria-controls="line"
                aria-selected="true"
              >
                <span data-v-27b97780 />
                <span data-v-27b97780>Session Markets</span>
              </button>
            </li>
            <li data-v-27b97780 className="nav-item" role="presentation">
              <button
                data-v-27b97780
                className="nav-link"
                id="line-tab"
                data-bs-toggle="pill"
                data-bs-target="#fancy-all"
                type="button"
                role="tab"
                aria-controls="line"
                aria-selected="true"
              >
                <span data-v-27b97780 />
                <span data-v-27b97780>Over Session Market</span>
              </button>
            </li>
            <li data-v-27b97780 className="nav-item" role="presentation">
              <button
                data-v-27b97780
                className="nav-link"
                id="line-tab"
                data-bs-toggle="pill"
                data-bs-target="#fancy-all"
                type="button"
                role="tab"
                aria-controls="line"
                aria-selected="true"
              >
                <span data-v-27b97780 />
                <span data-v-27b97780>Ball By Ball</span>
              </button>
            </li>
            <li data-v-27b97780 className="nav-item" role="presentation">
              <button
                data-v-27b97780
                className="nav-link"
                id="line-tab"
                data-bs-toggle="pill"
                data-bs-target="#fancy-all"
                type="button"
                role="tab"
                aria-controls="line"
                aria-selected="true"
              >
                <span data-v-27b97780 />
                <span data-v-27b97780>Fall Of Wicket</span>
              </button>
            </li>
            <li data-v-27b97780 className="nav-item" role="presentation">
              <button
                data-v-27b97780
                className="nav-link"
                id="line-tab"
                data-bs-toggle="pill"
                data-bs-target="#fancy-all"
                type="button"
                role="tab"
                aria-controls="line"
                aria-selected="true"
              >
                <span data-v-27b97780 />
                <span data-v-27b97780>Other Markets</span>
              </button>
            </li>
            <li data-v-27b97780 className="nav-item" role="presentation">
              <button
                data-v-27b97780
                className="nav-link"
                id="line-tab"
                data-bs-toggle="pill"
                data-bs-target="#fancy-all"
                type="button"
                role="tab"
                aria-controls="line"
                aria-selected="true"
              >
                <span data-v-27b97780 />
                <span data-v-27b97780>Total Advance</span>
              </button>
            </li>
            <li data-v-27b97780 className="nav-item" role="presentation">
              <button
                data-v-27b97780
                className="nav-link"
                id="line-tab"
                data-bs-toggle="pill"
                data-bs-target="#fancy-all"
                type="button"
                role="tab"
                aria-controls="line"
                aria-selected="true"
              >
                <span data-v-27b97780 />
                <span data-v-27b97780>Meter Markets</span>
              </button>
            </li>
            <li data-v-27b97780 className="nav-item" role="presentation">
              <button
                data-v-27b97780
                className="nav-link"
                id="line-tab"
                data-bs-toggle="pill"
                data-bs-target="#fancy-all"
                type="button"
                role="tab"
                aria-controls="line"
                aria-selected="true"
              >
                <span data-v-27b97780 />
                <span data-v-27b97780>Khado Markets</span>
              </button>
            </li>
            <li data-v-27b97780 className="nav-item" role="presentation">
              <button
                data-v-27b97780
                className="nav-link"
                id="line-tab"
                data-bs-toggle="pill"
                data-bs-target="#fancy-all"
                type="button"
                role="tab"
                aria-controls="line"
                aria-selected="true"
              >
                <span data-v-27b97780 />
                <span data-v-27b97780>Odd Event Markets</span>
              </button>
            </li>
          </ul>
          <div data-v-27b97780 className="tab-content" id="pills-tabContent">
            <div
              data-v-27b97780
              className="tab-pane fade show active"
              id="fancy-all"
              role="tabpanel"
              aria-labelledby="fancy-all-tab"
            >
              <div
                data-v-27b97780
                type="nav de_fancyTab"
                className="tab-container"
              >
                <div data-v-27b97780 className="tab-content">
                  <div
                    data-v-27b97780
                    className="tab-pane fade show active"
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div data-v-27b97780 className="container-fluid pb-0">
                      <div
                        data-v-27b97780
                        className="fancy-tabs-head btn-color"
                      >
                        <div data-v-27b97780 className="row">
                          <div data-v-27b97780 className="col-md-5 col-7 px-0">
                            <span data-v-27b97780 className="team-name">
                              Session Markets
                            </span>
                          </div>
                          <div data-v-27b97780 className="col-md-7 col-5 px-0">
                            <div
                              data-v-27b97780
                              className="btn-group dOddsBox btn-color"
                            >
                              <button data-v-27b97780 className="lay2" />
                              <button data-v-27b97780 className="lay1" />
                              <button data-v-27b97780 className="lay lay-img-2">
                                No
                              </button>
                              <button
                                data-v-27b97780
                                className="back back-img-2"
                              >
                                Yes
                              </button>
                              <button data-v-27b97780 className="min-max-bet">
                                Min-Max
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {fancyData?.map((game) => {
                        const pnl =
                          pnlBySelection?.find(
                            (pnl) => pnl?.MarketId === game?.id
                          ) || {};
                        return (
                          <div
                            key={game?.id}
                            data-v-27b97780
                            className="fancy-tabs btn-color btn-color bet-slip-area"
                          >
                            <div data-v-27b97780 className="row">
                              <div
                                data-v-27b97780
                                className="col-md-5 col-7 px-0"
                              >
                                <p data-v-27b97780="" className="team-name">
                                  <span
                                    data-v-27b97780=""
                                    className="team-pin-img"
                                  >
                                    <img
                                      data-v-27b97780=""
                                      rel="preload"
                                      src={images.pinWhite}
                                      className="img-fluid"
                                    />
                                  </span>
                                  <b data-v-27b97780="">
                                    <div
                                      data-v-27b97780=""
                                      className="fancy-title-row"
                                    >
                                      <span data-v-27b97780="">
                                        {game?.name}
                                      </span>
                                      <img
                                        data-v-27b97780=""
                                        src="data:image/webp;base64,UklGRlABAABXRUJQVlA4TEMBAAAvEkAEELehoG0jJ/lxP7k/43saittIambJcAdf+u8zMWgkSUr3Pge4wr8nGDaRbTs55Ax3EECHAEShKouiRcIPJVQ/AB6vZN2HBSIoQQQRIJi7xjwGY4KJSgQ4Ps5gAshAjIwVscFYEYMO4RSej82bCRj5ef/X5Pt75Uxgy/MNc92rIjGYlGBSa/8lmt79YDDvfT5DFWEdwjYYrcKWsCVsCFvClrAhbIHDSLbTRmZmh2NmDOr1X1tGkVqI6L/Ctm2b7J20ZxAhVrYiBKPtNBEo6XwRcvxMRb51ek21gKVgf/mSgLOVtipzgfQH+YLtyo48npmR9Ui/CTPXf+Pl/KhqKYaKObP8Ah9Z1ZsvHjdC2DsBfNzDBzRVCYvFCgAUWGrOm8MXAOAdSby/cj4AaMv/ZtWjwJYRPuo93olFBGjKd16MAAA="
                                      />
                                    </div>
                                    <span
                                      data-v-27b97780=""
                                      className="SportEvent__market__title__exposure"
                                    ></span>
                                  </b>
                                </p>

                                <div data-v-27b97780 className="minmax-row">
                                  <span data-v-27b97780 className="mo_min-max">
                                    <b data-v-27b97780>Min Max</b> 100-{" "}
                                    {game?.maxLiabilityPerBet}
                                  </span>
                                </div>
                              </div>
                              <div
                                data-v-27b97780
                                className="col-md-7 col-5 px-0"
                              >
                                <div
                                  data-v-27b97780
                                  className="btn-group dOddsBox"
                                >
                                  <button
                                    data-v-27b97780
                                    className="back back2"
                                  />
                                  <button
                                    data-v-27b97780
                                    className="back back1"
                                  />
                                  <button
                                    onClick={() =>
                                      handleBetSlip(
                                        "lay",
                                        game,
                                        game?.runners?.[0],
                                        game?.runners?.[0]?.lay?.[0]?.line,
                                        game?.runners?.[0]?.lay?.[0]?.price
                                      )
                                    }
                                    data-v-27b97780
                                    className="lay"
                                  >
                                    {game?.runners?.[0]?.lay?.[0]?.line}{" "}
                                    <span data-v-27b97780>
                                      {" "}
                                      {game?.runners?.[0]?.lay?.[0]?.price}
                                    </span>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleBetSlip(
                                        "back",
                                        game,
                                        game?.runners?.[0],
                                        game?.runners?.[0]?.back?.[0]?.line,
                                        game?.runners?.[0]?.back?.[0]?.price
                                      )
                                    }
                                    data-v-27b97780
                                    className="back"
                                  >
                                    {game?.runners?.[0]?.back?.[0]?.line}{" "}
                                    <span data-v-27b97780>
                                      {game?.runners?.[0]?.back?.[0]?.price}
                                    </span>
                                  </button>
                                  <button
                                    data-v-27b97780
                                    className="min-max-bet"
                                  >
                                    <dl data-v-27b97780 className="fancy-info">
                                      <dd data-v-27b97780>
                                        100- {game?.maxLiabilityPerBet}
                                      </dd>
                                    </dl>
                                  </button>
                                </div>
                              </div>
                            </div>
                            {game?.id === runnerId && <BetSlip />}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Fancy;
