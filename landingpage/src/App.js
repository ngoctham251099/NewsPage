import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import HomePageComponent from "./Components/HomePageComponent";
import PostByCategoryComponent from "./Components/PostByCategoryComponent";

function App() {
  return (
    <>

      <Router>
        <Switch>
          <Route exact path="/" component={HomePageComponent}></Route>
          <Route exact path="/post-by-category/:id" component={PostByCategoryComponent}></Route>

        </Switch>
      </Router>
    </>
  );
}

export default App;
