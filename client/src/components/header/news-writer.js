import React, { useEffect, useState } from 'react';
import { Link, Route, Router, Switch, useHistory } from 'react-router-dom';
import '../Design/css/admin.css'
import '../Design/js/jsAdmin'
import ListNewsWriter from "../news/list_writer";
import ViewNews from "../news/ViewsNews";
import CreateNews from "../news/create";
import UpdateNews from "../news/edit-news";

export default function Admin(props){
    const path = "/news-writer";
    const history = useHistory();
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
                        <div onClick={()=>{
                            history.push(`${path}`)
                        }} class="nav__link active"><span class="las la-igloo"></span>
                            <span>Dashboard</span></div>
                    </li>
        
                    <li>
                        <div href="#" class="nav__link"><span class="las la-users"></span>
                            <span>Soạn tin</span></div>
                    </li>
        
                    <li>
                        <div href="#" class="nav__link" ><span class="las la-clipboard-list"></span>
                            <span>Danh sách bài viết</span></div>
                    </li>

                    <li>
                        <div href="#" class="nav__link active"><span class="las la-igloo"></span>
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
                <div class="cards">
                    
                
                    
                    {/* <div class="card-single">
                        <div>
                            <h1>$6k</h1>
                            <span>Income</span>
                        </div>
                        <div>
                            <span class="las la-google-wallet"></span>
                        </div>
                    </div> */}
                </div>

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
                                    <ListNewsWriter path={path}/>
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