const express = require('express');
const Kinds = require('../data/models/KindOfNews');
const News = require('../data/models/News');

//show list kind
module.exports.showsKindOfNews = (req, res, next) => {
    Kinds.find()
    .then(kind => {
        res.send({kind: kind});
    })
    .catch(err => console.log(err))
}

//create kind
module.exports.createKindOfNews = async (req, res, next) => {
    const {name} = req.body;

    if(!name){
        return res.json({message: "Tên loại không được để trống"});
    }

    const findKind = await Kinds.findOne({name: name})
    if(findKind){
        return res.json({message: "Loại tin đã tồn tại"})
    }

    let addKind = new Kinds({name});
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
module.exports.deleteKindOfNews = async (req, res, next) => {
    const {id} = req.params;
    const news = await News.find({kind: id});
    let count = news.count();
    if(news){
        return res.json({message: `Đã có ${count} bài viết thuộc loại tin này. Hãy xóa ${count} bài viết trước khi xoa loại tin này.`})
    }

    await Kinds.deleteOne({_id: id});
    return res.json({message: `Đã xóa thành công`})
    
    // Kinds.findByIdAndDelete(id)
    // .then(kind => res.json({message :"Xóa thành công"}))
    // .catch(err => res.status(400).json('Err: ' + err))
}

module.exports.editKindOfNews = (req, res, next) => {
    const {id} = req.params;

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
module.exports.updateKindOfNews = async (req, res, next) => {
    let {nameChange} = req.body;
    const news = await News.find({kind: id});
    let count = news.count();
    if(news){
        return res.json({message: `Đã có ${count} bài viết thuộc loại tin này. Hãy xóa ${count} bài viết trước khi xoa loại tin này.`})
    }
    Kinds.findById(req.params.id)
    .then(kind => {
        kind.name = nameChange;
        kind.save()
        .then(() => res.json({message:'Exercise update'}))
        .catch( err => res.status(400).json('Err: ' + err));
    })
}