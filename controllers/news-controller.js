const News = require('../data/models/News');
const path = require('path');
const fs = require('fs');

module.exports.showNews = (req, res, next) => {
    News.find()
    .then(
        newsPage => {
            res.json({page: newsPage});
        }
    )
}

module.exports.create = (req, res, next) => {
    const { title, content, author } = req.body;
    console.log(req.file)
    const addnews = new News();
    console.log(title, content)
    addnews.title = title;
    addnews.content = content;
    addnews.author = author;
    addnews.date_submitted = Date.now();
    addnews.status = 1;
    addnews.IdUser = 1;
    addnews.department = 1;
    addnews.avatar = req.file.path;

    //1 = cho phe duyet, 2 = phe duyet cua truong phong, 3 = phe duyet cua giam doc, 4 = da phe duyet

    addnews.save()
    .then(
        (item) => {
            console.log(item)
            res.json({message: 'Add news successfully',
            message: "Created product successfully",
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
    News.findOne({_id: id})
    .then(
        item => {
            console.log(item);
            res.json({userId: item})
        }
    )
}