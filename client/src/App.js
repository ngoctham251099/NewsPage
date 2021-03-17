import './App.css';
import Header from "./components/header/Header";
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
          return "jshdjff";
          //break;
      }
    }
  }
  return (
    <div className="App">
    {getComponent()}
    </div> 
  );
}

export default App;
