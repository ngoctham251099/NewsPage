import React, { useEffect, useState } from "react";
import "./App.css";
import HeaderComponent from "../src/Components/HeaderComponent";
import FooterComponent from "../src/Components/FooterComponent";
import HomePageComponent from "./Components/HomePageComponent";
import MainContentContainer from "../src/Components/MainContentContainer";
import PostByCategoryComponent from "./Components/PostByCategoryComponent";
import PostById from "./Components/PostById";

import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import axios from "axios";

function App(props) {
  const [categories, setCategories] = useState([]);
  const [allPost, setAllPost] = useState([]);
  useEffect(() => {
    axios.get("/api-news/list-news-post").then((res) => {
      setAllPost(res.data.news);
    });
  }, []);

  useEffect(() => {
    axios.get("/api-categories").then((res) => {
      setCategories(res.data.categories);
    });
  }, []);
  return (
    <div className="container-scroller">
      <div className="main-panel">
        <Router>
          <HeaderComponent categories={categories}/>
          <Switch>

            <Route path="/post/:id"
              render={({ match }) => (
                <PostById
                  match={match}
                  allPost={allPost}
                />
            )}>
            </Route>

            <Route path="/post-by-category/:id"
              render={({ match }) => (
                <PostByCategoryComponent
                  match={match}
                  allPost={allPost}
                />
            )}>
            </Route>

            <Route exact path="/">
              <MainContentContainer categories={categories} allPost= {allPost}/> 
            </Route>
          </Switch>
          <FooterComponent />
        </Router>
      </div>
    </div>
  );
}

export default App;
