import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import axios from "axios";

const Home = () =>{
    const [data , setdata ] = useState([]);
    const loadData = async() =>{
        fetch("http://localhost:5000/api/get")
        .then(response=>response.json())
        .then(itemArray=>{
            updateitem(itemArray.reverse());
        })
    }
    useEffect(()=>{
        loadData();
    },[1]);

    const delitem = (id) =>{
        let url = "http://localhost:5000/api/remove/"+id;
        let postdata = {method:"delete"};
        fetch(url,postdata)
        .then(response=>response.text())
        .then(serverinfo=>{
            swal( "Deleted" , serverinfo , "success");
            loadData();
        })
    }

    return(
        <div style={{margin:"auto", width:"90%"}} className="mt-5">
            <Link to="/additem">
                <button> Add Item </button>
            </Link>
            <table className="table table-hover text-center">
                <thead>
                    <tr>
                        <th> No. </th>
                        <th> Item Name </th>
                        <th> Item Price </th>
                        <th> Item Details </th>
                        <th> Action </th> 
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, index)=>{
                            return(
                                <tr key={index}>
                                    <td> {item.id} </td>
                                    <td> {item.itemname} </td>
                                    <td> {item.itemprice} </td>
                                    <td> {item.itemdetails} </td>
                                    <td>
                                        <Link>
                                            <button className="btn">Edit</button>
                                        </Link>
                                        <button className="bg-danger me-2 ms-2" style={{border:"0px"}}
                                        onClick={delitem.bind(this,item.id)}>
                                            <i className="fa fa-trash text-white"></i>
                                        </button>
                                        <Link>
                                            <button className="btn">View</button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Home;