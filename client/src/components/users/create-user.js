import React, { useState, useEffect } from "react";
import axios from "axios";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

import Input from "../UI/Input";
import Select2 from "../UI/select";
import Button from "../UI/button-add";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

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

function CreateUSer(props) {
  let history = useHistory();
  const classes = useStyles();
  const [departments, setDepartments] = useState([]);
  const [btv, setBTV] = useState([]);
  const [user, setUser] = useState({
    username: '',
    email: '',
    department: '',
    password: '',
    config: '',
    powerUser:'',
    fullName: '',
    phoneNumber: '',
    idBTV: ''
  })

  const [power, setPower] = useState([
    { id: 1, value: "Admin" },
    { id: 2, value: "Trưởng ban biên tập" },
    { id: 3, value: "Biên tập viên" },
    { id: 4, value: "Cộng tác viên" },
    { id: 5, value: "Thư ký" },
  ]);

  useEffect(() => {
    axios.get("/api-department").then((res) => {
      setDepartments(res.data.department);
    });
  }, []);

  useEffect(() => {
    axios.get("/api-user").then((res) => {
      console.log(res.data.user)
      setBTV(res.data.user);
    });
  }, []);

  const register = () => {
    axios
      .post("/api-user/create", {
        username: user.username,
        email: user.email,
        department: user.department,
        password: user.password,
        confirmPassword: user.config,
        power: user.powerUser,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        idBTV: user.idBTV
      })
      .then((res) => {
        if (res.data.info) {
          toast.success("Thêm người dùng thành công")
          history.push(`${props.path}/users`);
        } else {
          toast.error(res.data.message);
        }
      });
  };


  const onChangeName = (event) => {
    setUser({...user, username: event.target.value});
  };

  const onChangeFullName = (event) => {
    setUser({...user, fullName: event.target.value});
  };

  const onChangeEmail = (event) => {
    setUser({...user, email: event.target.value});
  };

  const onChangeDepartment = (event) => {
    setUser({...user, department: event.target.value});
  };

  const onChangePassword = (event) => {
    console.log(event.target.value)
    setUser({...user, password: event.target.value});
  };

  const onChangeConfig = (event) => {
    setUser({...user, config: event.target.value});
  };

  const onChangePower = (event) => {
    console.log(event.target.value)
    setUser({...user, powerUser: event.target.value});
  };

  const onChangePhone = (event) => {
    setUser({...user, phoneNumber: event.target.value});
  };

  const onChangeBTV = (event) => {
    console.log(event.target.value)
    setUser({...user, idBTV: event.target.value});
  };


  return (
    <div className="create-user-wrapper">
      <h3 style={{ marginBottom: 20 }}>Thêm người dùng</h3>
      <label>Tên người dùng</label>
      <Input
        type="text"
        placeholder="Tên tài khoản"
        onChange={onChangeName}
      ></Input>
      <label>Email</label>
      <Input
        type="email"
        placeholder="Email"
        onChange={onChangeEmail}
      ></Input>
      <label>Bút danh</label>
      <Input
        type="text"
        placeholder="Tên đầy đủ"
        onChange={onChangeFullName}
      ></Input>
      <label>Số điện thoại</label>
      <Input
        type="text"
        placeholder="Số điện thoại"
        onChange={onChangePhone}
      ></Input>
      <label>Phòng ban</label>
      <Select2 onChange={onChangeDepartment} list={departments}></Select2>

      <label>Quyền hạn</label>
      <Select2 onChange={onChangePower} listPower={power}></Select2>

      {user.powerUser === 4 ? (
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

      <label>Mật khẩu</label>
      <Input
        type="password"
        placeholder="Mật khẩu"
        onChange={onChangePassword}
        value={user.password}
      ></Input>
      <label>Nhập lại mật khẩu</label>
      <Input type="password" onChange={onChangeConfig} placeholder="Nhập lại mật khẩu"></Input>
      <Button onClick={register} title="Thêm"></Button>
    </div>
  );
}

export default CreateUSer;
