import React from 'react';
import { BrowserRouter as Router, Route, Switch , Link} from "react-router-dom";
import Department from "../departments/ListDepartment";
import Create from '../departments/Create';
import Edit from "../departments/update-department";
import ListNews from "../news/list-news";
import Users from '../users/users';
import CreateUser from "../users/create-user";
import EditUser from "../users/Update-user";
import ForgotPassword from "../users/forgot-password";
import SignIn from "../users/signin";
import ResetPassword from '..//users/reset-user';
import SignUp from "../users/signup";

export default function Header(props) {
    return (
        <div className="App">
        
          <Router>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/user">User</Link>
              </li>
              <li>
                <Link to="/department">Department</Link>
              </li>
              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            </ul>
            <Switch>
              <Route
                path="/department/edit/:id"
                location={props.location}
                key={props.location}
                render={(props) => (
                  <Edit {...props} key={props.location} />
                )}
              />
              <Route path='/forgot-password'>
                <ForgotPassword/>
              </Route>
              <Route
                path="/user/edit/:id"
                location={props.location}
                key={props.location}
                render={(props) => (
                  <EditUser {...props} key={props.location} />
                )}
              />
              <Route path="/user/add">
                <CreateUser/>
              </Route>
              <Route path="/department/add">
                <Create/>
              </Route>

              <Route
                path="/auth/reset/:token"
                location={props.location}
                key={props.location}
                render={(props) => (
                  <ResetPassword {...props} key={props.location} />
                )}
              />

              <Route  path="/signup">
                <SignUp/>
              </Route>
              <Route  path="/user">
                <SignIn/>
              </Route>
              <Route  path="/department">
                <Department/>
              </Route>
              <Route axact path="/">
                <ListNews/>
              </Route>
    
            </Switch>
          </Router>
        </div>
      );
}