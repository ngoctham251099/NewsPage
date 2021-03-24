import Header from "./components/header/Header";
import SignIn from './components/users/signin';
import ViewsStatus from "./components/news/views-status";
import { BrowserRouter as Router, Route, Switch , Link} from "react-router-dom";
import NewsFromDate from "./components/news/newsfromDate";
import ListNewsFromDateToDate from "./components/news/views-fromdate-todate";
import CreateUser from './components/users/create-user';
import SignUp from './components/users/signup';
import ViewsManager  from "./components/list-update-status/user-manager";
import Admin from './components/header/admin';
import TemplaceUser from './components/templace user/templace-user'

function App(props) {
  const getComponent = () => {
    let token = localStorage.getItem("token");
    let power = localStorage.getItem("power");
    if(token){
      console.log(power)
      switch (power) {
        case "1":
          return (<Admin/>);
        case "2":
          return <Header/>;

        case "3":
          return <Header/>;
        case "4":
          return <Header/>;
        default:
          <TemplaceUser/>;
      }
    }else{
      return (
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
          {/* <Router>
            <Switch>
              <Route path="/signup">
                <SignUp/>
              </Route>
              
              <Route path="/signin">
                <SignIn/>
              </Route>
            </Switch>
          </Router> */}
      {/* <Router>
        
      </Router> */}
      {getComponent()}
      {/* <ViewsStatus/>
      <NewsFromDate/>
      <ListNewsFromDateToDate/>
      <CreateUser/> */}
      {/* <ViewsManager/> */}
    </div> 
  );
}

export default App;
