import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory } from "react-router-dom";
import Department from "./components/departments/ListDepartment"
import ListNews from './components/news/list-news';
import Signin from "./components/users/signin";
import Header from "./components/header/header-admin";

export default function AppRouter(){
    return(
        <Router>
            <Switch>
                <Route path='/admin' render={
                    () => {
                        // console.log(isLogin === "0");
                        // console.log(localStorage.getItem('token'));
                     // return (isLogin === "1"  ? <ListNews/> : <Redirect to= "/"/>)
                        console.log(localStorage.getItem('token'),localStorage.getItem('power'))
                        if(localStorage.getItem('token') && localStorage.getItem('power') == 1){
                            console.log(true);
                            return <ListNews></ListNews>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 2){
                            return <Redirect to="/header"></Redirect>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 3){
                            return <Redirect to="/user"></Redirect>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 4){
                            return <Redirect to="/news"></Redirect>
                        }else{
                            return <Redirect to="/login"/>
                        }
                    }
                }></Route>

                {/* <Route path='/department' render={
                    () => {
                        // console.log(isLogin === "0");
                        // console.log(localStorage.getItem('token'));
                        // return (isLogin === "1"  ? <ListNews/> : <Redirect to= "/"/>)
                        console.log(localStorage.getItem('token'),localStorage.getItem('power'))
                        if(localStorage.getItem('token') && localStorage.getItem('power') == 1){
                            console.log(true);
                            return <ListNews></ListNews>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 2){
                            return <Redirect to="/department"></Redirect>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 3){
                            return <Redirect to="/user"></Redirect>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 4){
                            return <Redirect to="/news"></Redirect>
                        }else{
                            return <Redirect to="/login"/>
                        }
                    }
                }></Route>

                <Route axact path='/user' render={
                    () => {
                        // console.log(isLogin === "0");
                        // console.log(localStorage.getItem('token'));
                        // return (isLogin === "1"  ? <ListNews/> : <Redirect to= "/"/>)
                        console.log(localStorage.getItem('token'),localStorage.getItem('power'))
                        if(localStorage.getItem('token') && localStorage.getItem('power') == 1){
                            console.log(true);
                            return <ListNews></ListNews>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 2){
                            return <Redirect to="/department"></Redirect>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 3){
                            return <Redirect to="/user"></Redirect>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 4){
                            return <Redirect to="/news"></Redirect>
                        }else{
                            return <Redirect to="/login"/>
                        }
                    }
                }></Route>

                <Route path='/so-duyet' render={
                    () => {
                        // console.log(isLogin === "0");
                        // console.log(localStorage.getItem('token'));
                        // return (isLogin === "1"  ? <ListNews/> : <Redirect to= "/"/>)
                        console.log(localStorage.getItem('token'),localStorage.getItem('power'))
                        if(localStorage.getItem('token') && localStorage.getItem('power') == 1){
                            console.log(true);
                            return <ListNews></ListNews>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 2){
                            return <Redirect to="/department"></Redirect>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 3){
                            return <Redirect to="/user"></Redirect>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 4){
                            return <Redirect to="/news"></Redirect>
                        }else{
                            return <Redirect to="/login"/>
                        }
                    }
                }></Route>

                <Route path='/tong-duyet' render={
                    () => {
                        // console.log(isLogin === "0");
                        // console.log(localStorage.getItem('token'));
                        // return (isLogin === "1"  ? <ListNews/> : <Redirect to= "/"/>)
                        console.log(localStorage.getItem('token'),localStorage.getItem('power'))
                        if(localStorage.getItem('token') && localStorage.getItem('power') == 1){
                            console.log(true);
                            return <ListNews></ListNews>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 2){
                            return <Redirect to="/department"></Redirect>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 3){
                            return <Redirect to="/user"></Redirect>
                        }else if(localStorage.getItem('token') && localStorage.getItem('power') == 4){
                            return <Redirect to="/news"></Redirect>
                        }else{
                            return <Redirect to="/login"/>
                        }
                    }
                }></Route> */}

                <Route path="/login">
                    <Signin/>
                </Route> 
                <Route path="/header">
                    <Header/>
                </Route> 
            </Switch>
        </Router>
    )
}
