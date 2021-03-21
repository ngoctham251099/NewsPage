
import './App.css';
import Header from "./components/header/Header";
import SignIn from './components/users/signin';
import ViewsStatus from "./components/news/views-status";
import { BrowserRouter as Router, Route, Switch , Link} from "react-router-dom";
import NewsFromDate from "./components/news/newsfromDate";
function App(props) {
  const getComponent = () => {
    let token = localStorage.getItem("token");
    let power = localStorage.getItem("power");
    if(token){
      console.log(power)
      switch (power) {
        case "1":
          return <Header/>;
          //break;
        case "2":
          return <Header/>;
          break;

        case "3":
          return <Header/>;
          //break;
        case "4":
          return <Header/>;
          //break;
        default:
          return <SignIn></SignIn>;
          //break;
      }
    }else{
      return(
        <Router>
          <Route path="/signin">
            <SignIn/>
          </Route>
        </Router>
      )
    }
  }
  return (
    <div className="App">
      {getComponent()}
      {/* <Router>
        <Route path="/create">
            <Create/>
        </Route>
      </Router> */}
      <ViewsStatus/>
      <NewsFromDate/>
    </div> 
  );
}

export default App;
