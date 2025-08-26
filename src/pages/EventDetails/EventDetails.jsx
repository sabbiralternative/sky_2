import { useParams } from "react-router-dom";
import SidebarLayout from "../../layout/SidebarLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetEventDetailsQuery,
  useVideoMutation,
} from "../../redux/features/events/events";
import { setPredictOdd } from "../../redux/features/events/eventSlice";
import MatchOddsBookmaker from "../../components/modules/EventDetails/MatchOddsBookmaker";
import Fancy from "../../components/modules/EventDetails/Fancy";
import ConditionFooter from "../../components/shared/ConditionFooter/ConditionFooter";
import Score from "../../components/modules/EventDetails/Score";
import { Settings } from "../../api";

const EventDetails = () => {
  const [iFrame, setIFrame] = useState("");
  const [sportsVideo] = useVideoMutation();
  const { eventTypeId, eventId } = useParams();
  const [profit, setProfit] = useState(0);
  const dispatch = useDispatch();
  const { placeBetValues, price, stake } = useSelector((state) => state.event);

  const { data } = useGetEventDetailsQuery(
    { eventTypeId, eventId },
    {
      pollingInterval: 1000,
    }
  );

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
      setProfit(formatNumber(1 + price / stake));
    }
  }, [price, stake, profit, placeBetValues, setProfit]);

  useEffect(() => {
    let total;
    if (
      placeBetValues?.btype === "MATCH_ODDS" ||
      placeBetValues?.btype === "BOOKMAKER"
    ) {
      if (placeBetValues?.back) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = price * stake - stake;
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = bookmaker * stake - stake;
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(exp?.exposure + -1 * stake),

              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });

          dispatch(setPredictOdd(currentExposure));
        }
      } else if (placeBetValues?.lay) {
        if (placeBetValues?.btype === "MATCH_ODDS") {
          total = -1 * (price * stake - stake);
        }
        if (placeBetValues?.btype === "BOOKMAKER") {
          const bookmaker = 1 + price / 100;
          total = -1 * (bookmaker * stake - stake);
        }

        if (stake) {
          const currentExposure = placeBetValues?.exposure?.map((exp) => {
            return {
              exposure: exp?.isBettingOnThisRunner
                ? formatNumber(exp?.exposure + total)
                : formatNumber(1 * exp?.exposure + 1 * stake),
              id: exp?.id,
              isBettingOnThisRunner: exp?.isBettingOnThisRunner,
            };
          });
          dispatch(setPredictOdd(currentExposure));
        }
      }
    }
  }, [price, stake, placeBetValues, dispatch]);

  /* Format number */
  const formatNumber = (value) => {
    const hasDecimal = value % 1 !== 0;
    // value?.toFixed(2)
    return hasDecimal ? parseFloat(value?.toFixed(2)) : value;
  };

  const handleGetVideo = async () => {
    const payload = {
      eventTypeId: eventTypeId,
      eventId: eventId,
      type: "video",
      casinoCurrency: Settings.casinoCurrency,
    };
    const res = await sportsVideo(payload).unwrap();
    if (res?.success) {
      setIFrame(res?.result?.url);
    }
  };

  return (
    <div>
      <SidebarLayout>
        <div className="match-menu">
          <div data-v-27b97780 className="match-inplay">
            <div data-v-27b97780 className="match-inplay-tv">
              <h2 data-v-27b97780 className="eventTitle tv-play">
                <em data-v-27b97780> {data?.result?.[0]?.eventName}</em>
              </h2>
            </div>
          </div>
          {data?.score?.tracker && (
            <div data-v-27b97780 className="match-score-live">
              <a data-v-27b97780 href="Javascript:void(0);">
                <iframe
                  data-v-27b97780
                  id="sportradar_score"
                  src={data?.score?.tracker}
                  marginWidth={0}
                  marginHeight={0}
                  frameBorder={0}
                  width="100%"
                  scrolling="no"
                  allowFullScreen
                  className="sports-radar-scorecard-iframe"
                  style={{ height: "177px" }}
                ></iframe>
              </a>
            </div>
          )}
          {data?.score && data?.score?.hasVideo && !iFrame && (
            <div
              onClick={handleGetVideo}
              style={{ gridColumn: "span 1 / span 1", height: "100%" }}
            >
              <div
                style={{
                  width: "100%",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                }}
              >
                <button
                  type="button"
                  style={{
                    display: "inline-block",
                    lineHeight: "normal",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 150ms ease-in-out",
                    width: "100%",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                    fontSize: "0.875rem",
                    marginTop: "0.5rem",
                    marginBottom: "0.5rem",
                    fontWeight: 600,
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "var(--bs-blue)",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                  }}
                >
                  Watch And Enjoy Live Action...
                </button>
                <div></div>
              </div>
            </div>
          )}
          {data?.score && iFrame && data?.score?.hasVideo && (
            <div style={{ position: "relative", marginTop: "0.5rem" }}>
              <iframe
                id="videoComponent"
                src={iFrame}
                width="100%"
                allowFullScreen
                style={{
                  width: "100%",
                  maxHeight: "309px",
                  position: "relative",
                  overflow: "hidden",
                  height: "55vw",
                  backgroundColor: "transparent",
                }}
              ></iframe>
              <div
                onClick={() => setIFrame(null)}
                style={{
                  position: "absolute",
                  top: "0.25rem",
                  right: "0.25rem",
                  zIndex: 10,
                  cursor: "pointer",
                  transition: "all 300ms ease-in-out",
                }}
              >
                <svg
                  height="24"
                  width="24"
                  fill="var(--bs-blue)"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fad"
                  data-icon="circle-xmark"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g className="fa-duotone-group">
                    <path
                      fill="currentColor"
                      d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
                    ></path>
                    <path
                      fill="white"
                      d="M209 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47z"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
          )}

          {/* <div data-v-27b97780 className="live-match-tv">
            <div
              data-v-27b97780
              className="collapse"
              id="collapseWidthExamplefive"
            >
              <div data-v-27b97780 className="card card-body">
                <iframe
                  data-v-27b97780
                  src="https://vid.dreamcasino.live/GetAPI.html?MatchID=34658959"
                  scrolling="no"
                  frameBorder={0}
                  className="tv-iframe"
                ></iframe>
              </div>
            </div>
          </div> */}
          {eventTypeId == 4 && data?.iscore && <Score iscore={data?.iscore} />}
          {data?.result?.length > 0 && (
            <MatchOddsBookmaker data={data?.result} />
          )}

          {data?.result?.length > 0 && <Fancy data={data?.result} />}

          <ConditionFooter />
        </div>
      </SidebarLayout>
    </div>
  );
};

export default EventDetails;
