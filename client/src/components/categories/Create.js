import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import Input from "../UI/Input";
import Button from "../UI/button-add";
function Create(props){
	const [name, setName] = useState("");
	const [message, setMessage] = useState();
	let history = useHistory();

	const addDepartment = () => {
			axios.post('http://127.0.0.1/api/api-categories/create', {
					name: name,
			})
			.then(
					res => {
							if(res.data.findCategories){
								console.log(res.data.message);
								setMessage(res.data.message);
							}else{
								console.log(res.data.message);
								history.replace(`${props.path}`)
							}
					}
			)
	}

	const onChange = (event) => {
			setName(event.target.value);
	}

	return(
			<div className="create-user-wrapper">
					<h3 style={{ marginBottom: 20 }}>Thêm mới</h3>
					<label>Chuyên mục</label>
					<Input
							onChange={onChange}
					></Input>
					<Button onClick={addDepartment} title="Thêm">Add</Button>
			</div>
	)
}

export default Create;
