import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import Button from "../UI/button-add";
import Input from "../UI/Input";
import { toast } from "react-toastify";

export default function UpdateKind(props) {
  const [kind, setKind] = useState({
    name: "",
    price: "",
  });
  const history = useHistory();

  useEffect(() => {
    axios.post(`/api-price-of-images/edit/${props.match.params.id}`).then((res) => {
      setKind(res.data.kindId);
      console.log(res);
    });
  }, []);

  const onChangePrice = (e) => {
    setKind({ ...kind, price: e.target.value });
  };

  const onChange = (e) => {
    setKind({ ...kind, name: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(props.match.params.id);
    axios
      .post(`/api-price-of-images/update/${props.match.params.id}`, {
        id: props.match.params.id,
        name: kind.name,
        price: kind.price,
      })
      .then((res) => {
        if(res.data.message == "Cập nhật thành công"){
          history.push(`${props.path}/list-kind-images`);
          toast.success(res.data.message);
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
      <h3 style={{ marginBottom: 20 }}>Cập nhật loại tin và đơn giá hình ảnh</h3>
      <label>Tên loại tin</label>
      <Input
        ref={React.createRef()}
        onChange={onChange}
        value={kind.name}
      ></Input>
      <label>Mệnh giá</label>
      <Input
        ref={React.createRef()}
        onChange={onChangePrice}
        value={kind.price}
      ></Input>
      <Button onClick={onSubmit} title="Cập nhật">
        Submit
      </Button>
    </div>
  );
}
