import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Newsfeed from "../components/Newsfeed";
import SuggestionBar from "../components/SuggestionBar";
import Jobs from "../components/Jobs";
import Notifications from "../components/Notifications";
// import CompanyProfile from "../components/CompanyProfile";
import UserProfile from "../components/userProfile";
import { RxHamburgerMenu } from "react-icons/rx";

const Home = () => {
  const [selectedPath, setSelectedPath] = useState(0);
  const [isSidebarActive, setIsSidebarActive] = useState(false);

  //   to navigate using sidebar options
  const navigateComponents = () => {
    switch (selectedPath) {
      case 0:
        return <Newsfeed />;
      case 1:
        // return <CompanyProfile />;
        return <UserProfile />;
      case 2:
        return <Jobs />;
      case 4:
        return <Notifications />;

      default:
        break;
    }
  };

  return (
    <div className="pageContainer">
      {!isSidebarActive && (
        <RxHamburgerMenu
          className="hamburger_icon"
          onClick={() => {
            setIsSidebarActive(true);
          }}
        />
      )}
      <Sidebar
        selectedPath={selectedPath}
        setSelectedPath={setSelectedPath}
        isSidebarActive={isSidebarActive}
        setIsSidebarActive={setIsSidebarActive}
      />
      {navigateComponents(selectedPath)}
      <SuggestionBar />
    </div>
  );
};

export default Home;
