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

  if (!name) {
    return res.json({ message: "Tên loại không được để trống" });
  }

  const findKind = await PriceOfKind.findOne({ name: name });

  if (findKind) {
    return res.json({ message: "Loại tin đã tồn tại" });
  }

  let addKind = new PriceOfKind();
  addKind.name = name;
  addKind.price = price;
  addKind.idKind = idKind;

  const newKind = await addKind.save();
  if (newKind) {
    res.status(200).json({ message: `Thêm thành công!` });
  } else {
    (err) => {
      res.status(400).send({ message: `Thêm không thành công` });
    };
  }
};

//delete kind
module.exports.deletePriceKind = async (req, res, next) => {
  const { id } = req.params;

  const news = await News.findOne({ idPriceOfKind: id });

  if (news) {
    return res.json({
      message: `Đã có bài viết thuộc loại tin này. Hãy xóa bài viết trước khi xóa loại tin này.`,
    });
  } else {
    await PriceOfKind.deleteOne({ _id: id });
    return res.json({ message: `Đã xóa thành công` });
  }
};

//update kind
module.exports.updateKindOfNews = (req, res, next) => {
  const { id } = req.params;
  let { name, price } = req.body;

  News.findOne({ idPriceOfKind: id })
  .then(
    item => {
      console.log('shdzz')
      if(item){
        return res.json({message: "Đã có bài viết thuộc loại tin này"})
      }else{
        PriceOfKind.findOne({ _id: id }).then((kind) => {
          kind.name = name;
          kind.price = price;
          // kind.idKind = idKind;
          kind.save();
          return res.json({ message: "Đã update thành công" });
        });
      }
    }
  )

  
};
