const Departments = require("../data/models/Department");
const News = require("../data/models/News");
const Users = require("../data/models/Users")

//show list department
module.exports.showsDepartments = (req, res, next) => {
  Departments.find().sort({name: 1})
    .then((department) => {
      res.send({ department: department });
    })
    .catch((err) => console.log(err));
};

//create department
module.exports.createDepartment = (req, res, next) => {
  const name = req.body.name;
  let newDepartment = new Departments({ name });
  newDepartment
    .save()
    .then((item) => {
      console.log(item);
      res.status(200).json({ department: "Department in added successfully" });
    })
    .catch((err) => {
      console.log(req.body);
      res.status(400).send("unable to save to database");
    });
};

//delete department
module.exports.deleteDepartment = async (req, res, next) => {
  const { id } = req.params;

  const find = await Departments.findOne({ _id: id });
  const news = await Users.findOne({ department: find.name });
  console.log("news", news);
  if (news) {
    console.log(news);
    return res.json({
      message: `Đã có người dùng thuộc phòng ban này.`,
    });
  } else {
    console.log(id);
    await Departments.deleteOne({ _id: id });
    return res.json({ message: `Đã xóa thành công` });
  }
};

module.exports.editDepartment = (req, res, next) => {
  Departments.findById(req.params.id)
    .then((department) => {
      res.json({ departmentId: department });
    })
    .catch((err) => res.status(400).json({ err: err }));
};

//update department
module.exports.updateDepartment = (req, res, next) => {
  let nameChange = req.body.nameChange;
  const { id } = req.params;
  Departments.findById(id).then((department) => {
    News.findOne({ department: department.name }).then((response) => {
      if (response) {
        return res.json({
          message: `Đã có bài viết thuộc phòng ban này. Hãy xóa bài viết trước khi xóa phòng ban này.`,
        });
      } else {
        department.name = nameChange;
        department
          .save()
          .then(() => res.json({ message: "Exercise update" }))
          .catch((err) => res.status(400).json("Err: " + err));
      }
    });
  });
};

module.exports.findById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const department = await Departments.findOne({ _id: id });
  if (department) {
    return res.json({ department: department.name });
  }
};
