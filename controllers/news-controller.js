const News = require("../data/models/News");
const path = require("path");
const fs = require("fs");
const Users = require("../data/models/Users");
const Kinds = require("../data/models/KindOfNews");

const moment = require("moment");

const getAttrFromString = (str, node, attr) => {
  let regex = new RegExp("<" + node + " .*?" + attr + '="(.*?)"', "gi"),
    result,
    res = [];
  while ((result = regex.exec(str))) {
    res.push(result[1]);
  }
  return res;
};

module.exports.showNews = (req, res, next) => {
  News.find()
    .sort([])
    .then((newsPage) => {
      console.log(newsPage.images);
      res.json({ page: newsPage, images: newsPage.images });
    });
};

module.exports.create = async (req, res, next) => {
  const {
    title,
    content,
    author,
    idUser,
    summary,
    status = 1,
    kindNews,
    categories,
    note,
  } = req.body;
  const { avatar } = req.files;
  let date = Date.now();
  let dateMoment = moment(date).format("YYYY-MM-DD");

  const listImagesOnContent = getAttrFromString(content, "img", "src");
  const urlAvatar = avatar[0].filename;
  let user = await Users.findOne({ _id: idUser });
  const addnews = new News();

  let date_test = date.Date;
  addnews.title = title;
  addnews.content = content;
  addnews.author = author;
  addnews.date_submitted = new Date();
  addnews.status = status;
  addnews.IdUser = idUser;
  addnews.department = user.department;
  addnews.avatar = urlAvatar;
  addnews.images = listImagesOnContent;
  addnews.kindNews = kindNews;
  addnews.categories = categories;
  addnews.note = note;
  addnews.summary = summary;

  await addnews.save();
  return res.json({ message: "Add news successfully" });
};

module.exports.viewsImages = (req, res) => {
  const { name } = req.params;
  console.log(req.params.name);
  res.sendFile(path.resolve(`./upload/${name}`));
};

module.exports.deleteNews = (req, res, next) => {
  const { id } = req.params;
  console.log("uygyjhjbj");

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
    author,
    status,
    kindNews,
    note,
    categories,
  } = req.body;
  const { avatar = "" } = req.files;
  const listImagesOnContent = getAttrFromString(content, "img", "src");

  const urlAvatar = avatar ? avatar[0].filename : null;
  if (avatar == null) return res.json({ message: "Chọn hình" });

  const news = await News.findById(id);
  if (news) {
    news.title = title;
    news.author = author;
    news.content = content;
    if (urlAvatar) {
      news.avatar = urlAvatar;
    }
    news.images = listImagesOnContent;
    news.status = status;
    if (kindNews) {
      news.kindNews = kindNews;
    }
    if (categories) {
      news.categories = categories;
    }
    news.note = note;

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
        return console.log(err);
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
    console.log(item);
    res.json({ userId: item });
  });
};

//view tin theo id de view ra do ma
module.exports.viewsIdNews = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const arrNews = await News.findById(id);
  console.log(arrNews);
  if (arrNews) {
    return res.json({ arrNews: arrNews });
  } else {
    return res.json({ error: "Không tìm thấy bài viết" });
  }
};

//list danh sach cua nguoi viet de in ra. view theo nguoi dung
module.exports.viewsWriter = async (req, res, next) => {
  const { id } = req.query;
  console.log(id);
  const arrNews = await News.find({ IdUser: id });
  console.log(arrNews);
  if (arrNews) {
    return res.json({ arrNews: arrNews });
  } else {
    return res.json({ error: "Không tìm thấy bài viết" });
  }
};

//tim news cua tung truong phong de phe duyet va trang thai
module.exports.viewsDepartment = async (req, res) => {
  const { id } = req.query;
  // console.log(id)
  // //	const {power} = req.query;
  const user = await Users.findOne({ _id: id });
  console.log(user.department);
  console.log(user);
  if (user.power == "3") {
    const listNews = await News.find({ status: "1" });
    console.log(listNews);
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
  const { note } = req.params;
  console.log(id);
  //	const {power} = req.query;
  const user = await Users.findOne({ _id: id });
  console.log(user);
  if (user.power == "2") {
    console.log("sdfklms");
    const listNews = await News.find({ status: "2" });
    console.log(listNews);
    return res.json({ listNews: listNews });
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
    console.log(item);
    return res.json({ news: item });
  });
};
//update status của người sơ duyệt
module.exports.updateStatusManager = async (req, res) => {
  const id = req.params.id;
  const { kind } = req.body;
  console.log(kind);

  if (!kind) {
    return res.json({
      message: "Vui lòng chọn loại tin trước khi duyệt bài !",
    });
  }
  const user = await Users.findOne({ _id: id });
  console.log(user);
  if (user.power == "3") {
    const editNews = await News.findById(req.params.idNews);
    if (!editNews) {
      return res.json({ message: "Không tìm thấy bài viết" });
    }
    editNews.status = 2;
    editNews.kindNews = kind;
    await editNews.save();
    return res.json({ message: "Đã duyệt tin" });
  } else {
    return res.json({ message: "Không được phép duyệt tin" });
  }
};

//update status của giám đốc khi tin bài đã được sơ duyệt
module.exports.updateStatusPresident = async (req, res) => {
  const id = req.params.id;
  const { note } = req.body;
  console.log(id);
  const user = await Users.findById(id);
  console.log(user);
  if (user.power == "2") {
    console.log(req.params.idNews);
    const editNews = await News.findById(req.params.idNews);
    if (!editNews) {
      return res.json({ message: "Không tìm thấy bài viết" });
    }
    editNews.status = 3;
    editNews.note = note;
    await editNews.save();
    return res.json({ message: "Đã duyệt tin" });
  }
};

//update status của thư ký
module.exports.updateStatusSecretary = async (req, res) => {
  const id = req.params.id;
  const { categories } = req.body;
  console.log(categories);
  const user = await Users.findById(id);
  if (!categories) {
    return res.json({ message: "Chọn chuyên mục trước khi duyệt bài" });
  }
  console.log(user);
  if (user.power == "5") {
    console.log(req.params.idNews);
    const editNews = await News.findById(req.params.idNews);
    if (!editNews) {
      return res.json({ message: "Không tìm thấy bài viết" });
    }
    editNews.status = 5;
    editNews.categories = categories;
    await editNews.save();
    return res.json({ message: "Đã duyệt tin" });
  }
};

//update status khi bị từ chối sơ duyệt
module.exports.updateStatusNoReview = async (req, res) => {
  const id = req.params.id;
  const user = await Users.findOne({ _id: id });
  if (user.power == "3" || user.power == "2") {
    const editNews = await News.findById(req.params.idNews);
    if (!editNews) {
      return res.json({ message: "Không tìm thấy bài viết" });
    }
    editNews.status = 0;
    await editNews.save();
    return res.json({ message: "Đã từ chối duyệt tin" });
  } else {
    return res.json({ message: "Không được phép sơ duyệt tin bài" });
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
  console.log(fromMonth);
  let monthMoment = moment(fromMonth).format("YYYY-MM-DD");
  console.log(monthMoment);
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
  console.log(year);
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
  // console.log(fromDate, toDate)

  let fromDateMoment = moment(fromDate).format("YYYY-MM-DD");
  let toDateMoment = moment(toDate).format("YYYY-MM-DD");
  //	console.log(fromDateMoment, toDateMoment)
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

const calculatePrice = (allKinds, kind) => {
  const price = allKinds.find((e) => e.name === kind).unitPrice;
  return price;
};
module.exports.statisticalByAuthor = async (req, res) => {
  const { month } = req.body;

  const startOfMonth = moment(month)
    .clone()
    .startOf("month")
    .format("YYYY-MM-DD hh:mm");
  const endOfMonth = moment(month)
    .clone()
    .endOf("month")
    .format("YYYY-MM-DD hh:mm");

  const getKindPrice = await Kinds.find({});
  console.log(startOfMonth, endOfMonth);

  const allNews = await News.find({
    date_submitted: {
      $gte: new Date(startOfMonth),
      $lt: new Date(endOfMonth),
    },
  });

  return res.json({
    News: allNews
      .filter((item) => item.status === "4")
      .map((newsData) => {
        return {
          ...newsData,
          price: calculatePrice(getKindPrice, newsData.kindNews),
        };
      }),
  });
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

  const getKindPrice = await Kinds.find({});

  console.log(startOfMonth, endOfMonth);


  const getNewsByKind = Promise.all(
    getKindPrice.map(async (item) => {
      return await News.aggregate([
        {
          $match: {
            kindNews: item,
            date_submitted: {
              $gte: new Date(startOfMonth),
              $lt: new Date(endOfMonth),
            },
          },
        },
        { $group: { _id: "$IdUser", count: { $sum: 1 } } },
      ]);
    })
  )

  console.log(getNewsByKind());

  // return res.json({
  //   News: allNews
  //     .filter((item) => item.status === "4")
  //     .map((newsData) => {
  //       return {
  //         ...newsData,
  //         price: calculatePrice(getKindPrice, newsData.kindNews),
  //       };
  //     }),
  // });
};

//Thống kê theo tên Bút danh
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
  const { nameOfUser } = req.body;
  console.log(nameOfUser);
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
  if (!listNews) {
    return res.json({ message: "Không có tin nào được duyệt" });
  } else {
    return res.json({ listNewsApproved: listNews });
  }
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
