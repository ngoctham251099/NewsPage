import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

import Input from "../UI/Input";
import Button from "../UI/button-add";
function Create(props){
	const [name, setName] = useState("");
	
	let history = useHistory();

	const addDepartment = () => {
			axios.post('/api-categories/create', {
					name: name,
			})
			.then(
					res => {
							if(res.data.message === "Thêm thành công"){
								toast.success(res.data.message)
								history.goBack();
							}else{
								toast.error(res.data.message)
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
