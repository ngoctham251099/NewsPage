import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

import Input from "../UI/Input";
import Button from "../UI/button-add";
function Create(props){
	const [name, setName] = useState("");
	let history = useHistory();

	const addDepartment = () => {
			axios.post('/api-department/create', {
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
			<div>
					<h3>Add department</h3>
					<label>Deparment</label>
					<Input
							onChange={onChange}
					></Input>
					<Button onClick={addDepartment} title="Thêm">Add</Button>
			</div>
	)
}

export default Create;
