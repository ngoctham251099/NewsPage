const Kinds = require('../data/models/kindOfImages')

//show list kind
module.exports.showsKindOfImages = (req, res, next) => {
		Kinds.find().sort({name: 1})
		.then(kind => {
				res.send({kind: kind});
		})
		.catch(err => console.log(err))
}

//create kind
module.exports.createKindOfImages = async (req, res, next) => {
		const {name, price} = req.body;
		if(!name){
				return res.json({message: "Tên loại không được để trống"});
		}

		let addKind = new Kinds();
		addKind.name = name;
		addKind.price = price;
		
		const newKind = await addKind.save();
		if(newKind){
				res.status(200).json({message: `${newKind.name} đã được thêm`})
		}else{
				err => {
						console.log(req.body);
						res.status(400).send({message: `${item.name} thêm không thành công`});
				}
		}
}

//delete kind
module.exports.deleteKindOfImages = async (req, res, next) => {
		const {id} = req.params;

		const find = await Kinds.findOne({_id: id})
		if(find){
				const news = await Images.findOne({kindNews: find.name})    
				if(news) {
						return res.json({message: `Đã có hình ảnh thuộc loại này.`})
				}else{
						await Kinds.deleteOne({_id: id})
						return res.json({message: `Đã xóa thành công`})
				}
		}   
}

module.exports.editKindOfImages = (req, res, next) => {
		const {id} = req.params;
		console.log(req.params)

		Kinds.findById(id)
		.then(
				kind => {
						res.json({kindId: kind});
				}
		).catch( 
				err => res.status(400).json({err: err})
		)
}

//update kind
module.exports.updateKindOfImages =  (req, res, next) => {
		const {id} = req.params;
		let {name, price} = req.body;

		Kinds.findOne({_id:id})
		.then(
				kind => {
						if(kind) {
								Images.findOne({_id: kind.idKind})
								.then(
										response => {
												if(response){
														return res.json({message: `Đã có ảnh thuộc loại này.`})
												}else{
														kind.name = name;
														kind.price = price;
														kind.save()
														res.json({message:'Cập nhật thành công'})
												}
										}
								)
						}else{
								console.log('Error')
						}
				}
		)
		
}