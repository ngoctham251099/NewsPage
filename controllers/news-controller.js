const News = require('../data/models/News');
const path = require('path');
const fs = require('fs');
const Users = require('../data/models/Users')
const moment= require('moment');

module.exports.showNews = (req, res, next) => {
	News.find()
	.then(
		newsPage => {
			console.log(newsPage.images)
			res.json({page: newsPage, images: newsPage.images});
		}
	)
}

module.exports.create = (req, res, next) => {
	const reqFiles = [];
	const { title, content, author, idUser} = req.body;
	const {avatar, images} = req.files;
	const url = req.protocol + '://' + req.get('host');
	const urlAvatar  = avatar[0].filename;
	
	console.log(images[0].filename)
	for(var i = 0; i < images.length; i++){
		reqFiles.push(images[i].filename)
	}
	//new Date(date).setHours(00,00,00)
	const date = Date.now();
	const addnews = new News();
	const date_submitted = moment(date).format('L');
	console.log(date_submitted)
	addnews.title = title;
	addnews.content = content;
	addnews.author = author;
	addnews.date_submitted = date_submitted;
	addnews.status = 1;
	addnews.IdUser = idUser;
	addnews.department = 1;
	addnews.avatar = urlAvatar;
	addnews.images = reqFiles;
	//1 = cho phe duyet, 2 = phe duyet cua truong phong, 3 = phe duyet cua giam doc, 4 = da phe duyet
	//fs
	addnews.save()
	.then(
		(item) => {
			res.json({message: 'Add news successfully',
			news: item,
			createdProduct: {
				title: item.title,
				content: item.content,
				file: item.avatar,
				_id: item._id,
				request: {
					type: 'GET',
					url: "http://localhost:5000/api-news/create" + item._id
				}
		}
		}
		)}
	)
	.catch(err => {
		console.log(req.body);
		res.status(400).send("unable to save to database");
	});
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

	const {title, content, author} = req.body;

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

module.exports.viewsId = (req, res ,next) => {
	const id = req.params.id;
	News.findOne({idUser: id})
	.then(
		item => {
			console.log(item);
			res.json({userId: item})
		}
	)
}

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
//update của người sơ duyệt
module.exports.updateStatus1 = async (req, res) => {
	const id = req.params.id;
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
module.exports.updateStatus2 = async (req, res) => {
	const id = req.params.id;
	const user = await Users.findOne({_id: id})
	if(user.power == "3"){
		const editNews = await News.findById(req.params.idNews)
		if(!editNews){
			return res.json({message: "Không tìm thấy bài viết"})
		}
		editNews.status = 3;
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
module.exports.statisticalFromDate = async (req, res) => {
	const funt = (item) => {
		return moment(item).format('L')
	}
	const { date } = req.body;
	//console.log(date)
	const dateMoment = moment(date).format('L');
	console.log(dateMoment)
	const allNews = await News.find({ date_submitted: new Date(date).setHours(00,00,00) });
	if(allNews){
		console.log(allNews.date_submitted)
	//	return res.json({message:"Không tìm thấy bài viết"})
		console.log(allNews)
		return res.json({ newsFromDate : allNews })
	}else{
		return res.json({message:"Không tìm thấy bài viết"})
	//return res.json({ newsFromDate : allNews })
	}
}

//Thống kê theo tháng
module.exports.statisticalFromMonth = async (req, res) => {
	const { month } = req.query;
	let date = new Date();
	console.log(month)
//	console.log(date.val(moment().format('D MMM, YYYY')))
	console.log(date.setMonth('2021-03-21T16:04:24.525Z'));
	const allNews = await News.find({})
}

//Thống kê tin bài từ ngày này đến ngày này
module.exports.statisticalFromDateToDate = async (req, res) => {
	const { fromDate, toDate } = req.body;

	const allNews = await News.find({$or:{

	}})
}