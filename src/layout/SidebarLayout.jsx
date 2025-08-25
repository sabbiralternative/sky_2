import LeftSidebar from "../components/shared/LeftSidebar/LeftSidebar";
import RightSidebar from "../components/shared/RightSidebar/RightSidebar";

const SidebarLayout = ({ children }) => {
  return (
    <section className="simplebar-content-wrapper dashbord-p-top">
      <div className="contan">
        <div className="user-box flex-d">
          <LeftSidebar />
          {children}
          <RightSidebar />
        </div>
      </div>
    </section>
  );
};

export default SidebarLayout;
