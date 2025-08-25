import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import useBalance from "../../../hooks/balance";
import { useEffect, useState } from "react";

const RightDrawer = ({ setShowRightDrawer, showRightDrawer }) => {
  const [animation, setAnimation] = useState(null);
  const { user, memberId } = useSelector((state) => state.auth);
  const { data } = useBalance();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeDrawer = () => {
    setShowRightDrawer(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    closeDrawer();
    navigate("/");
  };

  useEffect(() => {
    let timeout;
    if (showRightDrawer === true) {
      setAnimation("showing");
      timeout = setTimeout(() => {
        setAnimation(null);
      }, 1000);
    }
    if (showRightDrawer === false) {
      setAnimation("hiding");
      timeout = setTimeout(() => {
        setAnimation(null);
      }, 300);
    }
    return () => setTimeout(timeout);
  }, [showRightDrawer]);
  return (
    <div className="my-account-menu">
      <div
        className={`offcanvas offcanvas-end  ${animation} ${
          showRightDrawer && !animation ? "show" : ""
        } `}
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        aria-modal="true"
        role="dialog"
      >
        <div className="offcanvas-header">
          <button
            onClick={closeDrawer}
            type="button"
            className="close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            x
          </button>
          <div className="menu-content">
            <div className="thm-heading">
              <h3>{user}</h3>
              {memberId && <p>Member Id: {memberId}</p>}
            </div>
          </div>
        </div>
        <div className="offcanvas-body">
          <div className="mene-details">
            <div className="menu-details-list">
              <ul>
                <li>
                  <div className="menu-details-heading">
                    <h4>Setting</h4>
                  </div>
                  <div
                    className="menu-heading-con"
                    style={{ display: "contents" }}
                  >
                    {/**/}
                    <div className="form-check form-switch m-0 p-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="settingCheckDefaults"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexSwitchCheckDefaults"
                      >
                        On click bet
                      </label>
                    </div>
                    <a
                      data-bs-toggle="modal"
                      data-bs-target="#clickBetValue"
                      style={{ display: "none" }}
                    />
                  </div>
                </li>
                <li>
                  <a className="w-100">
                    <div className="wallet-balance-sec">
                      <div className="menu-details-heading">
                        <h4>Wallet balance</h4>
                      </div>
                      <div className="menu-details-heading">
                        <h4>
                          <span className="profit-color border-0">
                            {data?.availBalance}
                          </span>
                        </h4>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="menu-details-heading">
                    <h4>Exposure</h4>
                  </div>
                  <div className="menu-details-heading">
                    <h4>
                      <span
                        style={{
                          color:
                            data?.deductedExposure > 0
                              ? "green"
                              : "rgb(244, 73, 73)",
                        }}
                      >
                        {data?.deductedExposure}
                      </span>
                    </h4>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="menu-list">
            <ul>
              <li>
                <a>
                  <div className="language-list">
                    <div
                      data-bs-toggle="modal"
                      data-bs-target="#language_selection_pop_up"
                      className="menu-con"
                    >
                      <div className="menu-icon">
                        <img
                          rel="preload"
                          src="data:image/webp;base64,UklGRlgDAABXRUJQVlA4WAoAAAAwAAAAFwAAFwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBI3wAAAAFvoLZtIzd6+a78/N+9IyIIwEdr9WxxAo60/WuUNzaL829xWndKp3KHjpqhCzWTE+Be/e/CEZLsn1n9TrN2hYj+k03axKk9hU7MbulxzWsul6S9pu51p+q1QoDKXnbkhpwF4gTX/XZkShHkY8jfkpetg3xjoeItWm8xYSuB/5CSv3VEfASugAtP13mbg7xAXvhTG31t64/nmkc3xWjriHgdXAEXTiac3kAppBSYSjBpQf6ioDhE05HNwan13FB6ZEoFMJW9tyPXXbQA27qVflUA4FOSpmhiLkoPqwAAQAMAVlA4IIIAAACQBACdASoYABgAPm0wkkckIqGhKAqogA2JaACdMoRwMNU4ACAG8of9ECHPVAAA/vaVfjSRhwc++5eRSKdiB2V/AOEaETDx71TnMI/1lBdi0w+ubV2Mp6EaBTofKjbloPU6F531SVFCjiPniCyRoDlAbXei/Zv/VHHLv9vFGMTgAAAA"
                          alt=""
                        />
                      </div>
                      <div className="menu-icon-con">
                        <h5>Language</h5>
                      </div>
                    </div>
                    <div className="menu-details-heading" />
                  </div>
                </a>
              </li>
              <li>
                <a href="Javascript:void(0);">
                  <div className="menu-con">
                    <div className="menu-icon">
                      <img
                        rel="preload"
                        src="data:image/webp;base64,UklGRu4CAABXRUJQVlA4WAoAAAAwAAAAFwAAFwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBI0QAAAAWAY23bMecZeybZgG3bXIFTOpWtyraziDkpbdtmlc62871nVhARity2bZjT6nwG6GGbaMRheJyvvwH8eu+OWPvyrXZc71Ch5XbJ3CdwILkZ9otPOuw99E7TeoTYXSPsYGMSjXnPFwLBlAQVeaSdy7NQUkRSXKgx9lWuil83YDFZPlffA/D2YOkONcPTJSUZe/cbOomh6IiyFN+dURisPKgvf5WZy8zLnSUAJGLN/+dTUzZJVfKKlvsFgfbMeU7f/SGBkSRk1CbJiMP0sd+xDmoAAFZQOCAmAAAA0AIAnQEqGAAYAD5tNJZHpCMiISgIAIANiWkAAD2joAD++5zAAAA="
                        alt=""
                      />
                    </div>
                    <div className="menu-icon-con">
                      <h5>Wallet</h5>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="/profile" className>
                  <div className="menu-con">
                    <div className="menu-icon">
                      <img
                        rel="preload"
                        src="data:image/webp;base64,UklGRh4DAABXRUJQVlA4WAoAAAAwAAAAGwAAGwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBI9wAAAAFHIBBI4SYXEREGyLW2vW2bh83yiE0a3e0xPWtPOKYnY084plIYVWAS903mHiL6PwEQvo7rZ6X5ozG++5ZjPROG5wUhxWKya01Duo+jWHLzlLAu2V7yK+dLfi0ZSkf5zutYCZ0bLZsVv5ak8uch1yU3Wn4tdg0jdDy4SgU/Jj2hHdBP3qP7gVRx9AH9B2yXbFeTDjfi3ce5xPAd4TrnD9D3SPHZ2/E53qfSi1hzY6zdaLeNdAAvWy9WHxdH0TT05WZx9OHj1YztQSr1u2buY9vxK1dzR/mK8L8bucSv5zMhXUIYnpeEFIuJG0N89z3Hynz4OqyfFQAAVlA4IDAAAADwAgCdASocABwAPm0skkWkIqGYBABABsS0gABCI+TlAAD+9qn98daOVBe3/1UAAAA="
                        alt=""
                      />
                    </div>
                    <div className="menu-icon-con">
                      <h5>profile</h5>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="/favourites" className>
                  <div className="menu-con">
                    <div className="menu-icon">
                      <img
                        rel="preload"
                        src="data:image/webp;base64,UklGRggDAABXRUJQVlA4WAoAAAAwAAAAEwAAEwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIhwAAAAFHIBBI4SYXEREGOLFt201OuqWDzBCyopC9yA5fIr+MjG389+b9yRwi+j8BAHnEYLMa6i8Do1qCf5tLH/9rsmrllU+JN/Y4CZyqBVE1YqYBUPa2sgG+S5GF97VQ2QBwKeAiKCzAL4TceA4CrFfzM4EEMDK9ytoFUKjGV9EINprATWIYzQC2AABWUDggigAAAFAEAJ0BKhQAFAA+bTKVR6QioiEoCACADYlmAJ0y3V8lgQZqWXd5uAhFTIAA/va6G45iojxbmcATeGeSiCX0veeKbynmUCqQTUScdxZ2cGM3j3VtYMUAajEKP8vo5IYmTTafyBSNzTabgJ7IkkJoO9lc9hwQmn4xYIGEGqefyEFKGpWvLgVw2gAAAA=="
                        alt=""
                      />
                    </div>
                    <div className="menu-icon-con">
                      <h5>Favourite</h5>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="/refer-earn" className>
                  <div className="menu-con">
                    <div className="menu-icon">
                      <img
                        rel="preload"
                        src="data:image/webp;base64,UklGRlwDAABXRUJQVlA4WAoAAAAwAAAAEwAAEwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBI6gAAAAWAc9u2qWd/sW2nNSvbtm10ZmXbtvkLnFRmZds23htfqvQRobZtG0benJ4zQJKS3dESdG+n5kFFaoVKlEMOVqwHzVAhKi/lOZKSLB9WnEyC/h1IigvtWIOMe1V2OkD3ZpzKDzAx0Zxw4lro6+kZ2M5MkT4kyoUZ9iH2Slrhi1Fi0ZpgQkoBS9taBMNKX0fxBKVC/mg4jiStwDlmQ0fAek8DlgeQVmipHj7rBuDNX4GAl1oANuI2p9MjLn/Y3Xrq+Lcwj60HAGgWcUD/oQ+Adh6zwy6NO+JpX08UJgrxQPYp1ws1aw5Q1/bkDFZQOCB8AAAAcAMAnQEqFAAUAD5tMJNHJCKhoSgKqIANiWYArAAZLDfP2uhwAP727JPW6E7pHmReVL1/OAkMUWES1Hf5WmkRmygUEFa1//ffF40b5/PXzdPf+LYbQvMWb25Y95DAe7Ij20dbrFZcNgaHcUDZ676wJXHO69LOieegIZqAAA=="
                        alt=""
                      />
                    </div>
                    <div className="menu-icon-con">
                      <h5>Refer and Earn</h5>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="/statements" className>
                  <div className="menu-con">
                    <div className="menu-icon">
                      <img
                        rel="preload"
                        src="data:image/webp;base64,UklGRsgCAABXRUJQVlA4WAoAAAAwAAAAEwAAEwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIawAAAAFHIBBI4SYXEREGuK21bWnew/mlxQZgBKcm1ifdV8Y3QOrouze+QUT/J6B2MEq1QvQsR2J2I9GfIxcOVIX7kzsV3B9balDhQlIAKvcnm0b1ztToU70EIyc1hlHqsZ8de3eH/WB45GiH+4gAAFZQOCBmAAAAcAMAnQEqFAAUAD5tMpRHpCKiISgIAIANiWQAuzM0PgAb95pgAP72lYpWOT4cHD/MQZ2uBzIetzsGIFnVBGUt2fGGyQjZQ2aTDmqWvQ61/zKotddVbz+65zTltb89Q9rbRZEfAAAA"
                        alt=""
                      />
                    </div>
                    <div className="menu-icon-con">
                      <h5>Account Statement</h5>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="/bets" className>
                  <div className="menu-con">
                    <div className="menu-icon">
                      <img
                        rel="preload"
                        src="data:image/webp;base64,UklGRhADAABXRUJQVlA4WAoAAAAwAAAAEwAAEwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIlAAAAAFHIBBI4SYXEREGwLFtW21zxCrNbhmG4JKhDAnKcFJy8kux3rz1BxHR/wmAZxE1B3hQYfCibKCygYc1bNYArT+48htkJh+OJrVJvEarOpOo4+FgJpfKTmoRcXLrwU367XabwrjyEwfQuboP/14zJnHuhw0orFGsGb1DJdoVZGEQBEFpQ+YA5BbcqyAIfhXQKkREDQBWUDgghgAAABAFAJ0BKhQAFAA+bTCSRyQioaEoCqiADYlmAJ0y3rSCwKEBmAHrFfgBrAG9AAPoCIwA/vaVj4XnovUuL1j/8W1bh7gkdvuVk1fddXn4NJmeXrZrtu69pcz8pUbbX/RHrqVdhJUsBN2yclgNfSHkS5D4efYYIZQ7U4P8xZ+Pra28OtRUAAAA"
                        alt=""
                      />
                    </div>
                    <div className="menu-icon-con">
                      <h5>Unsettled Bets</h5>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="/bets" className>
                  <div className="menu-con">
                    <div className="menu-icon">
                      <img
                        rel="preload"
                        src="data:image/webp;base64,UklGRsgCAABXRUJQVlA4WAoAAAAwAAAAEwAAEwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIawAAAAFHIBBI4SYXEREGuK21bWnew/mlxQZgBKcm1ifdV8Y3QOrouze+QUT/J6B2MEq1QvQsR2J2I9GfIxcOVIX7kzsV3B9balDhQlIAKvcnm0b1ztToU70EIyc1hlHqsZ8de3eH/WB45GiH+4gAAFZQOCBmAAAAcAMAnQEqFAAUAD5tMpRHpCKiISgIAIANiWQAuzM0PgAb95pgAP72lYpWOT4cHD/MQZ2uBzIetzsGIFnVBGUt2fGGyQjZQ2aTDmqWvQ61/zKotddVbz+65zTltb89Q9rbRZEfAAAA"
                        alt=""
                      />
                    </div>
                    <div className="menu-icon-con">
                      <h5>Profit/Loss</h5>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="/multi-market" className>
                  <div className="menu-con">
                    <div className="menu-icon">
                      <img
                        rel="preload"
                        src="data:image/webp;base64,UklGRvgCAABXRUJQVlA4WAoAAAAwAAAAEwAAEwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIigAAAAFHIBBI4SYXEREGOLVtW1XW84pTXaJLfDSiS3SJznkZvf/9Lv8Q0f8JAIzBoWAAXConpVLAQDmn9EjF4Vvm5HHtUw0IRX7GqaLhnX45ukH3Y+oyix+6yFFCgYioI+CLiMyF/1/zj/lydMvKuax7etXACEW+Ju90aLUAPyhCT7nAVclPdQAim580AVZQOCB4AAAAUAQAnQEqFAAUAD5tMpVHpCKiISgIAIANiWwAnTKDxDOLmweG3ZLgEGVLgAD+9r3pn6YpbT8PvO8OL/3FPQYZDnlQiSUJsLzSJnI6zqq5Uycyp5/L9YPIT13VlF7VhT4laM+aRzS9l68mY10JE6QR5lt+bj4LLoAA"
                        alt=""
                      />
                    </div>
                    <div className="menu-icon-con">
                      <h5>Market Analysis</h5>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a href="/change-password" className>
                  <div className="menu-con">
                    <div className="menu-icon">
                      <img
                        rel="preload"
                        src="data:image/webp;base64,UklGRv4CAABXRUJQVlA4WAoAAAAwAAAAEwAAEwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIfwAAAAFHIBBI4SYXEREGOLFt22kO3f4hIJGs1WcAMu379I+MCujOvN9nDhH9nwAgXY2PdR3WzhH3DjUHYgzhnojFAdWKDcCIPsuyrAfSXQ4+zE2WZdmrBYNUf9LawuRaHJg8cQ+PftHRKRRxjXXy4vbAUb0j1ACj0VrrNQG17vu+GxcAVlA4IIgAAADQBACdASoUABQAPm0ylUekIqIhKAgAgA2JbACdMuLHP3B3JdsB4meSwbzgBB8ZMAD+9r3tRGKsL5f0/UNcP3WZb95vylXPxdF0WT9LD1a0gnP6MGTDaf3+zYrTLY2WEhT3RBfwfjH5j6ODyZSsKv47URyViAiiXAt6KW8M3Wr/q3wO5TFMt6AA"
                        alt=""
                      />
                    </div>
                    <div className="menu-icon-con">
                      <h5>Change password</h5>
                    </div>
                  </div>
                </a>
              </li>
              <li onClick={handleLogout} className="logout-sec">
                <a data-bs-toggle="modal" data-bs-target="#logoutmodal">
                  <div className="menu-con">
                    <div className="menu-icon">
                      <img
                        rel="preload"
                        src="data:image/webp;base64,UklGRhQDAABXRUJQVlA4WAoAAAAwAAAAEwAAEwAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZBTFBIXQAAAAFHIBBI4SYXEREGMIok28mSJWADCV8D8SkAjhnemeybtx4i+j8BWL8Q5qiVb10+qIKLlXvsTJlTj+BKmBPBvJsqWH5d+wlsJ+xMSKYgR8JmoLMAXCEb+sq3sH6BBQBWUDggwAAAAPAGAJ0BKhQAFAA+bTCTRyQioaEoCqiADYlsAJ0zHHw/l/4q/kA2wH6Af5n21ecA6wD0APK69jL9ovSZAnAbBOAA/ueL+8SlnUWIwMBKiinkxAOqvf/k28hHdBIo7gQkNuTX9zqdev15w82XNEC/rSfmUhrtFEXq6mUFuU45kT2JeDqy7rvtbp9fdUY58ayQkSn9UOxyXXZc7/KdtqRVhfuWf/Bv/yb//+lEc8TSHLLoIerW7c72oNZ/ek18MQAAAA=="
                        alt=""
                      />
                    </div>
                    <div className="menu-icon-con">
                      <h5>logout</h5>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {showRightDrawer && <div className="offcanvas-backdrop fade show" />}
    </div>
  );
};

export default RightDrawer;
