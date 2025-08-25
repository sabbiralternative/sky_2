const RightSidebar = () => {
  return (
    <div data-v-3f76ce70 className="bets-menu">
      <div data-v-3f76ce70 className="openBets">
        <div data-v-3f76ce70 className="stake-collapse">
          <div data-v-3f76ce70 className="collapse" id="collapseExample">
            <div data-v-3f76ce70 className="card card-body">
              <div data-v-3f76ce70 className="stakeDiv">
                <h3 data-v-3f76ce70>stake</h3>
                <dl data-v-3f76ce70 id className="setting-block stake-setting">
                  <dd data-v-3f76ce70>
                    <input
                      data-v-3f76ce70
                      type="number"
                      className="ng-untouched ng-pristine ng-valid"
                    />
                  </dd>
                  <dd data-v-3f76ce70>
                    <input
                      data-v-3f76ce70
                      type="number"
                      className="ng-untouched ng-pristine ng-valid"
                    />
                  </dd>
                  <dd data-v-3f76ce70>
                    <input
                      data-v-3f76ce70
                      type="number"
                      className="ng-untouched ng-pristine ng-valid"
                    />
                  </dd>
                  <dd data-v-3f76ce70>
                    <input
                      data-v-3f76ce70
                      type="number"
                      className="ng-untouched ng-pristine ng-valid"
                    />
                  </dd>
                  <dd data-v-3f76ce70>
                    <input
                      data-v-3f76ce70
                      type="number"
                      className="ng-untouched ng-pristine ng-valid"
                    />
                  </dd>
                  <dd data-v-3f76ce70>
                    <input
                      data-v-3f76ce70
                      type="number"
                      className="ng-untouched ng-pristine ng-valid"
                    />
                  </dd>
                  <dd data-v-3f76ce70>
                    <input
                      data-v-3f76ce70
                      type="number"
                      className="ng-untouched ng-pristine ng-valid"
                    />
                  </dd>
                  <dd data-v-3f76ce70>
                    <input
                      data-v-3f76ce70
                      type="number"
                      className="ng-untouched ng-pristine ng-valid"
                    />
                  </dd>
                  <dd data-v-3f76ce70 className="col-stake_edit">
                    <a data-v-3f76ce70 className="btn-send ui-link">
                      Save
                    </a>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <h2 data-v-3f76ce70>open bets</h2>
        <div data-v-3f76ce70>
          <select
            className="form-control mobile-hide ng-untouched"
            data-v-3f76ce70
          >
            <option selected data-v-3f76ce70>
              Open this select menu
            </option>
            <option value={1} data-v-3f76ce70>
              One
            </option>
            <option value={2} data-v-3f76ce70>
              Two
            </option>
            <option value={3} data-v-3f76ce70>
              Three
            </option>
          </select>
          <div data-v-3f76ce70 className="openBetsTabs">
            <div data-v-3f76ce70 className="tab-container">
              <ul
                data-v-3f76ce70
                className="nav nav-tabs"
                id="myTab"
                role="tablist"
              >
                <li
                  data-v-3f76ce70
                  className="active nav-item"
                  role="presentation"
                >
                  <a
                    data-v-3f76ce70
                    className="nav-link active"
                    id="Matched-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Matched"
                    type="button"
                    role="tab"
                    aria-controls="Matched"
                    aria-selected="true"
                  >
                    <span data-v-3f76ce70>Matched</span>
                  </a>
                </li>
                <li data-v-3f76ce70 className="nav-item" role="presentation">
                  <a
                    data-v-3f76ce70
                    className="nav-link"
                    id="UnMatched-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#UnMatched"
                    type="button"
                    role="tab"
                    aria-controls="UnMatched"
                    aria-selected="false"
                  >
                    <span data-v-3f76ce70>Bookmaker</span>
                  </a>
                </li>
                <li data-v-3f76ce70 className="nav-item" role="presentation">
                  <a
                    data-v-3f76ce70
                    className="nav-link"
                    id="Fancy-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#Fancy"
                    type="button"
                    role="tab"
                    aria-controls="Fancy"
                    aria-selected="false"
                  >
                    <span data-v-3f76ce70>Fancy</span>
                  </a>
                </li>
              </ul>
              <div data-v-3f76ce70 className="tab-content" id="myTabContent">
                <div
                  data-v-3f76ce70
                  className
                  id="Matched"
                  role="tabpanel"
                  aria-labelledby="Matched-tab"
                >
                  <div data-v-3f76ce70 className="table-responsive">
                    <table data-v-3f76ce70 className="table table-bordered">
                      <thead data-v-3f76ce70>
                        <tr data-v-3f76ce70>
                          <th data-v-3f76ce70>
                            <b data-v-3f76ce70>Selection</b>
                          </th>
                          <th data-v-3f76ce70>
                            <b data-v-3f76ce70>Odds</b>
                          </th>
                          <th data-v-3f76ce70>
                            <b data-v-3f76ce70>Stake</b>
                          </th>
                          <th data-v-3f76ce70>
                            <b data-v-3f76ce70>Date/Time</b>
                          </th>
                        </tr>
                      </thead>
                      <tbody data-v-3f76ce70 />
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
