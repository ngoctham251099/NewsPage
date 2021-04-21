import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { BsTrashFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
import { toast } from "react-toastify";

export default function ListPriceOfKinds(props){
		let history = useHistory();
		const [kinds, setKinds] = useState([]);
		let stt  = 1;
		useEffect(() => {
				axios.get('/api-price-of-images')
				.then(
						res => {   
								setKinds(res.data.kind);
						}
				)
		},[])

		
		let show_item_after_delete = ()=>{
			setTimeout(()=>{
				axios.get(`/api-price-of-images`).then(res=>{
					setKinds(res.data.kind)
			})
			},100)
		}

	let Remove = (id) =>{
		if(window.confirm("Bạn chắc chắn muốn xóa loại ảnh này?")){
			axios.delete(`/api-price-of-images/delete/${id}`)
			.then(
				res => {
					if(res.data.message == 'Đã xóa thành công'){
						toast.success(res.data.message);
							show_item_after_delete();

					}else{
						toast.error(res.data.message);
							
					}
				}
			)
		}
	}

		const add = () => {
			history.push(`${props.path}/list-kind-images/add`)
		}

	return  (
		<div>
			<div className="card-header">
				<h3>Danh sách loại tin và đơn giá ảnh</h3>
				<button onClick={add}>Thêm</button>
			</div>
			
			<div className="card-body">
			<div className="table-responsive">
				<table width="100%">
						<thead>
							<tr>
								<th>STT</th>
								<th>Tên loai</th>
								<th>Đơn giá</th>
								<th>Sửa</th>
								<th>Thêm</th>
							</tr>
						</thead>
						<tbody>
							{kinds ?
							kinds.map( (item , index) => (
								<tr key={index}>
									<td>{index +1}</td>
									<td>
											{item.name}
									</td>
									<td>
											{item.price}
									</td>
									<td>
											<Link to={`${props.path}/list-kind-images/edit/${item._id}`}><BsPencil/></Link>
									</td>
									<td>
											<a onClick={() => Remove(item._id)}><BsTrashFill color="red"/></a>
									</td>
								</tr>
							)): null}
						</tbody>
				</table>
			</div>
		</div>
	</div>)
}
