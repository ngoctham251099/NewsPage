
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Link, Route, Switch, useHistory, useLocation } from 'react-router-dom';

import {AiOutlineLogout} from "react-icons/ai";

import '../Design/css/admin.css'
import '../Design/js/jsAdmin'
import ListChiefEditor from '../news/list-chief-editor';
import ViewNews from "../news/ViewsNews";
import CreateNews from "../news/create";
import UpdateNews from "../news/edit-news";

export default function ChiefEditor(props){
    let history = useHistory();
    let path = "/chief-editor";

    const [newsComfirm, setNewsConfirm] = useState([]);
    const [error, setError] = useState();

    useEffect(()=>{
        const linkColor = document.querySelectorAll('.nav__link')
        function colorLink(){
            if(linkColor){
                linkColor.forEach(l=> l.classList.remove('active'))
                this.classList.add('active')
            }
        }
        linkColor.forEach(l=> l.addEventListener('click', colorLink))
    },[])

    //list danh sach cho phe duyet

    useEffect(async()=>{
        const res = await axios.get('/api-news/list-news-comfirmed');
        if(res){
            console.log(res.data.listNewsConfirmed)
            setNewsConfirm(res.data.listNewsConfirmed)
        }else{
            setError("Không tìm thấy")
        }
    },[])

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('power');
        localStorage.removeItem('idUser');
        history.push('/');
    }

    const listNews = () => {
        history.push(`${path}`)
    }
  return (
         <div>
        <input type="checkbox" id="nav-toggle"/>
        <div class="sidebar">
            <div class="sidebar-brand">
                <h2><span class="lab la-accusoft"></span><span>Accusoft</span></h2>
            </div>

            <div class="sidebar-menu">
                <ul>
                    <li>
                        <div onClick={listNews} href="#" class="nav__link active"><span class="las la-igloo"></span>
                            <span>Dashboard</span></div>
                    </li>
                    <li>
                        <div onClick={logout} class="nav__link a"><span><AiOutlineLogout/></span>
                            <span>Đăng xuất</span></div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="main-content">
            <header>
                <h2>
                    <label for="nav-toggle">
                        <span class="las la-bars"></span>
                    </label>
                    Dashboard
                </h2>
                <div class="search-wrapper">
                    <span class="las la-search"></span>
                    <input type="search" placeholder="Search here"/>
                </div>

                <div class="user-wrapper">
                    <img src="#" width="40px" height="40px" alt=""/>
                    <div>
                        <h4>John Doe</h4>
                        <small>Super admin</small>
                    </div>
                </div>
            </header>

            <main>
					<div class="recent-grid">
						<div className="projects">
							<div className="card">
                                <Switch>
                                    <Route path={`${path}/news/views/:id`}
                                        key={props.location.key} 
                                        render={({ 
                                                match 
                                        }) => (
                                            <ViewNews key={props.location.key} match={match} />
                                    )} >
                                    </Route>

                                    <Route path = {`${path}/news/add`}>
                                        <CreateNews path={path}/>
                                    </Route>
                                    
                                    <Route path={`${path}/news/:id`}
                                            key={props.location.key} 
                                            render={({ 
                                                    match 
                                            }) => (
                                            <UpdateNews key={props.location.key} match={match} />
                                        )} >
                                    </Route>
                                    <Route path={`${path}`}>
                                        <ListChiefEditor path={path}/>
                                    </Route>
                                </Switch>
							</div>
						</div>
					</div>
				</main>
        </div>
    </div>
  )
}