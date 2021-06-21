const PriceOfKind = require("../data/models/priceOfKind");
const News = require("../data/models/News");
const Kinds = require("../data/models/KindOfNews")
//show list kind

module.exports.showsKindOfNews = async (req, res, next) => {
  const getKind = await Kinds.find();
  const price = await PriceOfKind.find().sort({idKind: 1});

  const data = price.map(item => {
    return {
      ...item,
      nameKind: getKind.find(val => String(val._id) === item.idKind)?.name
    }
  })
  
  return res.json({kind: data, priceOfNews: price})
};

module.exports.getPriceOfKind = async (req, res, next) => {
  const { id } = req.params;

  const data = await PriceOfKind.find({ _id: id});
  res.send(data);
  
};

//create kind
module.exports.createPriceKind = async (req, res, next) => {
  const { name, price, idKind } = req.body;

  const getKind = await PriceOfKind.findOne()
                              .where('name').equals(name)
                              .where('idKind').equals(idKind);
  console.log(getKind)

  if(getKind){
    return res.json({message: "Đã có chất lượng tin và đơn giá này. Vui lòng nhập lại"})
  }

  if (!name || !idKind) {
    return res.json({ message: "Tên loại không được để trống" });
  }

  if(!Number(price)){
    return res.json({message: "Đơn giá không đúng. Vui lòng nhập lại"})
  }

  let addKind = new PriceOfKind();
  addKind.name = name;
  addKind.price = price;
  addKind.idKind = idKind;

  await addKind.save();
  res.status(200).json({ message:`Thêm thành công!` });
};

//delete kind
module.exports.deletePriceKind = async (req, res, next) => {
  const { id } = req.params;

  const cate = await PriceOfKind.findOne({_id: id});

  const news = await News.findOne({ idPriceOfKind: cate._id });

  if (news) {
    return res.json({
      message: `Đã có bài viết thuộc loại tin này`,
    });
  } else {
    await PriceOfKind.deleteOne({ _id: id });
    return res.json({ message: `Đã xóa thành công` });
  }
};

//update kind
module.exports.updateKindOfNews = async (req, res, next) => {
  const { id } = req.params;
  let { name, price } = req.body;
  const kind = await PriceOfKind.findOne({ _id: id })
  const news =await News.findOne({idPriceOfKind : kind._id})
  if(news){
    return res.json({message: "Đã có bài viết thuộc đơn giá này"})
  }
  kind.name = name;
  kind.price = price;
  kind.save();
  return res.json({ message: "Đã update thành công" });
};
