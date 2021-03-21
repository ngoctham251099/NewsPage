const News = require('../data/models/News');
const path = require('path');
const fs = require('fs');
const Users = require('../data/models/Users')

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
	console.log(images.length)
	const url = req.protocol + '://' + req.get('host');
	const urlAvatar  = avatar[0].filename;
	
	console.log(images[0].filename)
	for(var i = 0; i < images.length; i++){
		reqFiles.push(images[i].filename)
	}
	console.log(reqFiles);
	//console.log(req.files)
	//const avatar = req.file;
	const addnews = new News();
	// console.log(title, content)
	addnews.title = title;
	addnews.content = content;
	addnews.author = author;
	addnews.date_submitted = Date.now();
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
			console.log(item)
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
	const id = req.query.id;
	News.findOne({idUser: id})
	.then(
		item => {
			console.log(item);
			res.json({userId: item})
		}
	)
}

module.exports.statistical = (req, res) => {
	News.findOne({status: "1"})
	.then(
		item => {
			console.log(item);
			res.json({news: item})
		}
	)
}

module.exports.updateStatus = (req, res) => {
	
} 