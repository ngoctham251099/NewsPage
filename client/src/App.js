import Header from "./components/header/Header";
import SignIn from "./components/users/signin";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/users/signup";
import Admin from "./components/header/admin";
import TemplaceUser from "./components/templace user/templace-user";
import ForgetPassword from "./components/users/forgot-password";
import ResetPassword from "./components/users/reset-user";
import Editor from "./components/header/editor";
import ChiefEditor from "./components/header/ chief-editor";
import NewsWriter from "./components/header/news-writer";
import Secretary from "./components/header/secretary";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const getComponent = () => {
    let token = localStorage.getItem("token");
    let power = localStorage.getItem("power");
    console.log(token);

    if (token === null) {
      return <Route exact path="/" component={SignIn}></Route>;
    } else {
      switch (power) {
        case "1":
          return <Route path="/admin" component={Admin}></Route>;
        case "2":
          return <Header />;

        case "3":
          return <Header />;
        case "4":
          return <Header />;
        default:
          <TemplaceUser />;
      }
    }
  };
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Switch>
          <Route path="/auth/reset/:token" component={ResetPassword}></Route>
          <Route path="/admin" component={Admin}></Route>{" "}
          //---------------------------1
          <Route path="/chief-editor" component={ChiefEditor}></Route>{" "}
          //-----------------------2
          <Route path="/editor" component={Editor}></Route>{" "}
          //-----------------------3
          <Route path="/news-writer" component={NewsWriter}></Route>{" "}
          //-----------------------4
          <Route path="/secretary" component={Secretary}></Route>{" "}
          //-----------------------5
          <Route path="/forgot-password" component={ForgetPassword}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/" component={SignIn}></Route>
          {getComponent()}
          <Route path="*" component={() => "404 Not Found"} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
