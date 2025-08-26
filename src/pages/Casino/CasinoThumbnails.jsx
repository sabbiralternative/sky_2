import { useNavigate } from "react-router-dom";

const CasinoThumbnails = ({ casinoData }) => {
  const navigate = useNavigate();
  const handleNavigateToIFrame = (casino) => {
    navigate(
      `/casino/${casino?.name?.replace(/ /g, "")}/${casino?.event_type_id}`
    );
  };
  return (
    <div className="tab-content" id="myTabContent">
      <div className="tab-pane fade show active" id="roulette" role="tabpanel">
        <div className="play-now-img">
          <div className="row">
            {casinoData?.map((casino) => {
              return (
                <div
                  onClick={() => handleNavigateToIFrame(casino)}
                  key={casino?.id}
                  className="col-md-2 col-4"
                >
                  <div className="casino">
                    <img
                      rel="preload"
                      className="img-fluid"
                      src={casino?.url_thumb}
                    />
                    <a className="btn casino-btn">{casino?.name}</a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CasinoThumbnails;
