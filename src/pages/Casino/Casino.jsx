import { useLocation } from "react-router-dom";
import ConditionFooter from "../../components/shared/ConditionFooter/ConditionFooter";
import SidebarLayout from "../../layout/SidebarLayout";
import { useEffect, useState } from "react";
import { useMac88AllQuery } from "../../redux/features/events/events";
import FirstTab from "./FirstTab";
import SecondTab from "./SecondTab";
import CasinoThumbnails from "./CasinoThumbnails";

const Casino = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const { data } = useMac88AllQuery();
  /* all tables key data */
  const allTables = data?.data?.allTables;
  /* tables key data */
  const tables = data?.data?.tables?.[100000];
  /* Table category */
  const tablesCategory = tables && Object.keys(tables);

  const filterSubCategory = () => {
    if (selectedCategory !== "All") {
      const tableKeyData =
        tables &&
        Object.values(tables)
          .flatMap((obj) => Object.values(obj))
          .flat();
      /* Filter the category data which in clicked on first tab */
      const subCategoryData = tableKeyData?.filter(
        (item) => item?.product === selectedCategory
      );
      /* Make unique array of category from filtered result  */
      const subCategory =
        subCategoryData &&
        Array.from(new Set(subCategoryData.map((item) => item.category)));

      return subCategory;
    } else {
      const allTablesCategory = allTables && Object.keys(allTables);
      return allTablesCategory;
    }
  };

  useEffect(() => {
    const filterData = () => {
      if (selectedCategory !== "All") {
        if (selectedSubCategory !== "All") {
          const tableKeyData =
            tables &&
            Object.values(tables)
              .flatMap((obj) => Object.values(obj))
              .flat();
          const casinoData = tableKeyData?.filter(
            (item) => item?.category === selectedSubCategory
          );
          return casinoData;
        } else {
          const tableKeyData =
            tables &&
            Object.values(tables)
              .flatMap((obj) => Object.values(obj))
              .flat();
          const casinoData = tableKeyData?.filter(
            (item) => item?.product === selectedCategory
          );

          return casinoData;
        }
      } else {
        const casinoData =
          allTables && typeof allTables === "object"
            ? selectedSubCategory === "All"
              ? Object.values(allTables).flat()
              : Object.values(allTables)
                  .flat()
                  .filter((item) => item?.category === selectedSubCategory)
            : [];

        return casinoData;
      }
    };
    setFilteredData(filterData());
  }, [selectedCategory, selectedSubCategory, allTables, tables]);

  useEffect(() => {
    setSelectedSubCategory("All");
  }, [selectedCategory]);

  useEffect(() => {
    if (category) {
      if (category === "Fun Games") {
        setSelectedCategory(category);
      } else {
        setSelectedSubCategory(category);
      }
    }
  }, [category]);
  return (
    <div>
      <SidebarLayout>
        <div className="match-menu">
          <div className="filter-dropdown-position">
            <div className="eventlistdesign flex-d inplay-heading-title">
              <div className="high-desk">
                <h2 className="high-desktop text-capitalize">casino</h2>
              </div>
              <div className="viewby-filter inner-page-top">
                <button
                  className="search-filter-modal-btn"
                  data-bs-toggle="modal"
                  data-bs-target="#casinofilter"
                >
                  <img src="/img/search-grey-icon.e00057e0.svg" />
                </button>
              </div>
            </div>
          </div>
          <div className="tab-set">
            <div className="tab-hightlight tab-pane">
              <div className="card-body">
                <div className="tabcasino">
                  <div>
                    <div className="casino_tabs_ul tab-container">
                      <FirstTab
                        categories={tablesCategory}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                      />
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="all"
                          role="tabpanel"
                          aria-labelledby="all-tab"
                        >
                          <div className="icasino_ul_tabs">
                            <div className="tab-container">
                              <SecondTab
                                setSelectedSubCategory={setSelectedSubCategory}
                                selectedSubCategory={selectedSubCategory}
                                categories={filterSubCategory()}
                              />
                            </div>
                          </div>
                          <CasinoThumbnails casinoData={filteredData} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade casino_modal_filter"
            id="casinofilter"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Search Games
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <div className="casino-filter-search-header">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                    <button className="search_icon">
                      <img src="/img/search-grey-icon.e00057e0.svg" />
                    </button>
                  </div>
                  {/**/}
                </div>
              </div>
            </div>
          </div>
          <ConditionFooter />
        </div>
      </SidebarLayout>
    </div>
  );
};

export default Casino;
