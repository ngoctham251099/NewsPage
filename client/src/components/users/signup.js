import React, { useState, useEffect } from "react";
import axios from "axios";
import image1 from "../images/logo.svg";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { IoKeyOutline } from "react-icons/io5";
import { AiFillLock } from "react-icons/ai";
import { BsFillHouseFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

function SingUp() {
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [departments, setDepartments] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");

  
  useEffect(() => {
    axios.get("/api-department").then((res) => {
      console.log(res.data.department);
      setDepartments(res.data.department);
    });
  }, []);

  const register = (event) => {
    event.preventDefault();
    axios
      .post("/api-user/signup", {
        username: username,
        email: email,
        department: department,
        password: password,
        confirmPassword: confirmPassword,
        phoneNumber: phoneNumber,
        fullName: fullName,
      })
      .then((res) => {
        if (res.data.info) {
          history.replace("/");
          toast.success(res.data.info);
        } else {
          toast.error(res.data.message);
        }
      });
  };

  const onChangeName = (event) => {
    setUsername(event.target.value);
  };

  const onChangeFullName = (event) => {
    setFullName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeDepartment = (event) => {
    setDepartment(event.target.value);
  };

  const onChangePassword = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  };

  const onChangeConfig = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onChangePhoneNumber = (event) => {
    setPhoneNumber(event.target.value);
  };

  return (
    <div>
      <div class="container sign-up-mode">
        <div class="forms-container">
          <div class="forms-container">
            <div class="signin-signup">
              <div>{status ? <p>{status}</p> : null}</div>
              <form class="sign-up-form">
                <h2 class="title">Đăng kí</h2>
                <div class="input-field">
                  <i class="fas fa-user">
                    <AiOutlineUser className="icon" />
                  </i>
                  <input
                    type="text"
                    placeholder="Tên người dùng"
                    onChange={onChangeName}
                  />
                </div>
                <div class="input-field">
                  <i class="fas fa-envelope">
                    <AiOutlineMail />
                  </i>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={onChangeEmail}
                  />
                </div>
                <div class="input-field">
                  <i class="fas fa-user">
                    <AiOutlineUser className="icon" />
                  </i>
                  <input
                    type="text"
                    placeholder="Bút danh"
                    onChange={onChangeFullName}
                  />
                </div>
                <div class="input-field">
                  <i class="fas fa-envelope">
                    <AiOutlinePhone />
                  </i>
                  <input
                    type="phone"
                    placeholder="Số diện thoại"
                    onChange={onChangePhoneNumber}
                  />
                </div>
                <div class="input-field">
                  <i class="fas fa-lock">
                    <IoKeyOutline />
                  </i>
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    onChange={onChangePassword}
                  />
                </div>
                <div class="input-field">
                  <i class="fas fa-lock">
                    <AiFillLock />
                  </i>
                  <input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    onChange={onChangeConfig}
                  />
                </div>

                <div class="input-field">
                  <i class="fas fa-lock">
                    <BsFillHouseFill />
                  </i>
                  <select onChange={onChangeDepartment} value={department}>
                    <option value="0">Phòng ban</option>
                    {departments.map((item) => (
                      <option value={item.name} className="input-field">
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button class="btn" onClick={register}>
                  Đăng kí
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="panels-container">
          <div class="panel left-panel"></div>
          <div class="panel right-panel">
            <div class="content">
              <h3>Bạn muốn đăng tin tức ?</h3>
              <p>
                Hãy đăng kí tài toàn để có thể dễ dàng chia sẽ những tin tức.
              </p>
              <button
                class="btn transparent"
                id="sign-in-btn"
                onClick={() => {
                  history.push("/");
                }}
              >
                Sign in
              </button>
            </div>
            <img src={image1} class="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingUp;
