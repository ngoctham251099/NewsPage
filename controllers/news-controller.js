const News = require("../data/models/News");
const path = require("path");
const fs = require("fs");
const Users = require("../data/models/Users");
const Kinds = require("../data/models/KindOfNews");
const PriceOfKind = require("../data/models/priceOfKind");
const Categories = require("../data/models/Categories")
const moment = require("moment");
const Departments = require("../data/models/Department")
const PriceImages = require("../data/models/kindOfImages");

const calculatePrice = async (idPrice) => {
 
	if(idPrice != 'undefined'){
		const data =  await PriceOfKind.findOne({_id: idPrice});
		if(data){
			return data.price;
		}
	}
	return 0;
	
}

const getAttrFromString = (str, node, attr) => {
	let regex = new RegExp("<" + node + " .*?" + attr + '="(.*?)"', "gi"),
		result,
		res = [];
	while ((result = regex.exec(str))) {
		res.push(result[1]);
	}
	return res;
};

module.exports.showNews = async (req, res, next) => {
	const getKind = await Kinds.find();
	const getCategories = await Categories.find();
	const getKindPrice = await PriceOfKind.find();
	const getUser = await Users.find();
	const news = await News.find().sort({date_submitted: -1});
	const data = news.map(item => {
		return {
			...item, 
			price: calculatePrice(item.idPriceOfKind),
			nameKind: getKind.find(val => String(val._id) === item.kindNews)?.name ,
			nameCategories: getCategories.find( val => String(val._id) === item.categories)?.name ,
			namePriceOfNews: getKindPrice.find( val => String(val._id) === item.idPriceOfKind)?.name,
			nameAuthor: getUser.find(val => String(val._id) === item.IdUser)?.fullName
		}}) 
	return res.json({page: data})
};

function base64Encode(file) {
	var body = fs.readFileSync(file);
	return body.toString('base64');
}


module.exports.create = async (req, res, next) => {
	const {
		title,
		content,
		idUser,
		summary,
		status = 1,
		kindNews,
		categories,
		note,
		idKindImages,
		idPriceOfKind,
		isPostedFanpage = false
	} = req.body;
	const user = await Users.findOne({ _id: idUser });
	const { avatar } = req.files;
	if(!title || !summary || !avatar || !categories){
		return res.json({message: "Không được phép để trống"})
	}

	if(content === 'undefined'){
		return res.json({message: "Điền nội dung tin, bài"})
	}

	if(user.power !== "4"){
		if(kindNews === "undefined" || idPriceOfKind === "undefined"){
			return res.json({message: "Loại tin và chất lượng không được để trống"})
		}
	}
	const userBTV = await Users.findOne({_id: idUser});

	const listImagesOnContent = getAttrFromString(content, "img", "src");
	const urlAvatar = avatar[0].filename;
	const addnews = new News();
	addnews.title = title;
	addnews.content = content;
	addnews.author = user.fullName;
	addnews.date_submitted = new Date();
	addnews.status = status;
	addnews.images = listImagesOnContent;
	addnews.IdUser = idUser;
	addnews.avatar = urlAvatar;
	addnews.kindNews = kindNews;
	addnews.categories = categories;
	addnews.idPriceOfKind = idPriceOfKind;
	
	addnews.idDepartment = user.department;
	addnews.note = note;
	addnews.summary = summary;
	addnews.thumbnail = `data:${avatar[0].mimetype};base64,` + base64Encode(avatar[0].path)
	if(userBTV.idBTV){
		addnews.idBTV = userBTV.idBTV;
	}
	if(listImagesOnContent.length > 0){
		addnews.idPriceOfImages = idKindImages
	}	

	if(user.power === "3"){
		addnews.isCheckedBTV = true;
		addnews.idBTV = idUser;
		addnews.date_BTV = Date.now();
	}

	if(user.power === "2"){
		addnews.isCheckedTBBT = true;
		addnews._idTBBT = idUser;
		addnews.date_TBBT = Date.now();
	}
	if(listImagesOnContent.length > 0){
		addnews.idPriceOfImages = idKindImages;
	}

	if(user.power === '1' || user.power === '5'){
		addnews.date_post = Date.now();
	}
	
	addnews.isPostedFanpage = isPostedFanpage;
	await addnews.save();
	return res.json({ message: "Thêm thành công" });
};

module.exports.viewsImages = (req, res) => {
	const { name } = req.params;
	res.sendFile(path.resolve(`./upload/${name}`));
};

module.exports.deleteNews = (req, res, next) => {
	const { id } = req.params;

	News.deleteOne({ _id: id }).then((item) => {
		return res.json({ message: "Đã xóa thành công" });
	});
};

module.exports.editNews = (req, res, next) => {
	News.findById(req.params.id)
		.then((news) => {
			res.json({ news: news });
		})
		.catch((err) => res.status(400).json({ err: err }));
};

module.exports.updateNews = async (req, res) => {
	const { id } = req.params;
	const {
		title,
		content,
		status,
		kindNews,
		idUser,
		note,
		power,
		categories,
		idPriceOfKind, 
		kindOfImages,
		isPostedFanpage = false
	} = req.body;
	const { avatar = "" } = req.files;
	const listImagesOnContent = getAttrFromString(content, "img", "src");
	const user = await Users.findOne({_id: idUser})
	if(user.power !== "4"){
		if(kindNews === "undefined" || idPriceOfKind === "undefined"){
			return res.json({message: "Loại tin và chất lượng không được để trống"})
		}
	}

	const urlAvatar = avatar ? avatar[0].filename : null;
	if (avatar == null) return res.json({ message: "Chọn hình" });

	const news = await News.findOne({_id: id});
	
	if (news) {
		news.title = title;
		news.content = content;
		if (urlAvatar) {
			news.avatar = urlAvatar;
			news.thumbnail = `data:${avatar[0].mimetype};base64,` + base64Encode(avatar[0].path)
		}
		news.images = listImagesOnContent;
		news.status = status;
		if(listImagesOnContent.length > 0){
			news.idPriceOfImages = kindOfImages
		}
		
		if (kindNews) {
			news.kindNews = kindNews;
		}
		if (categories) {
			news.categories = categories;
		}
		news.note = note;
		if(idPriceOfKind){
			news.idPriceOfKind = idPriceOfKind;
		}
		if(power === "3"){
			news.isCheckedBTV = true;
			news.date_BTV = Date.now();
		}

		if(power === "2"){
			news.isCheckedTBBT  = true;
			news.date_TBBT = Date.now();
		}

		if(power === "1" || power === "5"){
			news.date_post = Date.now();
		}
		
		news.isPostedFanpage = isPostedFanpage;
		await news.save();
		return res.json({ message: "Cập nhật thành công" });
	}
};

//--------------

//-----------------------

module.exports.uploadImages = (req, res) => {
	const TempFile = req.files.upload;
	const TempPathFile = TempFile.path;
	const targetPathUrl = path.join(__dirname, "..", "uploads", TempFile.name);

	if (
		path.extname(TempFile.originalFilename).toLowerCase() == ".png" ||
		".jpg"
	) {
		fs.rename(TempPathFile, targetPathUrl, (err) => {
			if (err) {
				return res.json(err);
			}
			res.status(200).json({
				uploaded: true,
				url: process.env.API_URL + "/" + TempFile.originalFilename,
			});
		});
	}
};

//view theo tai khoan
module.exports.viewsId = (req, res, next) => {
	const id = req.params.id;
	News.find({ IdUser: id }).then((item) => {
		res.json({ userId: item });
	});
};

//view tin theo id de view ra do ma
module.exports.viewsIdNews = async (req, res, next) => {
	const { id } = req.params;
	const arrNews = await News.findById(id);
	if (arrNews) {
		return res.json({ arrNews: arrNews });
	} else {
		return res.json({ error: "Không tìm thấy bài viết" });
	}
};

//list danh sach cua nguoi viet de in ra. view theo nguoi dung
module.exports.viewsWriter = async (req, res, next) => {
	const { id } = req.query;
	const kind = await Kinds.find();
	const category = await Categories.find();
	const getUser = await Users.find();
	const arrNews = await News.find({ IdUser: id }).sort({date_submitted: -1});
	const data = arrNews.map(item => {
		return {
			...item,
			nameKind: kind.find(val => String(val._id) === item.kindNews)?.name,
			nameCategories: category.find(val => String(val._id) === item.categories)?.name,
			nameAuthor: getUser.find(val => String(val._id) === item.IdUser)?.fullName
		}
	})
	return res.json({ arrNews: data });
};

//tim news cua tung truong phong de phe duyet va trang thai
module.exports.viewsDepartment = async (req, res) => {
	const { id } = req.query;
	const user = await Users.findOne({ _id: id });
	if (user.power == "3") {
		const listNews = await News.find({ status: "1" }).sort({date_submitted: -1});
		return res.json({ listNews: listNews });
	} else {
		return res.json({ message: "Không được phép xem" });
	}

	// const news = await News.find({ $and: [ {department: user.department }, {status: "1"} ]})
	// return res.json({news: news});
};

//tim news cua tung giam doc de phe duyet vaf trang thai
module.exports.viewsDepartmentPresident = async (req, res) => {
	const { id } = req.query;
	const getKinds = await Kinds.find();
	const getCategory = await Categories.find();
	const getUser = await Users.find();
	const user = await Users.findOne({ _id: id });
	if (user.power == "2") {
		const listNews = await News.find({ status: "2" }).sort({date_submitted: -1});
		const data = listNews.map(item => {
			return {
				...item,
				nameKind: getKinds.find(val => String(val._id) === item.kindNews)?.name,
				nameCategories: getCategory.find(val => String(val._id) === item.categories)?.name,
				nameAuthor: getUser.find(val => String(val._id) === item.IdUser)?.fullName
			}
		})

		return res.json({ listNews: data });
	} else {
		return res.json({ message: "Không được phép xem" });
	}
};
//tin khong duoc duyet
module.exports.statistical = (req, res) => {
	// const {name} = req.params;
	News.findOne({ status: "4" }).then((item) => {
		if (!item) {
			return res.json({ message: "Không có bài viết nào được phê duyệt" });
		}
		return res.json({ news: item });
	});
};


//update status của thư ký
module.exports.updateStatusSecretary = async (req, res) => {
	const id = req.params.id;
	const { categories } = req.body;
	const user = await Users.findById(id);
	if (!categories) {
		return res.json({ message: "Chọn chuyên mục trước khi đăng bài" });
	}
	if (user.power == "5") {
		const editNews = await News.findById(req.params.idNews);
		if (!editNews) {
			return res.json({ message: "Không tìm thấy bài viết" });
		}
		editNews.status = 5;
		editNews.categories = categories;
		await editNews.save();
		return res.json({ message: "Đã đăng tin" });
	}
};

//update status khi bị từ chối sơ duyệt
module.exports.updateStatusNoReview = async (req, res) => {
	const id = req.params.id;
	const user = await Users.findOne({ _id: id });
	if (user.power === "3" || user.power ==="2") {
		const editNews = await News.findById(req.params.idNews);
		if (!editNews) {
			return res.json({ message: "Không tìm thấy bài viết" });
		}
		editNews.status = 0;
		if(user.power === "3"){
			editNews.isCheckedRefuseBTV = true;
		}

		if(user.power === "2"){
			editNews.isCheckedRefuseTBBT = true;
		}
		await editNews.save();
		return res.json({ message: "Đã từ chối duyệt tin" });
	} else {
		return res.json({ message: "Không được phép sơ duyệt tin bài" });
	}
};

//yeu cau chinh sua cua btv and tbbt
module.exports.updateStatusEditContent = async (req, res) => {
	const {id} = req.params;
	const {note} = req.body;
	console.log(note)
	const user = await Users.findOne({ _id: id });
	if (user.power === "3") {
		const editNews = await News.findById(req.params.idNews);
		if (!editNews) {
			return res.json({ message: "Không tìm thấy bài viết" });
		}
		editNews.status = 5;
		editNews.note = note;
		await editNews.save();
		return res.json({ message: "Yêu cầu chỉnh sửa thành công" });
	}
	console.log(user.power === "2")
	if (user.power ==="2") {
		const editNews = await News.findById(req.params.idNews);
		if (!editNews) {
			return res.json({ message: "Không tìm thấy bài viết" });
		}
		editNews.status = 6;
		editNews.note = note;
		editNews.idTBBT = user._id;
		await editNews.save();
		return res.json({ message: "Yêu cầu chỉnh sửa thành công" });
	}
};

//Thống kê tin bài theo ngày
module.exports.statisticalFromDate = (req, res) => {
	const { date } = req.body;
	const dateMoment = moment(date).format("YYYY-MM-DD");
	News.find({ date_submitted: new Date(dateMoment) }).then((item) => {
		return res.json({ newsFromDate: item });
	});
};

//Thống kê theo tháng
module.exports.statisticalFromMonth = async (req, res) => {
	const { fromMonth } = req.body;
	let monthMoment = moment(fromMonth).format("YYYY-MM-DD");
	const aggegation = [
		{
			$match: {
				$expr: {
					$eq: [
						{ $month: "$date_submitted" },
						{ $month: new Date(monthMoment) },
					],
				},
			},
		},
	];
	let allNews = await News.aggregate(aggegation);
	return res.json({ NewMonth: allNews });
};

//Thống ke theo quý
module.exports.statisticalFromMonthtoMonth = async (req, res) => {
	const { fromMonth, toMonth } = req.body;
	const fromMonthMoment = moment(fromMonth).format("YYYY-MM-DD");
	const toMonthMoment = moment(toMonth).format("YYYY-MM-DD");
	const aggregation = [
		{
			$match: {
				$expr: {
					$gte: [
						{ $month: "$date_submitted" },
						{ $month: new Date(fromMonthMoment) },
					],
				},
				$expr: {
					$lt: [
						{ $month: "$date_submitted" },
						{ $month: new Date(toMonthMoment) },
					],
				},
			},
		},
	];

	let allNews = await News.aggregate(aggregation);
	return res.json({ NewMonth: allNews });
};

//Thống kê theo năm
module.exports.statisticalFromYear = async (req, res) => {
	const { year } = req.body;
	const fromYear = moment(year).format("YYYY-MM-DD");
	const aggregation = [
		{
			$match: {
				$expr: {
					$eq: [{ $year: "$date_submitted" }, { $year: new Date(fromYear) }],
				},
			},
		},
	];

	const allNews = await News.aggregate(aggregation);
	return res.json({ NewMonth: allNews });
};

//Thống kê tin bài từ ngày này đến ngày này
//thanh cong
module.exports.statisticalFromDateToDate = async (req, res) => {
	const { fromDate, toDate } = req.body;

	let fromDateMoment = moment(fromDate).format("YYYY-MM-DD");
	let toDateMoment = moment(toDate).format("YYYY-MM-DD");
	const allNews = await News.find({
		date_submitted: {
			$gte: new Date(fromDateMoment),
			$lt: new Date(toDateMoment),
		},
	});
	return res.json({
		News: allNews,
	});
};
//thong ke theo noi dung bai viet
module.exports.statisticalByAuthor = async (req, res) => {
	const { month } = req.body;
	const getKind = await Kinds.find().sort({name: -1})
	const getCategory = await Categories.find();
	const dataPrice =  await PriceOfKind.find();
	const dataPriceImages = await PriceImages.find();
	const getUser = await Users.find();
	const startOfMonth = moment(month)
		.clone()
		.startOf("month")
		.format("YYYY-MM-DD hh:mm");
	const endOfMonth = moment(month)
		.clone()
		.endOf("month")
		.format("YYYY-MM-DD hh:mm");


	const allNews = await News.find({
		date_submitted: {
			$gte: new Date(startOfMonth),
			$lt: new Date(endOfMonth),
		},
	});
	
	if(dataPrice){
		const data = 
		allNews
		.filter((item) => item.status === "4")
		.map((newsData) => {
			const price = dataPriceImages.find(val => String(val._id) === newsData.idPriceOfImages);
			return {
				...newsData,
				price: dataPrice.find(item => String(item._id) === newsData.idPriceOfKind)?.price,
				priceImages: price ? Number(price.price) : 0,
				nameKind: getKind.find( val => String(val._id) === newsData.kindNews )?.name,
				nameCategory: getCategory.find(val => String(val._id) === newsData.categories)?.name,
				nameAuthor: getUser.find(val => String(val._id) === newsData.IdUser)?.fullName
			};
		})

		return res.json({
			News: data
		});
	}
		
};

module.exports.statisticalByAuthor2 = async (req, res) => {
	const { month } = req.body;

	const startOfMonth = moment(month)
		.clone()
		.startOf("month")
		.format("YYYY-MM-DD hh:mm");
	const endOfMonth = moment(month)
		.clone()
		.endOf("month")
		.format("YYYY-MM-DD hh:mm");
	const allNews = await News.find({
		date_submitted: {
			$gte: new Date(startOfMonth),
			$lt: new Date(endOfMonth),
		},
	});
	const getKind = await Kinds.find({}).sort({name: 1});
	const getPriceKind = await PriceOfKind.find({})
	const getUser = await Users.find(); 

	
	const arr2 = []
	getUser.forEach( item => {
		let user = getUser.find(val => String(val._id) === String(item._id))
		let arr = [];
		let sum = 0;
		getKind.forEach( function(kind){
			const getNews = allNews.filter(val => (val.status === '4' && val.IdUser === String(item._id) && val.kindNews === String(kind._id)))
			const price = getNews.length > 0 ? getPriceKind.find(val => String(val.idKind) === String(kind._id)).price : 0
			arr.push({count: getNews.length, price: price * getNews.length});
			sum = sum + (getNews.length * price);
		})
		arr2.push({user: user, sum: sum, news: arr})
	})

	let arrCount = [];
	let arrPrice = [];
	// let sumPrice = 0;
	getKind.forEach(item => {
		let sum = 0;
		let sumPrice = 0;
		const getNews = allNews.filter( val => val.kindNews === String(item._id) && val.status === '4')
		const price = getPriceKind.find(val => String(val.idKind) === String(item._id))?.price
		sum = getNews.length > 0 ? getNews.length : 0;
		sumPrice = getNews.length > 0 ? sumPrice + (getNews.length * price) : 0
		
		arrCount.push({count: sum, sumPrice: sumPrice})
		arrPrice.push({sumPrice: sumPrice})
	})
	let sumAll = arrPrice.reduce( (a, b) => {
		return a + b.sumPrice
	}, 0) 

	console.log(sumAll)

	res.json({News: arr2, sumByKind: arrCount, sumAll: sumAll})
};

module.exports.statisticalByDepartment = async (req, res) => {
	const { month } = req.body;

	const startOfMonth = moment(month)
		.clone()
		.startOf("month")
		.format("YYYY-MM-DD hh:mm");
	const endOfMonth = moment(month)
		.clone()
		.endOf("month")
		.format("YYYY-MM-DD hh:mm");

	const allNews = await News.find({
		date_submitted: {
			$gte: new Date(startOfMonth),
			$lt: new Date(endOfMonth),
		},
	});

	const getKind = await Kinds.find({}).sort({name: 1});
	const getDepartment = await Departments.find().sort({name: 1}); 

		
		const arr2 = []
		getDepartment.forEach( item => {
			let department = getDepartment.find(val => String(val._id) === String(item._id))
			let arr = [];
			let sum = 0;
			let kq;
			getKind.forEach( function(kind){
				let getNews = allNews.filter(val => (val.status === '4' && val.idDepartment === String(item._id) && val.kindNews === String(kind._id)))
				arr.push({count: getNews.length});
				sum = sum + getNews.length;
			})
			if(sum >= 5){
				kq = `Đạt`;
			}
			else if(sum === 4){
				kq = `Đạt ${sum}/5`;
			}else if(sum === 3){
				kq = `Đạt ${sum}/5`;
			}else
			{
				kq = "Chưa đạt";
			}
			arr2.push({department: department, news: arr, note: kq})
		})
		
		let arrCount = [];
		let sumAll = 0;
		getKind.forEach(item => {
			let sum = 0;
			const getNews1 = allNews.filter( val => val.kindNews === String(item._id) && val.status === '4')
			sum = getNews1.length;
			sumAll = sumAll + getNews1.length;
			arrCount.push({count: sum})
		})
		res.json({News: arr2, sumByKind: arrCount, sumAll: sumAll})
	
};

module.exports.statisticalAuthor = async (req, res) => {
	const { nameOfUser } = req.body;
	//const user = await User.findOne({username: nameOfUser});

	const listNews = await News.find();
	if (listNews) {
		let count = listNews.count({ author: nameOfUser });
		return res.json({
			listNews: listNews,
			count: count,
		});
	} else {
		return res.json({ message: "Không tìm thấy" });
	}
};

//Danh sach tin da phe duyet
module.exports.listNewsApproved = async (req, res) => {
	const listNews = await News.find({ status: "3" });
	const kind = await Kinds.find();
	const category = await Categories.find();
	const getUser = await Users.find();
	const data = listNews.map(item => {
		return {
			...item,
			nameKind: kind.find(val => String(val._id) === item.kindNews)?.name,
			nameCategories: category.find(val => String(val._id) === item.categories)?.name,
			nameAuthor: getUser.find(val => String(val._id) === item.IdUser)?.fullName
		}
	})
		return res.json({ listNewsApproved: data });
};

//Danh sach tin da xac nhan
module.exports.listNewsConfirmed = async (req, res) => {
	const listNews = await News.find({ status: "2" });
	if (!listNews) {
		return res.json({ message: "Không có tin nào được duyệt" });
	} else {
		return res.json({ listNewsConfirmed: listNews });
	}
};

//Danh sach tin cho phe duyet
module.exports.listNewsWaitingForApproval = async (req, res) => {
	const listNews = await News.find({ status: "1" });
	if (!listNews) {
		return res.json({ message: "Không có tin nào chờ phê duyệt" });
	} else {
		return res.json({ listNewsApproved: listNews });
	}
};


module.exports.listNewBTV = async (req, res) => {
	const {id} = req.query;
	const categories = await Categories.find();
	const getUser = await Users.find();

	const getNews = await News.find()
										.where('idBTV').equals(id)
										.where('status').equals("1");
	const data = getNews.map( item => {
		return {
			...item,
			nameCategories: categories.find( val => String(val._id) === item.categories)?.name,
			nameAuthor: getUser.find(val => String(val._id) === item.IdUser)?.fullName
		}
	})
	return res.json({listNews: data})
}


//Danh sach da duyet boi bien tap vien
module.exports.listNewsBTV2 = async (req, res) => {
	const {id} = req.query;
	const kind = await Kinds.find();
	const category = await Categories.find();
	const getUser = await Users.find();

	const getNews = await News.find()
										.where('isCheckedBTV').equals(true)
										.where('idBTV').equals(id)
	
	const data = getNews.map (item => {
		return {
			...item,
			nameKind: kind.find(val => String(val._id) === item.kindNews)?.name,
			nameCategories: category.find(val => String(val._id) === item.categories)?.name,
			nameAuthor: getUser.find(val => String(val._id) === item.IdUser)?.fullName
		}
	})

	return res.json({listNews: data})
}

//danh sach da duyet boi truong ban bien tap 
module.exports.listNewsTBBT = async (req, res) => {
	const {id} = req.query;

	const kind = await Kinds.find();
	const category = await Categories.find();
	const getUser = await Users.find();

	const getNews = await News.find()
													// .where('idBTV').equals(id)
													.where('isCheckedTBBT').equals(true);

	const data = getNews.map(item => {
		return{
			...item,
			nameKind: kind.find(val => String(val._id) === item.kindNews)?.name,
			nameCategories: category.find(val => String(val._id) === item.categories)?.name,
			nameAuthor: getUser.find(val => String(val._id) === item.IdUser)?.fullName
		}
	})
	return res.json({listNews: data})
}

//danh sach tu choi cua bbv
module.exports.listBTVRefuse = async (req, res) => {
	const {id} = req.query;
	const kind = await Kinds.find();
	const category = await Categories.find();
	const getUser = await Users.find();
	const getNews = await News.find()
												.where('idBTV').equals(id)
												.where('isCheckedRefuseBTV').equals(true);
	const data = getNews.map(item => {
		return{
			...item,
			nameKind: kind.find(val => String(val._id) === item.kindNews)?.name,
			nameCategories: category.find(val => String(val._id) === item.categories)?.name,
			nameAuthor: getUser.find(val => String(val._id) === item.IdUser)?.fullName
		}
	})
	return res.json({listNews: data})
}

//danh sach tu choi cua TBBT
module.exports.listTBBTRefuse = async (req, res) => {
	const {id} = req.query;

	const kind = await Kinds.find();
	const category = await Categories.find(); 
	const getUser = await Users.find();

	const getNews = await News.find()
												.where('isCheckedRefuseTBBT').equals(true);

	const data = getNews.map(item => {
		return{
			...item,
			nameKind: kind.find(val => String(val._id) === item.kindNews)?.name,
			nameCategories: category.find(val => String(val._id) === item.categories)?.name,
			nameAuthor: getUser.find(val => String(val._id) === item.IdUser)?.fullName
		}
	})
												
	return res.json({listNews: data})
}

//danh sach yeu cau phe duyet tu truong ban bien tap
module.exports.listNewsRequestEdit = async (req, res) => {
	const {id} = req.query;
	const categories = await Categories.find();
	const getUser = await Users.find();

	const getNews = await News.find()
												.where('idBTV').equals(id)
												.where('status').equals("6");

	const data = getNews.map(item => {
		return {
			...item,
			nameCategories: categories.find(val => String(val._id) === item.categories)?.name,
			nameAuthor: getUser.find(val => String(val._id) === item.IdUser)?.fullName
		}
	})
	return res.json({listNews: data})
}

module.exports.listNewsbyCategory = async(req, res) => {
	const {id} = req.params;
	const getUser = await Users.find();
	const getNews = await News.find()
												.where('categories').equals(id)
												.where('status').equals("4")
												.sort({date_submitted: -1});
	const data = getNews.map(item => {
		return{
			...item,
			nameAuthor: getUser.find(val => String(val._id) === item.IdUser)?.fullName
		}
	})
	const getCategoryByid = await Categories.findOne({_id: id});
	return res.json({news: data, category: getCategoryByid.name})
	
}

module.exports.NewsById = async (req, res) => {
	const {id} = req.params;
	const getKind = await Kinds.find();
	const getCategories = Categories.find();
	const getUser = await Users.find();

	const getNews = await News.find({_id: id})
	const data = getNews.map(item => {
		return{
			...item,	
			nameKind: getKind.find( val => String(val._id) === kindNews)?.name,
			nameCategories: getCategories.find(val => String(val._id) === item.categories)?.name,
			nameAuthor: getUser.find(val => String(val._id) === item.IdUser)?.fullName
		}
	})
	return res.json({news: data})

}

module.exports.ListNewsPost = async (req, res) => {
	const getCategories = await Categories.find();
	const getUser = await Users.find();

	const getNews = await News.find({status: "4"}).sort({date_submitted: -1});
	const data = getNews.map(item => {
		return{
			...item,	
			nameCategories: getCategories.find(val => String(val._id) === item.categories)?.name,
			nameAuthor: getUser.find(val => String(val._id) === item.IdUser)?.fullName
		}
	})
	return res.json({news: data})

}


