import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useCurrentBets } from "../../../hooks/currentBets";
import useBalance from "../../../hooks/balance";
import { useExposure } from "../../../hooks/exposure";
import { useOrderMutation } from "../../../redux/features/events/events";
import {
  setPlaceBetValues,
  setPrice,
  setRunnerId,
  setStake,
} from "../../../redux/features/events/eventSlice";
import { Settings } from "../../../api";
import toast from "react-hot-toast";
import { setShowLoginModal } from "../../../redux/features/global/globalSlice";
import {
  handleDecreasePrice,
  handleIncreasePrice,
} from "../../../utils/editBetSlipPrice";
import Loading from "./Loading";
const BetSlip = () => {
  const [profit, setProfit] = useState(0);
  const { eventTypeId } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { eventId } = useParams();
  const { refetch: refetchCurrentBets } = useCurrentBets(eventId);
  const { refetch: refetchBalance } = useBalance();
  const { refetch: refetchExposure } = useExposure(eventId);
  const { placeBetValues, price, stake } = useSelector((state) => state?.event);
  const { token } = useSelector((state) => state?.auth);

  const [createOrder] = useOrderMutation();
  const buttonValues = localStorage.getItem("buttonValue");
  let parseButtonValues = [];
  if (buttonValues) {
    parseButtonValues = JSON.parse(buttonValues);
  }

  const [betDelay, setBetDelay] = useState("");

  useEffect(() => {
    dispatch(setPrice(parseFloat(placeBetValues?.price)));
    dispatch(
      setStake(
        placeBetValues?.totalSize > 0
          ? placeBetValues?.totalSize?.toFixed(2)
          : null
      )
    );
  }, [placeBetValues, dispatch]);

  let payload = {};
  if (price) {
    if (placeBetValues?.btype === "SPORTSBOOK") {
      payload = {
        price: price,
        side: placeBetValues?.side,
        selectionId: placeBetValues?.selectionId,
        btype: placeBetValues?.btype,
        placeName: placeBetValues?.placeName,
        eventTypeId: placeBetValues?.eventTypeId,
        betDelay: placeBetValues?.betDelay,
        marketId: placeBetValues?.marketId,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        totalSize: stake,
        isBettable: placeBetValues?.isBettable,
        eventId: placeBetValues?.eventId,
        cashout: placeBetValues?.cashout || false,
        b2c: Settings.b2c,
      };
    } else {
      payload = {
        betDelay: placeBetValues?.betDelay,
        btype: placeBetValues?.btype,
        eventTypeId: placeBetValues?.eventTypeId,
        marketId: placeBetValues?.marketId,
        price: price,
        selectionId: placeBetValues?.selectionId,
        side: placeBetValues?.side,
        totalSize: stake,
        maxLiabilityPerMarket: placeBetValues?.maxLiabilityPerMarket,
        isBettable: placeBetValues?.isBettable,
        maxLiabilityPerBet: placeBetValues?.maxLiabilityPerBet,
        eventId: placeBetValues?.eventId,
        cashout: placeBetValues?.cashout || false,
        b2c: Settings.b2c,
      };
    }
  }

  /* Handle bets */

  const handleOrderBets = async () => {
    setLoading(true);
    const payloadData = [
      {
        ...payload,
        site: Settings.siteUrl,
        nounce: uuidv4(),
        isbetDelay: Settings.betDelay,
      },
    ];
    let delay = 0;
    if (
      (eventTypeId == 4 || eventTypeId == 2) &&
      placeBetValues?.btype === "MATCH_ODDS" &&
      price > 3 &&
      placeBetValues?.name?.length === 2
    ) {
      delay = 9000;
    }
    if (
      (eventTypeId == 4 || eventTypeId == 2) &&
      placeBetValues?.btype === "MATCH_ODDS" &&
      price > 7 &&
      placeBetValues?.name?.length === 3
    ) {
      delay = 9000;
    } else {
      setBetDelay(placeBetValues?.betDelay);
      delay = Settings.betDelay ? placeBetValues?.betDelay * 1000 : 0;
    }

    // Introduce a delay before calling the API
    setTimeout(async () => {
      try {
        const res = await createOrder(payloadData).unwrap();
        if (res?.success) {
          setLoading(false);
          refetchExposure();
          refetchBalance();
          dispatch(setRunnerId(null));
          dispatch(setPlaceBetValues(null));
          refetchCurrentBets();
          setBetDelay("");
          toast.success(res?.result?.result?.placed?.[0]?.message);
        } else {
          setLoading(false);
          toast.error(
            res?.error?.status?.[0]?.description || res?.error?.errorMessage
          );
          setBetDelay("");
          setBetDelay(false);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong. Please try again.");
        setBetDelay("");
      }
    }, delay);
  };

  useEffect(() => {
    if (
      price &&
      stake &&
      placeBetValues?.back &&
      placeBetValues?.btype === "MATCH_ODDS"
    ) {
      const multiply = price * stake;
      setProfit(formatNumber(multiply - stake));
    } else if (
      price &&
      stake &&
      placeBetValues?.back &&
      (placeBetValues?.btype === "BOOKMAKER" ||
        placeBetValues?.btype === "BOOKMAKER2")
    ) {
      const bookmaker = 1 + price / 100;
      const total = bookmaker * stake - stake;

      setProfit(formatNumber(total));
    } else if (price && stake && placeBetValues?.btype === "FANCY") {
      const profit =
        (parseFloat(placeBetValues?.bottomValue) * parseFloat(stake)) /
        parseFloat(stake);
      setProfit(profit);
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    // value?.toFixed(2)
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  const handleCancelBet = () => {
    dispatch(setRunnerId(null));
    dispatch(setPlaceBetValues(null));
  };
  const handleShowLoginModal = () => {
    dispatch(setShowLoginModal(true));
  };
  return (
    <div
      data-v-27b97780
      className={`bettingTable  ${
        placeBetValues?.back ? "blue-back" : "pink-lay"
      }`}
    >
      <div data-v-27b97780 className="bet-any-odds-sec">
        <div data-v-27b97780 className="other-settings-switch">
          <div data-v-27b97780 className="toggle">
            <input
              data-v-27b97780
              type="checkbox"
              id="flexSwitchCheckDefaults"
            />
            <label data-v-27b97780 />
          </div>
        </div>
        <span data-v-27b97780 htmlFor="flexSwitchCheckDefaults">
          Accept any odds
        </span>
      </div>
      <div data-v-27b97780 className="bet-left-side" />
      <div data-v-27b97780 className="bets-right-side">
        <div data-v-27b97780 className="card-bet">
          <div data-v-27b97780 className="bets-btn">
            <button
              onClick={handleCancelBet}
              data-v-27b97780
              className="btn btn-cancel bet-mobile"
            >
              cancel
            </button>
            <div data-v-27b97780 className="increment-decrement-sec">
              {!placeBetValues?.isWeak && (
                <div
                  onClick={() =>
                    handleDecreasePrice(
                      price,
                      placeBetValues,
                      dispatch,
                      setPrice
                    )
                  }
                  data-v-27b97780
                  className="value-button v-left"
                  id="decrease"
                  value="Decrease Value"
                >
                  -
                </div>
              )}

              <div data-v-27b97780 className="select-digit">
                <input
                  onChange={(e) => dispatch(setPrice(e.target.value))}
                  data-v-27b97780
                  type="number"
                  className="form-control"
                  id="number"
                  value={price}
                />
              </div>
              {!placeBetValues?.isWeak && (
                <div
                  onClick={() =>
                    handleIncreasePrice(
                      price,
                      placeBetValues,
                      dispatch,
                      setPrice
                    )
                  }
                  data-v-27b97780
                  className="value-button"
                  id="increase"
                  value="Increase Value"
                >
                  +
                </div>
              )}
            </div>
            <div
              data-v-27b97780
              className="increment-decrement-sec bet-mobile-show"
            >
              <div
                data-v-27b97780
                className="value-button v-left"
                id="decrease"
                value="Decrease Value"
              >
                -
              </div>
              <div data-v-27b97780 className="select-digit">
                <input
                  data-v-27b97780
                  type="tel"
                  className="form-control mbetting-table-none"
                />
              </div>
              <div
                data-v-27b97780
                className="value-button"
                id="increase"
                value="Increase Value"
              >
                +
              </div>
            </div>
            <input
              onChange={(e) => dispatch(setStake(e.target.value))}
              placeholder={`Max bet: ${placeBetValues?.maxLiabilityPerBet}`}
              value={stake !== null && stake}
              data-v-27b97780
              type="number"
              className="form-control mbetting-table-none bet-mobile"
            />
            <button
              onClick={handleOrderBets}
              data-v-27b97780
              className="btn btn-betplace bet-mobile"
            >
              betplace
            </button>
          </div>
        </div>
      </div>
      <div data-v-27b97780 className="place-bet">
        <ul data-v-27b97780 className="stakesBtns mbetting-table-none">
          {parseButtonValues?.slice(0, 6)?.map((button, i) => (
            <li
              key={i}
              onClick={() => dispatch(setStake(button?.value))}
              data-v-27b97780
            >
              <button data-v-27b97780 className="btn">
                {button?.value}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* <div
        data-v-27b97780
        className="m_stakesBtns"
        style={{ flexWrap: "nowrap" }}
      >
        <button data-v-27b97780 className="btn min-btn">
          MIN
        </button>
        <button data-v-27b97780 className="btn max-btn">
          MAX
        </button>
        <button
          data-v-27b97780
          className="btn edit-btn"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop-stake"
        >
          Edit Stake
        </button>
        <button data-v-27b97780 className="btn clear-btn ml-3 empty-stake">
          CLEAR
        </button>
      </div> */}
      <div data-v-27b97780 className="mobilebet-btn">
        <button
          onClick={handleCancelBet}
          data-v-27b97780
          className="btn btn-cancel"
        >
          Cancel
        </button>
        <button
          onClick={handleOrderBets}
          data-v-27b97780
          className="btn btn-betplace"
        >
          PLACE BET
        </button>
      </div>
      {loading && <Loading />}

      {/**/}
    </div>
  );
};

export default BetSlip;
