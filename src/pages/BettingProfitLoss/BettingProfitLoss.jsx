import { useNavigate } from "react-router-dom";
import SidebarLayout from "../../layout/SidebarLayout";
import { useAccountStatementMutation } from "../../redux/features/events/events";
import { useSelector } from "react-redux";

const BettingProfitLoss = () => {
  const fromDate = new Date(new Date().setDate(new Date().getDate() - 7))
    .toISOString()
    .split("T")[0];
  /* current date */
  const toDate = new Date().toISOString().split("T")[0];
  const payload = {
    from: fromDate,
    to: toDate,
    type: "GR",
  };

  const { data } = useAccountStatementMutation(payload);
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth);
  const handleNavigateSinglePassbook = (item) => {
    if (item?.plDetails) {
      navigate(`/betting-profit-loss/${item?.marketId}`);
    }
  };

  const categories = Array.from(
    new Set(data?.result?.map((item) => item.settledTime?.split(" ")[0]))
  );

  return (
    <div>
      <SidebarLayout>
        <div className="match-menu">
          <div data-v-1dd94fca className=" my-1 my-bets-fluid">
            <div data-v-1dd94fca className="userTables">
              <div data-v-1dd94fca className="searchForm">
                <div data-v-1dd94fca className="row pb-1" type="BETS">
                  <div className="col-md-3">
                    <label>From Date</label>
                    <div className="start-end-date-sec">
                      <input className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label>To Date</label>
                    <div className="start-end-date-sec">
                      <input type="date" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label>Type</label>
                    <select className="form-control">
                      <option value={4}>Cricket</option>
                      <option value={1}>Football</option>
                      <option value={2}>Tennis</option>
                      <option value="matka">Matka</option>
                      <option value="casino">Casino</option>
                      <option value="sportsbook">Sportsbook</option>
                      <option value="premium">Premium</option>
                      <option value="virtual_sport">Virtual sports</option>
                      <option value="fantasy_cricket">Fantasy cricket</option>
                      <option value={27454571}>esports</option>
                      <option value={26420387}>mixed-martial-arts</option>
                      <option value={2152880}>gaelic-games</option>
                      <option value={998917}>volleyball</option>
                      <option value={468328}>handball</option>
                      <option value={61420}>australian-rules</option>
                      <option value={7524}>ice-hockey</option>
                      <option value={7522}>basketball</option>
                      <option value={7511}>baseball</option>
                      <option value={6423}>american-football</option>
                      <option value={6422}>snooker</option>
                      <option value={27454574}>table-tennis</option>
                      <option value={4343}>fifa-cup-winner</option>
                      <option value={4344}>winner-cup</option>
                      <option value={4345}>election</option>
                      <option value={27454572}>kabaddi</option>
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label>&nbsp;</label>
                    <button type="submit" className="btn btn-gets">
                      {/**/} Submit
                    </button>
                  </div>
                </div>
              </div>
              <h2 data-v-1dd94fca>Unsettled Bets</h2>
              <div data-v-1dd94fca className="sattle-bet-list">
                <div data-v-1dd94fca className="bet-list league-list">
                  <ul data-v-1dd94fca>
                    {data?.result?.map((item) => {
                      return (
                        <li key={item?.eventId} data-v-1dd94fca>
                          <div data-v-1dd94fca className="list-con">
                            <h4 data-v-1dd94fca>
                              <div data-v-1dd94fca className="number-list">
                                1.&nbsp;&nbsp;
                              </div>
                              {/**/}
                              <label data-v-1dd94fca>
                                Northern Superchargers{" "}
                                <span data-v-1dd94fca className="event-name-vs">
                                  VS
                                </span>{" "}
                                Manchester Originals
                              </label>
                            </h4>
                            <span data-v-1dd94fca className="settle-list-date">
                              26 Aug 2025 23:30:00
                            </span>
                          </div>
                          <div data-v-1dd94fca className="list-num">
                            <span data-v-1dd94fca>10</span>
                          </div>
                        </li>
                      );
                    })}
                    <li data-v-1dd94fca>
                      <div data-v-1dd94fca className="list-con">
                        <h4 data-v-1dd94fca>
                          <div data-v-1dd94fca className="number-list">
                            1.&nbsp;&nbsp;
                          </div>
                          {/**/}
                          <label data-v-1dd94fca>
                            Northern Superchargers{" "}
                            <span data-v-1dd94fca className="event-name-vs">
                              VS
                            </span>{" "}
                            Manchester Originals
                          </label>
                        </h4>
                        <span data-v-1dd94fca className="settle-list-date">
                          26 Aug 2025 23:30:00
                        </span>
                      </div>
                      <div data-v-1dd94fca className="list-num">
                        <span data-v-1dd94fca>10</span>
                      </div>
                    </li>
                    <li data-v-1dd94fca>
                      <div data-v-1dd94fca className="list-con">
                        <h4 data-v-1dd94fca>
                          <div data-v-1dd94fca className="number-list">
                            2.&nbsp;&nbsp;
                          </div>
                          {/**/}
                          <label data-v-1dd94fca>
                            Northern Superchargers W{" "}
                            <span data-v-1dd94fca className="event-name-vs">
                              VS
                            </span>{" "}
                            Manchester Originals W
                          </label>
                        </h4>
                        <span data-v-1dd94fca className="settle-list-date">
                          26 Aug 2025 20:00:00
                        </span>
                      </div>
                      <div data-v-1dd94fca className="list-num">
                        <span data-v-1dd94fca>13</span>
                      </div>
                    </li>
                    <li data-v-1dd94fca>
                      <div data-v-1dd94fca className="list-con">
                        <h4 data-v-1dd94fca>
                          <div data-v-1dd94fca className="number-list">
                            3.&nbsp;&nbsp;
                          </div>
                          {/**/}
                          <label data-v-1dd94fca>
                            South Delhi Superstarz{" "}
                            <span data-v-1dd94fca className="event-name-vs">
                              VS
                            </span>{" "}
                            North Delhi Strikers
                          </label>
                        </h4>
                        <span data-v-1dd94fca className="settle-list-date">
                          26 Aug 2025 14:30:00
                        </span>
                      </div>
                      <div data-v-1dd94fca className="list-num">
                        <span data-v-1dd94fca>1</span>
                      </div>
                    </li>
                  </ul>
                  {/**/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default BettingProfitLoss;
