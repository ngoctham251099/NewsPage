import React from "react";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import MainContentContainer from "./MainContentContainer";

const HomePageComponent = () => {
  return (
    <div className="container-scroller">
      <div className="main-panel">
        <HeaderComponent />

        <MainContentContainer />

        <FooterComponent />
      </div>
    </div>
  );
};

export default HomePageComponent;
