import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
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
import NewsFromDate from "../news/newsfromDate";
import NewsFromMonth from "../news/newsFromMonth";
import NewsFromYear from "../news/newsFromYear";
import ViewNews from "../news/ViewsNews";
import UpdateDepartment  from '../departments/update-department';
import CreateDepartment from '../departments/Create';
import CreateKind from '../kindOfNews/create-kind';
import UpdateKind from '../kindOfNews/update-kind';
import UpdateNews from '../news/edit-news';
import CreateNews from '../news/create';

import ListCategories from '../categories/listCategories';
import CreateCategories from '../categories/Create';
import UpdateCategories from '../categories/update-categories';

export default function Admin(props){
  let history = useHistory();
	const path = "/secretary";

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


	const clickCategories = () => {
		history.push(`${path}/categories`)
	}

	const clickNews = () => {
		history.push(`${path}/news`)
	}

	const clickStatiscal = () => {
		history.push(`${path}/statistical`)
	}

	const clickNewsApproved = () => {
		history.push(`${path}/news-approved`)
	}

  return (
    <div>
			<input type="checkbox" id="nav-toggle"/>
			<div className="sidebar">
					<div className="sidebar-brand">
							<h2><span className="lab la-accusoft"></span><span>Accusoft</span></h2>
					</div>

					<div className="sidebar-menu">
							<ul>
									<li>
											<div  className="nav__link"><span className="las la-igloo"></span>
													<span>Dashboard</span></div>
									</li>

									<li>
											<div onClick={clickCategories} className="nav__link"><span className="las la-users"></span>
													<span>Chuyên mục đăng</span></div>
									</li>

									<li>
											<div onClick={clickNews} className="nav__link" ><span className="las la-clipboard-list"></span>
													<span>Danh sách bài viết</span></div>
									</li>
			
									<li>
											<div onClick={clickStatiscal} className="nav__link"><span className="las la-clipboard-list"></span>
													<span>Thống kê</span></div>
									</li>
			
									<li>
											<div onClick={clickNewsApproved} className="nav__link"><span className="las la-receipt"></span>
													<span>Danh sách tin đã duyệt</span></div>
									</li>
			
									<li>
											<div onClick={logout}  className="nav__link "><span className="las la-igloo"></span>
													<span>Đăng xuất</span></div>
									</li>
							</ul>
					</div>
			</div>

			<div className="main-content">
				<header>
						<h2>
								<label for="nav-toggle">
										<span className="las la-bars"></span>
								</label>
								Dashboard
						</h2>
						<div className="search-wrapper">
								<span className="las la-search"></span>
								<input type="search" placeholder="Search here"/>
						</div>

						<div className="user-wrapper">
								<img src="#" width="40px" height="40px" alt=""/>
								<div>
										<h4>John Doe</h4>
										<small>Super admin</small>
								</div>
						</div>
				</header>

				<main>
						<Switch>
							<Route path= {`${path}/statistical`}>
								<StatiscalTemplace path={path}></StatiscalTemplace>
							</Route>
						</Switch>
					<div className="recent-grid">
						<div className="projects">
							<div className="card">
								<Switch>
									<Route path={`${path}/users/add`} component={CreateUser}/>
									<Route path={`${path}/users/edit/:id`} component={UpdateUser}/>
									<Route path = {`${path}/users`} component={ListUser}/>
									<Route path={`${path}/departments/edit/:id`}
												key={props.location.key} 
												render={({ 
														match 
												}) => (
														<UpdateDepartment key={props.location.key} match={match} path={path}/>
									)} ></Route>
									<Route path={`${path}/departments/add`}>
										<CreateDepartment></CreateDepartment>
									</Route>
									<Route path = {`${path}/departments`}>
										<ListDepartment path={path}></ListDepartment>
									</Route>

									<Route path={`${path}/categories/edit/:id`}
												key={props.location.key} 
												render={({ 
														match 
												}) => (
														<UpdateCategories key={props.location.key} match={match} path={path}/>
									)} ></Route>
									<Route path={`${path}/categories/add`}>
										<CreateCategories/>
									</Route>
									<Route path = {`${path}/categories`}>
										<ListCategories path={path}/>
									</Route>

									<Route path={`${path}/news/views/:id`}
												key={props.location.key} 
												render={({ 
														match 
												}) => (
														<ViewNews key={props.location.key} match={match} />
									)} >
									</Route>
									
									<Route path = {`${path}/news/add`}>
										<CreateNews path = {path}></CreateNews>
									</Route>

									<Route path={`${path}/news/:id`}
												key={props.location.key} 
												render={({ 
														match 
												}) => (
												<UpdateNews key={props.location.key} match={match} path={path}/>
									)} ></Route>

									<Route path = {`${path}/news`}>
										<ListNews path = {path}></ListNews>
									</Route>

									<Route path={`${path}/kinds/edit/:id`}
												key={props.location.key} 
												render={({ 
														match 
												}) => (
														<UpdateKind key={props.location.key} match={match} path={path}/>
									)} ></Route>
									<Route path={`${path}/kinds/add`}>
										<CreateKind></CreateKind>
									</Route>

									<Route path =  {`${path}/kinds`}>
											<ListKinds path={path}></ListKinds>
									</Route>
									
									<Route path= {`${path}/news-approved`} component={ListNewsApproved}></Route>
									<Route path= {`${path}/news-waiting-for-approval`} component={ListNewsWaitingForApproval}/>
									<Route path = {`${path}/statistical/date`} >
										<NewsFromDate path={path}></NewsFromDate>
									</Route>

									<Route path = {`${path}/statistical/month`} >
										<NewsFromMonth></NewsFromMonth>
									</Route>
									<Route path = {`${path}/statistical/year`} >
										<NewsFromYear/>
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