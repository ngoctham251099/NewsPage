import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import MainContentContainer from "./MainContentContainer";
import PostByCategoryComponent from "./PostByCategoryComponent";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import axios from "axios";

const HomePageComponent = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("/api-categories").then((res) => {
      setCategories(res.data.categories);
    });
  }, []);

  return (
    <div className="container-scroller">
      <div className="main-panel">
        <HeaderComponent categories={categories}/>
        <MainContentContainer categories={categories}/>
        <Link to ="/test">hghj</Link>
        <Switch>
        <Route exact path="/post-by-category/:id" component={PostByCategoryComponent}></Route>
        </Switch>
        <FooterComponent />
      </div>
    </div>
  );
};

export default HomePageComponent;
