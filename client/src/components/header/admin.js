import React, { useEffect, useState } from 'react';
import { Link, Route, Router, Switch } from 'react-router-dom';
import '../Design/css/admin.css'
import '../Design/js/jsAdmin'
import Signin from "../users/signin"

export default function Admin(){
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
                        <a href="#" class="nav__link active"><span class="las la-igloo"></span>
                            <span>Dashboard</span></a>
                    </li>
        
                    <li>
                        <a href="#" class="nav__link"><span class="las la-users"></span>
                            <span>Người dùng</span></a>
                    </li>
        
                    <li>
                        <a href="#" class="nav__link" ><span class="las la-clipboard-list"></span>
                            <span>Danh sách bài viết</span></a>
                    </li>
        
                    <li>
                        <a href="#" class="nav__link"><span class="las la-clipboard-list"></span>
                            <span>Thống kê</span></a>
                    </li>
        
                    <li>
                        <a href="#" class="nav__link"><span class="las la-receipt"></span>
                            <span>Danh sách tin chờ duyệt</span></a>
                    </li>
        
                    <li>
                        <a href="#" class="nav__link"><span class="las la-user-circle"></span>
                            <span>Danh sách tin đã duyệt</span></a>
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
                </div>
            </main>
        </div>
        </div>
  )
}