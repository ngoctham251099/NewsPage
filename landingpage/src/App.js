import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import HomePageComponent from "./Components/HomePageComponent";

function App() {
  return (
    <>

      <Router>
        <Switch>
          <Route exact path="/" component={HomePageComponent}></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
