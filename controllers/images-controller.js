const express = require('express');
const Images = require('../data/models/images');

//show list kind
module.exports.showsImages = (req, res, next) => {
    Images.find()
    .then(item => {
        res.send({images: item});
    })
    .catch(err => console.log(err))
}

//create kind
module.exports.createImages = async (req, res) => {
    const {name, price} = req.body;
    console.log(price)
    if(!name){
        return res.json({message: "Đuôi hình ảnh không được để trống"});
    }

    if(!price){
        return res.json({message: "Mệnh giá không được để trống"});
    }

    const find= await Images.findOne({name: name})
    if(find){
        return res.json({message: "Đuôi hình ảnh đã tồn tại"})
    }

    let addImages = new Images();
    addImages.name = name;
    addImages.price = price;
    const newImages = await addImages.save();
    if(newImages){
        res.status(200).json({message: `${newImages.name} đã được thêm`})
    }else{
        err => {
            console.log(req.body);
            res.status(400).send({message: `${newImages.name} thêm không thành công`});
        }
    }
}

//delete kind
module.exports.deleteNewImages = async (req, res) => {
    const {id} = req.params;
    const find = await Images.findOne({_id: id})
    if(find){
        await Images.deleteOne({_id: id})
        return res.json({message: `Đã xóa thành công`})
    }   
}

module.exports.editKindOfNews = (req, res) => {
    const {id} = req.params;

    Images.findById(id)
    .then(
        item => {
            res.json({Images: item});
        }
    ).catch( 
        err => res.status(400).json({err: err})
    )
}

//update kind
module.exports.updateImages = (req, res, next) => {
    const {id} = req.params;
    console.log(id)
    let {nameChange, price} = req.body;

    Images.findOne({_id:id})
    .then(
      item =>{
        if(item){
          item.name = nameChange;
          item.price = price;
          item.save()
          res.json({message:'Exercise update'})
        }
      }
    )

    
    
}