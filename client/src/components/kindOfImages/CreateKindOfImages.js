import React, {useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Input from "../UI/Input";
import Button from "../UI/button-add";
function  CreatePriceOfKindComponent(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  let history = useHistory();

  const add = () => {
    axios
      .post("/api-price-of-images/create", {
        name: name,
        price: price,
      })
      .then((res) => {
        history.push(`${props.path}/list-kind-images`);
      });
  };

  const onChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="create-user-wrapper">
      <h3 style={{ marginBottom: 20 }}>Thêm loại và đơn giá hình ảnh</h3>
      <label>Tên loại</label>
      <Input onChange={onChange}></Input>

      <label>Đơn giá (VND)</label>
      <Input onChange={(e) => setPrice(e.target.value)}></Input>

      <Button onClick={add} title="Thêm" />
    </div>
  );
}

export default CreatePriceOfKindComponent;
