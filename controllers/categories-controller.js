const Categories = require('../data/models/Categories');
const News = require('../data/models/News')

//show list categories
module.exports.showsCategories = (req, res, next) => {
		Categories.find()
		.then(categories => {
				res.send({categories: categories});
		})
		.catch(err => console.log(err))
}

//create categories
module.exports.createCategories = (req, res, next) => {
	const name = req.body.name;
	let newCategories = new Categories({name})
	Categories.findOne({name: name})
	.then(
			item => {
					console.log(item)
					if(item){
							return res.json({ findCategories: item ,message: "Chuyên mục này đã có trong danh sách"})
					}else{
							newCategories.save()
							.then(item => {
									console.log(item);
									res.status(200).json({'categories': 'Categories in added successfully'})
							})
							.catch(err => {
									console.log(req.body);
									res.status(400).send("unable to save to database");
							});
					}
			}
	)
		
}

//delete categories
module.exports.deleteCategories = async (req, res, next) => {
		const {id} = req.params;

		const find = await Categories.findOne({_id: id})
		if(find){
				const news = await News.findOne({categories: find._id})    
				console.log(news)
				if(news) {
						console.log(news)
						return res.json({message: `Đã có bài viết thuộc chuyên mục này. Hãy xóa bài viết trước khi xóa chuyên mục này.`})
				}else{
						console.log(id);
						await Categories.deleteOne({_id: id})
						return res.json({message: `Đã xóa thành công`})
				}
		}
}

module.exports.editCategories = (req, res, next) => {
		Categories.findById(req.params.id)
		.then(
				categories => {
						res.json({categoriesId: categories});
				}
		).catch( 
				err => res.status(400).json({err: err})
		)
}

//update categories
module.exports.updateCategories = (req, res, next) => {
		let {nameChange} = req.body;
		console.log(nameChange)
		const {id} = req.params
		Categories.findById(id)
		.then(categories => {
				console.log(categories.name)
				Categories.findOne({name: nameChange})
				.then(
						item => {
							categories.name = nameChange;
							categories.save()
							res.json({message:'Exercise update'}
							)
						}
				)
				
		})
}

module.exports.findById = async (req, res) => {
		const {id} = req.body;
		console.log(id)
		const categories = await Categories.findOne({_id: id});
		if(categories){
				return res.json(categories)
		}
}