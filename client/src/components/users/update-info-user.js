import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../UI/Input";

import Button from "../UI/button-add";

export default function UpdateUser(props) {
  let history = useHistory();
  const [user, setUser] = useState({
    username: "",
    department: "",
    email: "",
    password: "",
    confirmPassword:'',
    phoneNumber: ''
  });

  useEffect(() => {
    console.log(props.match.params.id);
    axios
      .post(`/api-user/edit/${props.match.params.id}`, {
        id: props.match.params.id,
      })
      .then((res) => {
        setUser(res.data.user);
        //console.log(res.data.user);
      });
  }, []);

  const onChangeName = (event) => {
    setUser({ ...user, username: event.target.value });
  };

  const onChangePhone = (event) => {
    setUser({ ...user, phoneNumber: event.target.value });
  };

  const onChangeEmail = (event) => {
    setUser({ ...user, email: event.target.value });
  };

  const onChangePassword = (event) => {
    setUser({ ...user, password: event.target.value });
  };

  const onChangeConfirmPassword = (event) => {
    setUser({ ...user, confirmPassword: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/api-user/update-info-user/${props.match.params.id}`, {
        username: user.username,
        email: user.email,
        department: user.department,
        fullName: user.fullName,
        confirmPassword: user.confirmPassword,
        password: user.password
      })
      .then((res) => {
        if(res.data.message == "Cập nhật thành công"){
          toast.success("Mời bạn đăng nhập lại tài khoản")
          history.push("/");
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
      <h3 style={{ marginBottom: 20 }}>Cập nhật tài khoản</h3>
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

        <label>Số điện thoại</label>
        <Input
          type="text"
          onChange={onChangePhone}
          value={user.phoneNumber}
        ></Input>
        
        <label>Mật khẩu</label>
        <Input
          type="password"
          placeholder="Mật khẩu"
          onChange={onChangePassword}
        ></Input>

        <label>Nhập lại mật khẩu</label>
        <Input
          type="password"
          placeholder="Nhập lại mật khẩu"
          onChange={onChangeConfirmPassword}
        ></Input>

        <Button onClick={onSubmit} title="Cập nhật">
          Submit
        </Button>
      </form>
    </div>
  );
}
