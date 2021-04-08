import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Select2 from "../UI/select2";

import Input from "../UI/Input";
import Button from "../UI/button-add";
function CreatePriceOfKindComponent(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [kind, setKind] = useState([]);
  const [idKind, setIdKind] = useState();

  let history = useHistory();

  useEffect(() => {
    axios.get("/api-kind").then((res) => setKind(res.data.kind));
  }, []);

  const add = () => {
    axios
      .post("/api-price-of-kind/create", {
        name: name,
        price: price,
				idKind
      })
      .then((res) => {
        history.replace(`${props.path}`);
      });
  };

  const onChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="create-user-wrapper">
      <h3 style={{ marginBottom: 20 }}>Thêm loại và đơn giá</h3>
      <label>Tên loại</label>
      <Input onChange={onChange}></Input>

      <label className="title-news">Chủ đề</label>
      <Select2
        value={idKind}
        list={kind}
        onChange={(e) => setIdKind(e.target.value)}
      ></Select2>

      <label>Đơn giá (VND)</label>
      <Input onChange={(e) => setPrice(e.target.value)}></Input>

      <Button onClick={add} title="Thêm" />
    </div>
  );
}

export default CreatePriceOfKindComponent;
