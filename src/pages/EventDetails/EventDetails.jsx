import { useParams } from "react-router-dom";
import SidebarLayout from "../../layout/SidebarLayout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetEventDetailsQuery } from "../../redux/features/events/events";
import { setPredictOdd } from "../../redux/features/events/eventSlice";
import MatchOddsBookmaker from "../../components/modules/EventDetails/MatchOddsBookmaker";
import Fancy from "../../components/modules/EventDetails/Fancy";
import ConditionFooter from "../../components/shared/ConditionFooter/ConditionFooter";

const EventDetails = () => {
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

  console.log(data);

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
          <div data-v-27b97780 className="match-score-live">
            <a data-v-27b97780 href="Javascript:void(0);">
              <iframe
                data-v-27b97780
                id="sportradar_score"
                src="https://scorecard.oddstrad.com/get-scorecard-iframe/4/34658959/62706519"
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
          <div data-v-27b97780 className="live-match-tv">
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
          </div>
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
