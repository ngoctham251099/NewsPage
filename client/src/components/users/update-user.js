import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

import Input from "../UI/Input";
import Select2 from "../UI/select";
import Button from "../UI/button-add";

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      margin: '8px 0px',
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: '8px 0px',
    width: "99%"
  },
}));


export default function UpdateUser(props) {
  let history = useHistory();
  const classes = useStyles();
  const [departments, setDepartments] = useState([]);
  const [btv, setBTV] = useState([]);
  const [user, setUser] = useState({
    username: "",
    department: "",
    email: "",
    power: "",
    fullName: "",
    idBTV: ""
  }); 

  const [power, setPower] = useState([
    { id: "1", value: "Admin" },
    { id: "2", value: "Trưởng ban biên tập" },
    { id: "3", value: "Biên tập viên" },
    { id: "4", value: "Cộng tác viên" },
    { id: "5", value: "Thư ký" },
  ]);
  useEffect(() => {
    axios.get("/api-department/").then((res) => {
      setDepartments(res.data.department);
    });
  }, []);

  useEffect(() => {
    console.log(props.match.params.id);
    axios
      .post(`/api-user/edit/${props.match.params.id}`, {
        id: props.match.params.id,
      })
      .then((res) => {
        setUser(res.data.user);
        toast.error(res.data.message)
      });
  }, []);

  useEffect(() => {
    axios.get("/api-user").then((res) => {
      console.log(res.data.user)
      setBTV(res.data.user);
    });
  }, []);

  const onChangeName = (event) => {
    setUser({ ...user, username: event.target.value });
  };

  const onChangeEmail = (event) => {
    setUser({ ...user, email: event.target.value });
  };

  const onChangeFullName = (event) => {
    setUser({ ...user, fullName: event.target.value });
  };

  const onChangeDepartment = (event) => {
    console.log(event.target.value);
    setUser({ ...user, department: event.target.value });
  };

  const onChangePower = (event) => {
    console.log(event.target.value);
    setUser({ ...user, power: event.target.value });
  };

  const onChangeBTV = (event) => {
    console.log(event.target.value)
    setUser({...user, idBTV: event.target.value});
  };


  const onSubmit = (e) => {
    const username = user.username;
    const department = user.department;
    const email = user.email;
    const power = user.power;
    const fullName = user.fullName;
    e.preventDefault();
    axios
      .post(`/api-user/update/${props.match.params.id}`, {
        username: username,
        email: email,
        department: department,
        power: power,
        fullName: fullName,
        idBTV: user.idBTV
      })
      .then((res) => {
        if(res.data.message =="Cập nhật thành công"){
          toast.success(res.data.message)
          history.push("/admin/users");
        }else{
          toast.error(res.data.message)
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="create-user-wrapper">
      <h3 style={{ marginBottom: 20 }}>Cập nhật người dùng</h3>
      <form>
        <label>Tên người dùng</label>
        <Input
          type="text"
          onChange={onChangeName}
          value={user.username}
        ></Input>
        <label>Email</label>
        <Input
          type="email"
          placeholder="Email"
          onChange={onChangeEmail}
          value={user.email}
        ></Input>

        <label>Bút danh</label>
        <Input
          type="text"
          placeholder="Bút danh"
          onChange={onChangeFullName}
          value={user.fullName}
        ></Input>

        <label>Phòng ban</label>
        <Select2
          value={user.department}
          onChange={onChangeDepartment}
          list={departments}
        ></Select2>
      
        <label>Quyền hạn</label>
        <Select2
          onChange={onChangePower}
          value={user.power}
          listPower={power}
        ></Select2>

        {user.power === "4" ? (
          <div>
            <label>Quản lý</label>
            <FormControl className={classes.margin}>
              <Select
                id="demo-customized-select"
                value={user.idBTV}
                onChange={onChangeBTV}
                input={<BootstrapInput />}
              >
              {btv.filter(item => {
              if(user.department == -1){
                return '';
              }
              return item._doc.department === user.department && item._doc.power === "3";
              }).map(item => {
                return (<MenuItem value={item._doc._id}>{item._doc.username}</MenuItem>)
              })}
              </Select>
            </FormControl>
          </div>
        ):null}
        {/* <input type="text" onChange={onChangePower} value={user.power} ref={React.createRef()}></input> */}
        <Button onClick={onSubmit} title="Cập nhật">
          Submit
        </Button>
      </form>
    </div>
  );
}
