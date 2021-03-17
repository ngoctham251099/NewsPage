import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import Users from "../users/users";
import Department from "../departments/ListDepartment";
import News from "../news/list-news";

export default function HeaderAdmin(){
    return(
        <Router>
            <div>
                    <ul>
                        <li>
                            <Link to="/user">Users</Link>
                        </li>

                        <li>
                            <Link to="/list-department">Departments</Link>
                        </li>

                        <li>
                            <Link to="/news">News</Link>
                        </li>

                        <li>
                            <Link to="/statistical">Statistical</Link>
                        </li>
                    </ul>
            <Switch>
                <Route path="/user">
                    <Users/>
                </Route>

                <Route path="/list-department">
                    <Department/>
                </Route>

                <Route path="/news">
                    <News/>
                </Route>

                <Route path="/user">
                    <Users/>
                </Route>
            </Switch>
            </div>
            </Router>

    )
}