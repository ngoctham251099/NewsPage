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
			axios.post('/api-department/create', {
					name: name,
			})
			.then(
					res => {
						if(res.data.message === "Thêm thành công"){
							toast.success("Thêm thành công")
							history.replace(`${props.path}`)
						}
						else{
							console.log('ajdss')
							toast.error(res.data.message);
						}
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
