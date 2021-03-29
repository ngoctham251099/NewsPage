const { response } = require('express');
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
    const news = await News.findOne({kind: id});
    if(news){
        return res.json({message: `Đã có bài viết thuộc loại tin này. Hãy xóa bài viết trước khi xóa loại tin này.`})
    }

    await Kinds.deleteOne({_id: id});
    return res.json({message: `Đã xóa thành công`})
    
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
module.exports.updateKindOfNews = (req, res, next) => {
    const {id} = req.params;
    console.log(id)
    let {nameChange} = req.body;
    console.log(nameChange)
    Kinds.findById(id)
    .then(
        kind => {
            if(kind) {
                News.findOne({kindNews: kind.name})
                .then(
                    response => {
                        if(response){
                            return res.json({message: `Đã có bài viết thuộc loại tin này. Hãy xóa bài viết trước khi xoa loại tin này.`})
                        }else{
                            console.log(nameChange)
                            kind.name = nameChange;
                            kind.save()
                            res.json({message:'Exercise update'})
                        }
                    }
                )
            }else{
                console.log('ashdj')
            }
        }
    )
    
}