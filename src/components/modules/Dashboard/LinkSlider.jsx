import { useDispatch, useSelector } from "react-redux";
import { setGroup } from "../../../redux/features/global/globalSlice";

const LinkSlider = () => {
  const dispatch = useDispatch();
  const { group } = useSelector((state) => state.global);
  const handleChangeGroup = (g) => {
    dispatch(setGroup(g));
  };
  return (
    <ul
      className="nav nav-pills navtab-bg desktop-nav-pills"
      id="pills-tab"
      role="tablist"
    >
      <li
        onClick={() => handleChangeGroup(4)}
        className="nav-item active"
        role="presentation"
      >
        <a
          className={`nav-link ${group === 4 ? "active" : ""}`}
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img
              src="/img/cricket_icon.98e5cd42.svg"
              className="img-fluid"
              alt=""
              loading="lazy"
            />{" "}
            cricket <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li
        onClick={() => handleChangeGroup(1)}
        className="nav-item active"
        role="presentation"
      >
        <a
          className={`nav-link ${group === 1 ? "active" : ""}`}
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img
              src="/img/soccer_icon.5700c75d.svg"
              className="img-fluid"
              alt=""
              loading="lazy"
            />{" "}
            football <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li
        onClick={() => handleChangeGroup(2)}
        className="nav-item active"
        role="presentation"
      >
        <a
          className={`nav-link ${group === 2 ? "active" : ""}`}
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img
              src="/img/tennis_icon.c8934bf4.svg"
              className="img-fluid"
              alt=""
              loading="lazy"
            />{" "}
            tennis <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item tab-hightlight" role="presentation">
        <a className="nav-link" type="button" role="tab">
          <span />
          <div className="mobile-img-tab">
            <img
              rel="preload"
              className="img-fluid"
              src="data:image/webp;base64,UklGRmgEAABXRUJQVlA4WAoAAAAwAAAAPwAAPwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIRAIAAA2QBACQITl1tm3bjm3btm3btm3nla9t27adHHu6qqujZ0Q4cNs2kjR7HxoBk/YR8L9zFIYjegmcbdbrtk7sNwCsaPZeH6ZrACBuWLNf2hgv/K9K4eG6aO4nnmDw8+Wa7G2MBQs27ddjlyRYbux/W4ddGuGuQW6yTJZRIB/QOpuZCWhHrfRhvDQIkZUY5A/XcpLejdKyZCXjCvRdSIqx3tjzPhc2m4g5XkubfGSyryQHJfVrmc1tp8i57QT5g3UcdrWqpSuOcNrJcj67gpzLriTnsavJeeyKcg67Frn/ItmyVJZ3f0hinmxbUJeP7kShqjl9XyE1Zu8h0BtYjz4zcJyTeSl99g1KUeDFLPMI/m9l8MyH+DBQUFygX1CeejPzGA+5FaYIIRPntC/p6ZeZ8DsKT57hZG9pRGHMCOF3FDaR9oxujjjLrJsBwLpvbXE+zqfwYvoklLMrQoUTdG+Lz3R/2qVYCJ0RrvcAG4EvdeZEIMynXsuuniNMZBwbKpupZhMyZeSMei1HGjR635QMA28nHZAW3W9cYpCTgeMDVKZp3wCLmoV8HF9e3LEPC/o5bXap2vHu758c2f1LHEfyh4d3H33yHi0SFbt3XnwJf9xhX4DdJ40I85Z0Th+mXQrotiBb232GYMpq0F/TLWqpIaBX7fbX+fEp2SJYElFsyd01e5+yYdYk2SkwwgprqdCi1NfrD96e3fiLgZlu1J7gyADn5Bd9GKipGLWbgZPpSpzg+Lh9XJwJfVVevMLB67GXcuAfegBWUDggLgAAAJADAJ0BKkAAQAA+bTaYSSQjIqEiCACADYlpAAAQN1NQBXiFuQAA/vucwAAAAAA="
            />{" "}
            Casino <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a className="nav-link" id="pills-sports-tab" type="button">
          <span />
          <div className="mobile-img-tab">
            <img
              rel="preload"
              className="img-fluid"
              src="data:image/webp;base64,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"
            />{" "}
            Sports Book <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item tab-hightlight" role="presentation">
        <a className="nav-link" type="button" role="tab">
          <span />
          <div className="mobile-img-tab">
            <img
              rel="preload"
              className="img-fluid"
              src="data:image/webp;base64,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"
            />{" "}
            Evolution <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item active" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img src="/img/esports.efd43649.svg" alt="" loading="lazy" />{" "}
            Esports <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item active" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img
              src="/img/mixed-martial-arts.c563ee90.svg"
              alt=""
              loading="lazy"
            />{" "}
            Mixed Martial Arts <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item active" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img
              src="/img/gaelic-football.db7603bd.svg"
              alt=""
              loading="lazy"
            />{" "}
            Gaelic Games <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item active" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img src="/img/volleyball.5b1f359d.svg" alt="" loading="lazy" />{" "}
            Volleyball <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item active" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img src="/img/handball.4cfd99fc.svg" alt="" loading="lazy" />{" "}
            Handball <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item active" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img
              src="/img/australian-rules.30fdb9ac.svg"
              alt=""
              loading="lazy"
            />{" "}
            Australian Rules <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item active" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img src="/img/ice-hockey.e0fc1e0b.svg" alt="" loading="lazy" /> Ice
            Hockey <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item active" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img src="/img/basketball.ad374587.svg" alt="" loading="lazy" />{" "}
            Basketball <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item active" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img src="/img/baseball.6a5a90b3.svg" alt="" loading="lazy" />{" "}
            Baseball <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item active" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img
              src="/img/american-football.157ffa12.svg"
              alt=""
              loading="lazy"
            />{" "}
            American Football <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item active" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img src="/img/snooker.098cbcba.svg" alt="" loading="lazy" />{" "}
            Snooker <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item active" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          <span />
          <div className="mobile-img-tab">
            <img src="/img/cricket.fa2673f5.svg" alt="" loading="lazy" /> Table
            tennis <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="false"
        >
          <span />
          <div className="mobile-img-tab">
            <img rel="preload" className="img-fluid" /> FIFA CUP WINNER{" "}
            <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="false"
        >
          <span />
          <div className="mobile-img-tab">
            <img
              rel="preload"
              className="img-fluid"
              src="26922969-ebca-42a7-b576-2276a9743d1a/imgpsh_fullsize_anim.png"
            />{" "}
            WINNER CUP <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="false"
        >
          <span />
          <div className="mobile-img-tab">
            <img
              rel="preload"
              className="img-fluid"
              src="df4e0cbf-d1f4-4fb3-8b4a-3171d7018b31/download.png"
            />{" "}
            ELECTION <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a
          className="nav-link"
          id="pills-home-tab"
          data-bs-toggle="pill"
          data-bs-target="#pills-home"
          type="button"
          role="tab"
          aria-controls="pills-home"
          aria-selected="false"
        >
          <span />
          <div className="mobile-img-tab">
            <img
              rel="preload"
              className="img-fluid"
              src="597b434e-f6e3-4195-8978-345fe2ddaf4a/360_F_278672215_EQRXldl67pxSstNeTIeUefoq3OhBPwwU-removebg-preview.png"
            />{" "}
            Kabaddi <em className="hide-desktop">New</em>
          </div>
        </a>
      </li>
    </ul>
  );
};

export default LinkSlider;
