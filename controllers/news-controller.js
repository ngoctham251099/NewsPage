const News = require('../data/models/News');
const path = require('path');
const fs = require('fs');
const Users = require('../data/models/Users')
const moment= require('moment');
const { match } = require('assert');
const User = require('../data/models/Users');

module.exports.showNews = (req, res, next) => {
	News.find().sort([])
	.then(
		newsPage => {
			console.log(newsPage.images)
			res.json({page: newsPage, images: newsPage.images});
		}
	)
}

module.exports.create = async (req, res, next) => {
	const reqFiles = [];
	const { title, content, author, idUser} = req.body;
	const {avatar, images} = req.files;
	const url = req.protocol + '://' + req.get('host');
	const urlAvatar  = avatar[0].filename;
	
	console.log(images[0].filename)
	for(var i = 0; i < images.length; i++){
		reqFiles.push(images[i].filename)
	}

	let user = await Users.findOne({_id: idUser});

	const addnews = new News();
	//user
	console.log(idUser)

	let date = Date.now();
	let dateMoment = moment(date).format('YYYY-MM-DD')
	console.log(dateMoment)
	let date_test = date.Date;
	addnews.title = title;
	addnews.content = content;
	addnews.author = author;
	addnews.date_submitted = "2021-03-22";
	addnews.status = 1;
	addnews.IdUser = idUser;
	addnews.department = user.department;
	addnews.avatar = urlAvatar;
	addnews.images = reqFiles;
	addnews.kindNews = null;
	//1 = cho phe duyet, 2 = phe duyet cua truong phong, 3 = phe duyet cua giam doc, 4 = da phe duyet
	//fs
	await addnews.save()
	return res.json({message: 'Add news successfully'})

}

module.exports.viewsImages = (req, res) =>{
	const {name} =  req.params;
	console.log(req.params.name);
	res.sendFile(path.resolve(`./upload/${name}`));
}

module.exports.delete = (res, req, next) => {
	const id = req.params.id;

	News.findOneAndDelete({id: id})
	.then(
		item => {
			res.json({message: 'Delete news suseccfully'})
		}
	)
}

module.exports.update = (req, res, next) => {
	const id = req.params.id;

	const {title, note} = req.body;

	News.updateOne({_id: id}, {
		$set: {
			title: title,
			content: content,
			author: author
		}
	}).then(
		item => {
			console.log(item);
			res.json({message: 'Update susseccfully'})
		}
	)
}

module.exports.uploadImages = (req, res) => {
	const TempFile = req.files.upload;
	const TempPathFile = TempFile.path;
	const targetPathUrl = path.join(__dirname,"..","uploads",TempFile.name);
	
	if(path.extname(TempFile.originalFilename).toLowerCase() == ".png" || ".jpg"){
		fs.rename(TempPathFile, targetPathUrl, err => {
			if(err){
				return console.log(err);
			}
			res.status(200).json({
				uploaded: true,
				url: `${TempFile.originalFilename}`
			})
		})
	}
}
//view theo tai khoan
module.exports.viewsId = (req, res ,next) => {
	const id = req.params.id;
	News.find({IdUser: id})
	.then(
		item => {
			console.log(item);
			res.json({userId: item})
		}
	)
}

//view tin theo id
module.exports.viewsIdNews = async (req, res, next) => {
	const {id} = req.params;
	console.log(id)	
	const arrNews = await News.findById(id);

	if(arrNews) {
		return res.json({arrNews: arrNews});
	}else{
		return res.json({error: "Không tìm thấy bài viết"})
	}
}

//tim news cua tung truong phong de phe duyet
module.exports.viewsDepartment = async (req, res) => {
	const {id} = req.query;
	console.log(id)
//	const {power} = req.query;
	const user = await Users.findOne({_id: id});
	console.log(user)
	if(user.power == "2"){
		const listNews = await News.find({department: user.department})
		console.log(listNews)
		return res.json({listNews: listNews})
	}else{
		return res.json({message: 'Không được phép xem'})
	}
}

//tim news cua tung giam doc de phe duyet
module.exports.viewsDepartmentPresident = async (req, res) => {
	const {id} = req.query;
	console.log(id)
//	const {power} = req.query;
	const user = await Users.findOne({_id: id});
	console.log(user)
	if(user.power == "3"){
		const listNews = await News.find({department: user.department})
		console.log(listNews)
		return res.json({listNews: listNews})
	}else{
		return res.json({message: 'Không được phép xem'})
	}
}
//tin khong duoc duyet
module.exports.statistical = (req, res) => {
	// const {name} = req.params;
	News.findOne({status: "4"})
	.then(
		item => {
			if(!item){
				return res.json({message: 'Không có bài viết nào được phê duyệt'})
			}
			console.log(item);
			return res.json({news: item})
		}
	)
}
//update status của người sơ duyệt
module.exports.updateStatusManager = async (req, res) => {
	const {id} = req.params;
	const {kind} = req.body;

	if(!kind){
		return res.json({message: "Chọn loại tin trước khi duyệt bài "})
	}
	const user = await Users.findOne({_id: id})
	if(user.power == "2"){
		const editNews = await News.findById(req.params.idNews)
		if(!editNews){
			return res.json({message: "Không tìm thấy bài viết"})
		}
		editNews.status = 2;
		await editNews.save();
		return res.json({message: "Đã duyệt tin"})
	}else{
		return res.json({message: "Không được phép duyệt tin"})
	}
} 
//update status của giám đốc khi tin bài đã được sơ duyệt
module.exports.updateStatusPresident = async (req, res) => {
	const id = req.params.id;
	const {note} = req.body;
	const user = await Users.findOne({_id: id})
	if(user.power == "3"){
		const editNews = await News.findById(req.params.idNews)
		if(!editNews){
			return res.json({message: "Không tìm thấy bài viết"})
		}
		editNews.status = 3;
		editNews.note = note;
		await editNews.save();
		return res.json({message: "Đã duyệt tin"})
	}
} 

//update status khi bị từ chối sơ duyệt
module.exports.updateStatusNoReview = async (req, res) => {
	const id = req.params.id;
	const user = await Users.findOne({_id: id})
	if(user.power == "3" || user.power == "2"){
		const editNews = await News.findById(req.params.idNews)
		if(!editNews){
			return res.json({message: "Không tìm thấy bài viết"})
		}
		editNews.status = 0;
		await editNews.save();
		return res.json({message: "Đã từ chối duyệt tin"})
	}else{
		return res.json({message: "Không được phép sơ duyệt tin bài"})
	}
}

//Thống kê tin bài theo ngày
module.exports.statisticalFromDate = (req, res) => {
	const { date } = req.body;
	const dateMoment = moment(date).format('YYYY-MM-DD');
	News.find({date_submitted: new Date(dateMoment)})
	.then(item => {
		return res.json({ newsFromDate : item })
	})
	
}

//Thống kê theo tháng
module.exports.statisticalFromMonth = async (req, res) => {
	const { fromMonth } = req.body;
	console.log(fromMonth)
	let monthMoment = moment(fromMonth).format('YYYY-MM-DD');
	console.log(monthMoment);
	const aggegation = [{
		$match:{
			$expr: {
				$eq: [{ $month: '$date_submitted' }, {$month: new Date(monthMoment)}]
			}
		}
	}]
	let allNews = await News.aggregate(aggegation);
	return res.json({NewMonth: allNews})
}

//Thống ke theo quý
module.exports.statisticalFromMonthtoMonth = async (req, res) => {
	const {fromMonth, toMonth} = req.body;
	const fromMonthMoment = moment(fromMonth).format('YYYY-MM-DD');
	const toMonthMoment = moment(toMonth).format('YYYY-MM-DD');
	const aggregation = [{
		$match:{
			$expr: {
				$gte:[{ $month: '$date_submitted' }, { $month: new Date(fromMonthMoment) }]
			},
			$expr: {
				$lt:[{ $month: '$date_submitted' }, { $month: new Date(toMonthMoment) }]
			}
		}
	}]

	let allNews = await News.aggregate(aggregation);
	return res.json({NewMonth: allNews})
}

//Thống kê theo năm
module.exports.statisticalFromYear = async (req, res) => {
	const {year} = req.body;
	console.log(year)
	const fromYear = moment(year).format('YYYY-MM-DD');
	const aggregation = [{
		$match:{
			$expr: {
				$eq:[{ $year: '$date_submitted' }, { $year: new Date(fromYear) }]
			}
		}
	}] 

	const allNews = await News.aggregate(aggregation);
	return res.json({NewMonth: allNews})
}

//Thống kê tin bài từ ngày này đến ngày này
//thanh cong
module.exports.statisticalFromDateToDate = async (req, res) => {
	const { fromDate, toDate } = req.body;
	console.log(fromDate, toDate)

	let fromDateMoment = moment(fromDate).format('YYYY-MM-DD');
	let toDateMoment =moment(toDate).format('YYYY-MM-DD');
//	console.log(fromDateMoment, toDateMoment)
	const allNews = await News.find({date_submitted: {
		$gte: new Date(fromDateMoment),
		$lt: new Date(toDateMoment)
	}})
	let count = allNews.count().exec();
	return res.json({ News : allNews,
										count: count})
}

//Thống kê theo tên tác giả
// module.exports.statisticalAuthor = async (req, res) => {
// 	const {nameOfUser} = req.body;
// 	console.log(nameOfUser)
// 	const user = await User.findOne({username: nameOfUser});
	
// 	const listNews = await News.findOne({IdUser: user._id});
// 	if(listNews){
// 		return res.json({listNews: listNews})
// 	}else{
// 		return res.json({message: "Không tìm thấy"})
// 	}
// }


module.exports.statisticalAuthor = async (req, res) => {
	const {nameOfUser} = req.body;
	console.log(nameOfUser)
	//const user = await User.findOne({username: nameOfUser});
	
	const listNews = await News.find();
	if(listNews){
		let count = listNews.count({author: nameOfUser});
		return res.json({listNews: listNews,
											count: count
		 })
	}else{
		return res.json({message: "Không tìm thấy"})
	}
}

//Danh sach tin da phe duyet
module.exports.listNewsApproved = async (req, res) => {
	const listNews = await News.find({status: "3"});
	if(!listNews){
		return res.json({message: "Không có tin nào được duyệt"})
	}else{
		return res.json({listNewsApproved: listNews})
	}
}

//Danh sach tin da xac nhan
module.exports.listNewsConfirmed = async (req, res) => {
	const listNews = await News.find({status: "2"});
	if(!listNews){
		return res.json({message: "Không có tin nào được duyệt"})
	}else{
		return res.json({listNewsConfirmed: listNews})
	}
}

//Danh sach tin cho phe duyet
module.exports.listNewsWaitingForApproval= async (req, res) => {
	const listNews = await News.find({status: "1"});
	if(!listNews){
		return res.json({message: "Không có tin nào chờ phê duyệt"})
	}else{
		return res.json({listNewsApproved: listNews})
	}
}



