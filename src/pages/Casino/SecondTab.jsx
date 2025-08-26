const SecondTab = ({
  categories,
  setSelectedSubCategory,
  selectedSubCategory,
}) => {
  return (
    <ul role="tablist" className="nav nav-tabs" aria-label="Tabs">
      <li
        onClick={() => setSelectedSubCategory("All")}
        className="nav-item"
        role="presentation"
      >
        <a
          className={`nav-link list-menu ${
            selectedSubCategory === "All" ? "active " : ""
          }`}
          id="roulette-tab"
          type="button"
          role="tab"
        >
          <img src="/icon/all.svg" /> All
        </a>
      </li>
      {categories?.map((category) => {
        return (
          <li
            onClick={() => setSelectedSubCategory(category)}
            key={category}
            className="nav-item"
            role="presentation"
          >
            <a
              className={`nav-link list-menu ${
                selectedSubCategory === category ? "active" : ""
              }`}
              id="roulette-tab"
              type="button"
              role="tab"
            >
              <img
                src={`/icon/${category?.split(" ").join("").toLowerCase()}.svg`}
              />
              {category}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SecondTab;
