import { useParams } from "react-router-dom";
import images from "../../../assets/images";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useExposure } from "../../../hooks/exposure";
import {
  setPlaceBetValues,
  setRunnerId,
} from "../../../redux/features/events/eventSlice";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import { Settings } from "../../../api";
import { handleCashOutPlaceBet } from "../../../utils/handleCashoutPlaceBet";
import BetSlip from "./BetSlip";

const MatchOddsBookmaker = ({ data }) => {
  const matchOddsBookmaker = data?.filter(
    (game) =>
      (game.btype === "MATCH_ODDS" || game.btype === "BOOKMAKER") &&
      game?.visible == true
  );
  const { eventId } = useParams();
  const [teamProfit, setTeamProfit] = useState([]);
  const dispatch = useDispatch();
  const { runnerId, stake, predictOdd } = useSelector((state) => state.event);
  const { token } = useSelector((state) => state.auth);
  const { data: exposure } = useExposure(eventId);

  const handleBetSlip = (betType, games, runner, price) => {
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
        games?.runners?.forEach((rnr) => {
          const pnl = pnlBySelection?.find((p) => p?.RunnerId === rnr?.id);
          if (pnl) {
            updatedPnl.push({
              exposure: pnl?.pnl,
              id: pnl?.RunnerId,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
          } else {
            updatedPnl.push({
              exposure: 0,
              id: rnr?.id,
              isBettingOnThisRunner: rnr?.id === runner?.id,
            });
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
        exposure: updatedPnl,
        marketName: games?.name,
        eventId: games?.eventId,
        totalSize: 0,
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

  const computeExposureAndStake = (
    exposureA,
    exposureB,
    runner1,
    runner2,
    gameId
  ) => {
    let runner, largerExposure, layValue, oppositeLayValue, lowerExposure;

    const pnlArr = [exposureA, exposureB];
    const isOnePositiveExposure = onlyOnePositive(pnlArr);

    if (exposureA > exposureB) {
      // Team A has a larger exposure.
      runner = runner1;
      largerExposure = exposureA;
      layValue = runner1?.lay?.[0]?.price;
      oppositeLayValue = runner2?.lay?.[0]?.price;
      lowerExposure = exposureB;
    } else {
      // Team B has a larger exposure.
      runner = runner2;
      largerExposure = exposureB;
      layValue = runner2?.lay?.[0]?.price;
      oppositeLayValue = runner1?.lay?.[0]?.price;
      lowerExposure = exposureA;
    }

    // Compute the absolute value of the lower exposure.
    let absLowerExposure = Math.abs(lowerExposure);

    // Compute the liability for the team with the initially larger exposure.
    let liability = absLowerExposure * (layValue - 1);

    // Compute the new exposure of the team with the initially larger exposure.
    let newExposure = largerExposure - liability;

    // Compute the profit using the new exposure and the lay odds of the opposite team.
    let profit = newExposure / layValue;

    // Calculate the new stake value for the opposite team by adding profit to the absolute value of its exposure.
    let newStakeValue = absLowerExposure + profit;

    // Return the results.
    return {
      runner,
      newExposure,
      profit,
      newStakeValue,
      oppositeLayValue,
      gameId,
      isOnePositiveExposure,
    };
  };
  function onlyOnePositive(arr) {
    let positiveCount = arr?.filter((num) => num > 0).length;
    return positiveCount === 1;
  }
  useEffect(() => {
    let results = [];
    if (
      matchOddsBookmaker?.length > 0 &&
      exposure?.pnlBySelection &&
      Object.keys(exposure?.pnlBySelection)?.length > 0
    ) {
      matchOddsBookmaker.forEach((game) => {
        const runners = game?.runners || [];
        if (runners?.length === 2) {
          const runner1 = runners[0];
          const runner2 = runners[1];
          const pnl1 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner1?.id
          )?.pnl;
          const pnl2 = pnlBySelection?.find(
            (pnl) => pnl?.RunnerId === runner2?.id
          )?.pnl;

          if (pnl1 && pnl2 && runner1 && runner2) {
            const result = computeExposureAndStake(
              pnl1,
              pnl2,
              runner1,
              runner2,
              game?.id
            );
            results.push(result);
          }
        }
      });
      setTeamProfit(results);
    } else {
      setTeamProfit([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, data]);

  let pnlBySelection;
  if (exposure?.pnlBySelection) {
    const obj = exposure?.pnlBySelection;
    pnlBySelection = Object?.values(obj);
  }
  return (
    <>
      {matchOddsBookmaker?.length > 0 &&
        matchOddsBookmaker?.map((game) => {
          const teamProfitForGame = teamProfit?.find(
            (profit) =>
              profit?.gameId === game?.id && profit?.isOnePositiveExposure
          );

          return (
            <div
              key={game?.id}
              data-v-27b97780
              className={`${
                game?.btype === "MATCH_ODDS"
                  ? "matchodds-cashout"
                  : "bookmaker-cashout"
              }`}
            >
              <div data-v-27b97780 className="dScreen who-win-sec">
                <div data-v-27b97780 className="container-fluid">
                  <div data-v-27b97780 className="odds-menu">
                    <div data-v-27b97780 className="row">
                      <div data-v-27b97780 className="col-md-12 col-12">
                        <p data-v-27b97780 className="match-odds">
                          <a
                            data-v-27b97780
                            href="Javascript:void(0);"
                            className="add-pins"
                          >
                            <img
                              data-v-27b97780
                              rel="preload"
                              src={images.pin}
                              className="img-fluid"
                            />
                          </a>{" "}
                          {game?.name?.toUpperCase()}
                          {Settings.betFairCashOut &&
                            game?.runners?.length !== 3 &&
                            game?.status === "OPEN" &&
                            game?.name !== "toss" && (
                              <div
                                style={{
                                  cursor: `${
                                    !teamProfitForGame
                                      ? "not-allowed"
                                      : "pointer"
                                  }`,
                                  opacity: `${
                                    !teamProfitForGame ? "0.6" : "1"
                                  }`,
                                }}
                                data-v-27b97780
                                className={`btn-cashout  ${
                                  teamProfitForGame?.profit > 0
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                }`}
                                onClick={() =>
                                  handleCashOutPlaceBet(
                                    game,
                                    "lay",
                                    dispatch,
                                    pnlBySelection,
                                    token,
                                    teamProfitForGame
                                  )
                                }
                              >
                                Cashout{" "}
                                {teamProfitForGame?.profit &&
                                  `(${teamProfitForGame.profit.toFixed(2)})`}
                              </div>
                            )}
                          <a
                            data-v-27b97780
                            href="#"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdropnow"
                          >
                            <span data-v-27b97780 className="info_mdi">
                              <img data-v-27b97780 src={images.info} />
                            </span>
                          </a>
                        </p>

                        <p />
                      </div>
                    </div>
                  </div>
                  <div data-v-27b97780 className="odds-menu btn-color">
                    <div data-v-27b97780 className="row">
                      <div data-v-27b97780 className="col-md-5 col-7">
                        <div data-v-27b97780 className="minmax mm-fi">
                          <dl data-v-27b97780 className="fancy-info">
                            <dt data-v-27b97780>Min/Max</dt>
                            <dd data-v-27b97780>
                              100-{game?.maxLiabilityPerBet}
                            </dd>
                          </dl>
                        </div>
                      </div>
                      <div data-v-27b97780 className="col-md-7 col-5">
                        <div data-v-27b97780 className="btn-group dOddsBox">
                          <button data-v-27b97780 className="back2" />
                          <button data-v-27b97780 className="back1" />
                          <button data-v-27b97780 className="back back-img">
                            Back
                          </button>
                          <button data-v-27b97780 className="lay lay-img">
                            Lay
                          </button>
                          <button data-v-27b97780 className="min-max-bet">
                            <dl data-v-27b97780 className="fancy-info">
                              <dt data-v-27b97780>Min/Max</dt>
                              <dd data-v-27b97780>
                                100.00-{game?.maxLiabilityPerBet}
                              </dd>
                            </dl>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div data-v-27b97780>
                    {game?.runners?.map((runner) => {
                      const pnl = pnlBySelection?.find(
                        (pnl) => pnl?.RunnerId === runner?.id
                      );
                      const predictOddValues = predictOdd?.find(
                        (val) => val?.id === runner?.id
                      );
                      return (
                        <div
                          key={runner?.id}
                          data-v-27b97780
                          className="odds-menu bet-slip-area"
                        >
                          <div data-v-27b97780 className="row">
                            <div data-v-27b97780 className="col-md-5 col-7">
                              <p data-v-27b97780 className="team-name">
                                {runner?.name} &nbsp;{" "}
                                <span
                                  data-v-27b97780
                                  className="SportEvent__market__title__exposure"
                                />
                              </p>
                            </div>
                            <div data-v-27b97780 className="col-md-7 col-5">
                              <div
                                data-v-27b97780
                                className="btn-group dOddsBox"
                              >
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "back",
                                      game,
                                      runner,
                                      runner?.back?.[2]?.price
                                    )
                                  }
                                  data-v-27b97780
                                  type="button"
                                  className="back back2"
                                >
                                  {runner?.back?.[2]?.price}{" "}
                                  <span data-v-27b97780>
                                    {runner?.back?.[2]?.size}
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "back",
                                      game,
                                      runner,
                                      runner?.back?.[1]?.price
                                    )
                                  }
                                  data-v-27b97780
                                  type="button"
                                  className="back back1"
                                >
                                  {runner?.back?.[1]?.price}{" "}
                                  <span data-v-27b97780>
                                    {runner?.back?.[1]?.size}
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "back",
                                      game,
                                      runner,
                                      runner?.back?.[0]?.price
                                    )
                                  }
                                  data-v-27b97780
                                  type="button"
                                  className="back"
                                >
                                  {runner?.back?.[0]?.price}{" "}
                                  <span data-v-27b97780>
                                    {runner?.back?.[0]?.size}
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "lay",
                                      game,
                                      runner,
                                      runner?.lay?.[0]?.price
                                    )
                                  }
                                  data-v-27b97780
                                  type="button"
                                  className="lay"
                                  data-bs-toggle="collapse"
                                  data-bs-target="#collapseExample-one"
                                >
                                  {runner?.lay?.[0]?.price}{" "}
                                  <span data-v-27b97780>
                                    {runner?.lay?.[0]?.size}
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "lay",
                                      game,
                                      runner,
                                      runner?.lay?.[1]?.price
                                    )
                                  }
                                  data-v-27b97780
                                  type="button"
                                  className="lay lay1"
                                >
                                  {runner?.lay?.[1]?.price}{" "}
                                  <span data-v-27b97780>
                                    {" "}
                                    {runner?.lay?.[1]?.size}
                                  </span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleBetSlip(
                                      "lay",
                                      game,
                                      runner,
                                      runner?.lay?.[2]?.price
                                    )
                                  }
                                  data-v-27b97780
                                  type="button"
                                  className="lay lay2"
                                >
                                  {runner?.lay?.[2]?.price}{" "}
                                  <span data-v-27b97780>
                                    {" "}
                                    {runner?.lay?.[2]?.size}
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                          {runner?.id === runnerId && <BetSlip />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default MatchOddsBookmaker;
