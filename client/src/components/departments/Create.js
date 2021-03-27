import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
function Create(){
	const [name, setName] = useState("");
	let history = useHistory();

	const addDepartment = () => {
			axios.post('/api-department/create', {
					name: name,
			})
			.then(
					res => {
							console.log(res.data.message);
							history.replace("/department")
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
					<input
							onChange={onChange}
					></input>
					<button onClick={addDepartment}>Add</button>
			</div>
	)
}

export default Create;
