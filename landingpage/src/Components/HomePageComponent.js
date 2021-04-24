import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import MainContentContainer from "./MainContentContainer";
import axios from "axios";

const HomePageComponent = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api-categories").then((res) => {
      console.log(res.data.categories);
      setCategories(res.data.categories);
    });
  }, []);

  return (
    <div className="container-scroller">
      <div className="main-panel">
        <HeaderComponent categories={categories}/>

        <MainContentContainer categories={categories}/>

        <FooterComponent />
      </div>
    </div>
  );
};

export default HomePageComponent;
