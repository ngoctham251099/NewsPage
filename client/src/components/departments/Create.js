import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import Input from "../UI/Input";
import Button from "../UI/button-add";
function Create(props){
	const [name, setName] = useState("");
	let history = useHistory();

	const addDepartment = () => {
			axios.post('http://127.0.0.1/api/api-department/create', {
					name: name,
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

	return(
			<div className="create-user-wrapper">
					<h3 style={{ marginBottom: 20 }}>Thêm phòng ban</h3>
					<label>Tên phòng ban</label>
					<Input
							onChange={onChange}
					></Input>
					<Button onClick={addDepartment} title="Thêm">Add</Button>
			</div>
	)
}

export default Create;
