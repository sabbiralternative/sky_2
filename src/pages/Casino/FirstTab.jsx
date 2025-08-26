const FirstTab = ({ categories, setSelectedCategory, selectedCategory }) => {
  return (
    <ul className="nav nav-tabs game-ul" id="myTab" role="tablist">
      {categories?.map((category) => {
        return (
          <li
            onClick={() => setSelectedCategory(category)}
            key={category}
            className="nav-item"
            role="presentation"
          >
            <button
              className={`nav-link  ${
                category === selectedCategory
                  ? "active"
                  : "ext-capitalize list-menu"
              }`}
              id="pills-all-int-tab"
            >
              {category}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default FirstTab;
