import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Link, Route, Switch, useHistory } from 'react-router-dom';
import '../Design/css/admin.css'
import '../Design/js/jsAdmin'
import ListUser from "../users/users";
import ListNews from "../news/list-news";
import StatiscalTemplace from "../statistical/statistical";
import ListNewsApproved from "../news/list-news-approved";
import ListNewsWaitingForApproval from "../news/listNewsWaitingForApproval";
import ListDepartment from "../departments/ListDepartment";
import ListKinds from "../kindOfNews/list-kind";
import CreateUser from "../users/create-user";
import UpdateUser from "../users/update-user";

export default function Admin(){
  let history = useHistory();
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

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('idUser');
		localStorage.removeItem('power')
		history.push("/");
	}

	const clickDepartment = () => {
		history.push("/admin/departments")
	}

	const clickUsers = () => {
		history.push("/admin/users")
	}

	const clickKinds = () => {
		history.push("/admin/kinds")
	}

	const clickNews = () => {
		history.push("/admin/news")
	}

	const clickStatiscal = () => {
		history.push("/admin/statiscal")
	}

	const clickNewsApproved = () => {
		history.push("/admin/news-approved")
	}

	const clickNewsWaitingForApproval = () => {
		history.push("/admin/news-waiting-for-approval")
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
											<div  class="nav__link"><span class="las la-igloo"></span>
													<span>Dashboard</span></div>
									</li>
			
									<li>
											<div onClick={clickUsers} class="nav__link"><span class="las la-users"></span>
													<span>Người dùng</span></div>
									</li>

									<li>
											<div onClick={clickDepartment} class="nav__link"><span class="las la-users"></span>
													<span>Phòng ban</span></div>
									</li>

									<li>
											<div onClick={clickKinds} class="nav__link"><span class="las la-users"></span>
													<span>Loại tin</span></div>
									</li>
			
									<li>
											<div onClick={clickNews} class="nav__link" ><span class="las la-clipboard-list"></span>
													<span>Danh sách bài viết</span></div>
									</li>
			
									<li>
											<div onClick={clickStatiscal} class="nav__link"><span class="las la-clipboard-list"></span>
													<span>Thống kê</span></div>
									</li>
			
									<li>
											<div onClick={clickNewsApproved} class="nav__link"><span class="las la-receipt"></span>
													<span>Danh sách tin đã duyệt</span></div>
									</li>
			
									<li>
											<div onClick={clickNewsWaitingForApproval} class="nav__link"><span class="las la-user-circle"></span>
													<span>Danh sách tin chờ phê duyệt</span></div>
									</li>
			
									<li>
											<div onClick={logout}  class="nav__link "><span class="las la-igloo"></span>
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
						<div></div>
						<Switch>
							<Route path="/admin/statiscal" component={StatiscalTemplace}></Route>
						</Switch>
					<div class="recent-grid">
						<div className="projects">
							<div className="card">
								<Switch>
									<Route path="/admin/users/add" component={CreateUser}/>
									<Route path="/admin/users/edit/:id" component={UpdateUser}/>
									<Route path ="/admin/users" component={ListUser}/>
									<Route path ="/admin/departments" component={ListDepartment}/>
									<Route path ="/admin/news" component={ListNews}/>
									<Route path = "/admin/kinds" component={ListKinds}/>
									<Route path="/admin/news-approved" component={ListNewsApproved}></Route>
									<Route path="/admin/news-waiting-for-approval"component={ListNewsWaitingForApproval}/>
							</Switch>
							</div>
						</div>
					</div>
				</main>
			</div>
    </div>
  )
}