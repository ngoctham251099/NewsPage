import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import Input from "../UI/Input";
import Button from "../UI/button-add";
function Create(props){
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	let history = useHistory();

	const add = () => {
			axios.post('/api-images/create', {
					name: name,
					price: price
			})
			.then(
					res => {
							console.log(res.data.message);
							history.replace(`${props.path}`)
					}
			)
	}

	const onChange = (event) => {
			setName(event.target.value);
	}

	const onChangePrice = (event) => {
			setPrice(event.target.value);
	}

	return(
			<div className="create-user-wrapper">
					<h3 style={{ marginBottom: 20 }}>Thêm loại hình ảnh</h3>
					<label>Đuôi hình ảnh (.jpg, .png, ...)</label>
					<Input
							onChange={onChange}
					></Input>
					<label>Mệnh giá</label>
					<Input
							onChange={onChangePrice}
					></Input>
					<Button onClick={add} title="Thêm">Add</Button>
			</div>
	)
}

export default Create;
