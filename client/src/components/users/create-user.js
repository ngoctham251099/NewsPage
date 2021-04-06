import React, { useState, useEffect } from "react";
import axios from "axios";

import Input from "../UI/Input";
import Select from "../UI/select";
import Button from "../UI/button-add";
import { useHistory } from "react-router-dom";

function CreateUSer(props) {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [config, setConfig] = useState("");
  const [status, setStatus] = useState("");
  const [departments, setDepartments] = useState([]);
  const [powerUser, setPowerUser] = useState();

  const [power, setPower] = useState([
    { id: 1, value: "Admin" },
    { id: 2, value: "Tổng biên tập" },
    { id: 3, value: "Biên tập viên" },
    { id: 4, value: "Nhân viên" },
    { id: 5, value: "Thư ký" },
  ]);

  useEffect(() => {
    axios.get("http://localhost:5000/api-department").then((res) => {
      console.log(res.data.department);
      setDepartments(res.data.department);
    });
  }, []);

  const register = () => {
    axios
      .post("http://localhost:5000/api-user/create", {
        username: username,
        email: email,
        department: department,
        password: password,
        confirmPassword: config,
        power: powerUser,
      })
      .then((res) => {
        if (res.data.info) {
          //console.log('ashhd')
          history.push(`${props.path}/users`);
        } else {
          setStatus(res.data.message);
        }
      });
  };

  const onChangeName = (event) => {
    setUsername(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeDepartment = (event) => {
    setDepartment(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onChangeConfig = (event) => {
    setConfig(event.target.value);
  };

  const onChangePower = (event) => {
    console.log(event.target.value);
    setPowerUser(event.target.value);
  };

  return (
    <div className="create-user-wrapper">
      <h3 style={{ marginBottom: 20 }}>Thêm người dùng</h3>
      {status ? <p>{status}</p> : null}
      <label>Tên người dùng</label>
      <Input
        type="text"
        placeholder="Username"
        onChange={onChangeName}
        value={username}
      ></Input>
      <label>Email</label>
      <Input
        type="email"
        placeholder="Email"
        onChange={onChangeEmail}
        value={email}
      ></Input>
      <label>Phòng ban</label>
      {/* <select onChange={onChangeDepartment} value={department}>
                <option value="0">---Chon phong---</option>
                {departments.map((item)=> (
                            <option value={item._id}>{item.name}</option>
                ))}
            </select> */}

      <Select onChange={onChangeDepartment} list={departments}></Select>
      <label>Quyền hạn</label>

      {/* <select onChange={onChangePower} ref={React.createRef()}>
                <option value={user.power}>{user.power}</option>
                <option value="1">Admin</option>
                <option value="2">Tổng duyệt tin</option>
                <option value="3">Sơ duyệt</option>
                <option value="4">Viết tin</option>
            </select> */}

      <Select onChange={onChangePower} listPower={power}></Select>
      <label>Mật khẩu</label>
      <Input
        type="password"
        placeholder="Password"
        onChange={onChangePassword}
        value={password}
      ></Input>
      <label>Nhập lại mật khẩu</label>
      <Input type="password" onChange={onChangeConfig} value={config}></Input>
      <Button onClick={register} title="Thêm"></Button>
    </div>
  );
}

export default CreateUSer;
